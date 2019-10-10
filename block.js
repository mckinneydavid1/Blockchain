/* This file contains implementation for a block and for mining a block
*/
const {GENESIS_DATA} = require('./config');
const cryptoHash = require('./crypto-hash');
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
		const {difficulty} = lastBlock;
		let nonce = 0;

		//need a function to create find hash based on current time and difficulty
		do {
			++nonce;
			timestamp = Date.now();

			hash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);

		} while(hash.substring(0, difficulty) !== '0'.repeat(difficulty));

		return new this({timestamp, lastHash, data, difficulty, nonce, hash});
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