const Blockchain = require('./blockchain');
const Block = require('./block');

describe('Blockchain', () => {
	let blockchain;

	//start with a new blockchain before each test
	beforeEach(() => {
		blockchain = new Blockchain();
	});


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


	describe('isValidChain()', () => {
		//add this before each so we don't have to create all the new blocks every time
		beforeEach(() => {
			blockchain.addBlock({data: 'Apples'});
			blockchain.addBlock({data: 'Cherries'});
			blockchain.addBlock({data: 'Pumpkins'});
		})

		describe('when the chain does not start with the genesis block', () => {
			it('returns false', () => { 
				blockchain.chain[0] = {data: 'fake-genesis'};

				expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
			});
		});

		describe('when the chain starts with the genesis block and has multiple blocks', () => {
			describe('and a lastHash reference has changed', () => {
				it('it returns false', () =>{

					blockchain.chain[2].lastHash = 'broken-lastHash';

					expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
				});
			});

			describe('and the chain contains a block with an invalid field', () => {
				it('returns false', () => {
	
					blockchain.chain[2].data = 'some-bad-and-evil-data';

					expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
				});
			});

			describe('and the chain does not contain any invalid blocks', () => {
				it('returns true', () => {
					expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);
				});
			});
		});
	});
});


