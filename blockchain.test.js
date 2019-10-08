const Blockchain = require('./blockchain');
const Block = require('./block');

describe('Blockchain', () => {
	const blockchain = new Blockchain();


	it('contains a `chain` Array instance', () => {
		expect(blockchain.chain instanceof Array).toBe(true);
	});

	//make sure the blockchain begins with genesis block
	it('starts with the genesis block', () => {
		expect(blockchain.chain[0]).toEqual(Block.genesis());
	});

	//check that it can add a new block to the chain
	it('adds a new block to the chain', () => {
		const newData = 'foo bar';
		blockchain.addBlock({data: newData});

		expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newData);
	});


});


