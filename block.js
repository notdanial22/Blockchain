class Block {
 constructor ({timestamp,prevHash,hash,data}) {
   this.timestamp = timestamp;
   this.prevHash = prevHash;
   this.hash = hash;
   this.data = data;
 }
}

const Block1 = new Block ({
  timestamp: '8',
  prevHash: '1',
  hash: '2',
  data: 'hello'
})
console.log(Block1);