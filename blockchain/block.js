const { DIFFICULTY, MINE_RATE } = require("../config");
const ChainUtil = require("../chain-util");

class Block {
  constructor(timestamp, lastHash, hash, data, nonce, difficulty) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty || DIFFICULTY;
  }

  static genesis() {
    return new this("Genesis time", "----", "f1r57 h45h", [], 0, DIFFICULTY);
  }

  static mineBlock(lastBlock, data) {
    let hash,
      timestamp,
      nonce = 0;
    const lastHash = lastBlock.hash;
    let { difficulty } = lastBlock;

    do {
      nonce++;
      timestamp = Date.now();
      difficulty = Block.adjustDifficulty(lastBlock, timestamp);
      hash = Block.hash(timestamp, lastHash, data, nonce, difficulty);
    } while (hash.substring(0, difficulty) !== "0".repeat(difficulty));

    return new this(timestamp, lastHash, hash, data, nonce, difficulty);
  }

  static hash(timestamp, lastHash, data, nonce, difficulty) {
    return ChainUtil.hash(
      `${timestamp}${lastHash}${data}${nonce}${difficulty}`
    );
  }

  static blockHash(block) {
    const { timestamp, lastHash, data, nonce, difficulty } = block;

    return Block.hash(timestamp, lastHash, data, nonce, difficulty);
  }

  static adjustDifficulty(lastBlock, currentTime) {
    const { timestamp: lastBlockTime, difficulty: lastBlockDifficulty } =
      lastBlock;
    const difficulty =
      lastBlockTime + MINE_RATE > currentTime
        ? lastBlockDifficulty + 1
        : lastBlockDifficulty - 1;

    return difficulty;
  }

  toString() {
    return `Block -
            Timestamp : ${this.timestamp}
            Last Hash : ${this.lastHash.substring(0, 10)}
            Hash      : ${this.hash.substring(0, 10)}
            Nonce     : ${this.nonce}
            Difficulty: ${this.difficulty}
            Data      : ${this.data}`;
  }
}

module.exports = Block;
