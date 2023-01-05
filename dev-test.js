const Blockchain = require("./blockchain");
const Wallet = require("./wallet");
const bc = new Blockchain();

// for (let i = 0; i < 10; i++) {
//   console.log(bc.addBlock(`Block ${i + 1}`).toString());
// }

const wallet = new Wallet();
console.log(wallet.toString());