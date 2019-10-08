/* This file contains implementation for a block and for mining a block
*/
const {GENESIS_DATA} = require('./config');
const cryptoHash = require('./crypto-hash');
// create a Class to represent a single block
class Block {
	constructor({timestamp, lastHash, hash, data}) {
		this.timestamp =  timestamp;
		this.lastHash = lastHash;
		this.hash = hash;
		this.data = data;
	}

	// we want a static instance
	// this is a factory method. creates an instance of class without using constructor method
	static genesis() {
		return new this(GENESIS_DATA);
	}

	static mineBlock({lastBlock, data}) {
		const timestamp = Date.now();
		const lastHash = lastBlock.hash;

		return new this({
		timestamp,
		lastHash,
		data,
		hash: cryptoHash(timestamp, lastHash, data)
		});
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