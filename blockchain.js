const Block = require('./block')

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

 // isChainValid () {
 //  for (let i = 1; i < this.chain.length; i++) {
 //   const currentBlock = this.chain[i];
 //   const previousBlock = this.chain[i - 1];
 //   if (currentBlock.hash !== currentBlock.calculateHash()) {
 //    return false;
 //   }
 //   if (currentBlock.previousHash !== previousBlock.hash) {
 //    return false;
 //   }
 //  }
 //  return true;
 // }
}

const blockchain = new Blockchain();

blockchain.addBlock({data : 'first block'});

console.log(blockchain);

module.exports = Blockchain;