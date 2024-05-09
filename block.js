const { GENESIS_DATA } = require('./config')
const cryptoHash = require('./hash-gen')
class Block {
  constructor({ timestamp, prevHash, hash, data }) {
    this.timestamp = timestamp
    this.prevHash = prevHash
    this.hash = hash
    this.data = data
  }
  static genesis() {
    return new this(GENESIS_DATA)
  }
  static miningBlock({ prevBlock, data }) {
    const timestamp = Date.now()
    const prevHash = prevBlock.hash
    const hash = cryptoHash(timestamp, prevHash, data)
    return new this({
      timestamp,
      prevHash,
      data,
      hash: cryptoHash(timestamp, prevHash, data),
    })
  }
}

const Block1 = new Block({
  timestamp: '8',
  prevHash: '1',
  hash: '2',
  data: 'hello',
})
const genesisBlock = Block.genesis()
// console.log(Block1)
// console.log(genesisBlock)
result = Block.miningBlock({ prevBlock: Block1, data: 'hello' })
console.log(result);
