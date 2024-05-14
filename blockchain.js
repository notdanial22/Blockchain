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

 replaceChain (chain) {
  if (chain <= this.chain.length) {
   console.error("This chain is shorter than the original chain.")
   return
  }
  if (!Blockchain.isChainValid(chain)){
   console.error("This chain is not valid.")
   return
  }
  this.chain = chain;
 }

  static isChainValid (chain)  {
   const { timestamp, previousHash, data, hash } = chain[0]
   if (previousHash !== Block.genesis.previousHash) {
     return false
   } 
  for (let i = 1; i < chain.length; i++) {
   const {timestamp,prevHash,hash,data,nonce,difficulty} = chain[i];
   
   const realLastHash = chain[i -1].hash;
   if (prevHash !== realLastHash){ 
    console.log(`prev hash is wrong`);
   }
   const validatedHash = cryptoHash(timestamp,data,prevHash,nonce,difficulty)
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
blockchain.addBlock({data : 'third block'});
blockchain.addBlock({data : 'fourth block'});


const result  = Blockchain.isChainValid(blockchain.chain)

// console.log(result);

console.log(blockchain.chain);

module.exports = Blockchain;