const Block = require('./block');

class Index {
    constructor() {
        this.chain = [Block.genesis()];
    }

    static isValidChain(chain) {
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;

        for (let i = 1; i < chain.length; i++) {
            const block = chain[i];
            const lastBlock = chain[i - 1];

            if (block.lastHash !== lastBlock.hash || block.hash !== Block.blockhash(block)) return false;
        }

        return true;
    }

    addBlock(data) {
        const block = Block.mineBlock(this.chain[this.chain.length - 1], data);
        this.chain.push(block);

        return block;
    }

    replaceChain(newChain) {
        if (newChain.length < this.chain.length) {
            console.log("Received chain is not longer than current chain.");
            return;
        }

        if (!Index.isValidChain(newChain)) {
            console.log("The received chain is not valid.");
            return;
        }

        console.log("Replacing the blockchain with new chain.");
        this.chain = newChain;
    }
}

module.exports = Index;