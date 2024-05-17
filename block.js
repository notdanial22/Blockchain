const { GENESIS_DATA, MINE_RATE } = require('./config')
const cryptoHash = require('./hash-gen')
const hexToBinary = require('hex-to-binary')
class Block {
  constructor({ timestamp, prevHash, hash, data, nonce, difficulty }) {
    this.timestamp = timestamp
    this.prevHash = prevHash
    this.hash = hash
    this.data = data
    this.nonce = nonce
    this.difficulty = difficulty
  }
  static genesis() {
    return new this(GENESIS_DATA)
  }
  static miningBlock({ prevBlock, data }) {
    let hash, timestamp;
    const prevHash = prevBlock.hash

    let  difficulty  = prevBlock.difficulty;
    let nonce = 0

    // console.log('Starting mining loop...')
    do {
      nonce++
      timestamp = Date.now()
      difficulty = Block.adjustDifficulty({
        originalBlock : prevBlock,
        timestamp,
      });
      hash = cryptoHash(timestamp, prevHash, data, nonce, difficulty)
      // console.log('Nonce:', nonce, 'Hash:', hash)
    } while (hexToBinary(hash).substring(0, difficulty) !== "0".repeat(difficulty))

    // console.log('Mining successful!')  
    return new this({
      timestamp,
      prevHash,
      data,
      hash,
      nonce,
      difficulty,
    })
  }

  static adjustDifficulty ({originalBlock , timestamp}) {
    const {difficulty} = originalBlock
    if (difficulty < 1) return 1;
    const timeDifference = timestamp - originalBlock.timestamp
    if (timeDifference <= MINE_RATE) return difficulty + 1;
    return difficulty - 1;
  }
}

const Block1 = new Block({
  timestamp: '8',
  prevHash: '1',
  hash: '2',
  data: 'hello',
})
// const genesisBlock = Block.genesis()
// console.log(Block1)
// console.log(genesisBlock)
// result = Block.miningBlock({ prevBlock: Block1, data: 'hi' })
// console.log(result)

module.exports = Block
