const MINE_RATE = 1000; 
let INITIAL_DIFFICULTY = 2

const GENESIS_DATA = {
  timestamp: 1,
  prevHash: '0x',
  hash: '0x1',
  nonce: 0,
  difficulty: INITIAL_DIFFICULTY,
  Data: [],
}

module.exports = { GENESIS_DATA , MINE_RATE}
