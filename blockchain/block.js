/* This file contains implementation for a block and for mining a block
*/
const hexToBinary = require('hex-to-binary');
const {GENESIS_DATA, MINE_RATE} = require('../config');
const cryptoHash = require('../util/crypto-hash');


// create a Class to represent a single block
class Block {
	constructor({timestamp, lastHash, hash, data, nonce, difficulty}) {
		this.timestamp =  timestamp;
		this.lastHash = lastHash;
		this.hash = hash;
		this.data = data;
		this.nonce = nonce;
		this.difficulty = difficulty;
	}

	// we want a static instance
	// this is a factory method. creates an instance of class without using constructor method
	static genesis() {
		return new this(GENESIS_DATA);
	}

	static mineBlock({lastBlock, data}) {
		let hash, timestamp;
		const lastHash = lastBlock.hash;
		let {difficulty} = lastBlock;
		let nonce = 0;

		//need a function to create find hash based on current time and difficulty
		do {
			++nonce;
			timestamp = Date.now();
			difficulty = Block.adjustDifficulty({originalBlock: lastBlock, timestamp});

			hash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);

		} while(hexToBinary(hash).substring(0, difficulty) !== '0'.repeat(difficulty));

		return new this({timestamp, lastHash, data, difficulty, nonce, hash});
	}

	static adjustDifficulty({originalBlock, timestamp}) {
		const { difficulty } = originalBlock;

		if(difficulty < 1) return 1;

		if((timestamp - originalBlock.timestamp) > MINE_RATE) return difficulty - 1;

		return difficulty + 1;
	}
}

module.exports = Block;

// const block1 = new Block({
// 	timestamp: '10/07/19',
// 	lastHash: 'foo-lastHash',
// 	hash: 'foo-hash',
// 	data: 'foo-data'
// });

// console.log('block1', block1);