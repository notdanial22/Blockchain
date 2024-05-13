const Block = require('./block');
const cryptoHash = require('./hash-gen');


class Blockchain {
 constructor () {
  this.chain = [Block.genesis()];
 }

 addBlock ({data}) {
  const newBlock = Block.miningBlock({
   prevBlock :  this.chain[this.chain.length - 1],
   data,
  });
  this.chain.push(newBlock);
 }

  static isChainValid (chain)  {
   const { timestamp, previousHash, data, hash } = chain[0]
   if (previousHash !== Block.genesis.previousHash) {
     return false
   } 
  for (let i = 1; i < chain.length; i++) {
   const {timestamp,prevHash,hash,data} = chain[i];
   
   const realLastHash = chain[i -1].hash;
   if (prevHash !== realLastHash){ 
    console.log(`prev hash is wrong`);
   }
   const validatedHash = cryptoHash(timestamp,data,prevHash)
   if (hash !== validatedHash) {
    console.log(`hash is not valid`);
   }
  }
  return true;
 }
}

const blockchain = new Blockchain();

blockchain.addBlock({data : 'first block'});
blockchain.addBlock({data : 'second block'});


const result  = Blockchain.isChainValid(blockchain.chain)

// console.log(result);

console.log(blockchain);

module.exports = Blockchain;