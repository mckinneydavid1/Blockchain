const Block = require('./block');
const {GENESIS_DATA} = require('./config');
const cryptoHash = require('./crypto-hash');

// describe takes two parameters. a string and a closure
describe('Block', () => {
	const timestamp = 'a-date';
	const lastHash = 'foo-hash';
	const hash = 'bar-hash';
	const data = ['blockchain', 'data'];
	const block = new Block({timestamp, lastHash, hash, data});

	// it() takes two parameters. a string and a closure
	//test a single block
	it('has a timestamp, lastHash, hash, and data property', () => {
		expect(block.timestamp).toEqual(timestamp);
		expect(block.lastHash).toEqual(lastHash);
		expect(block.hash).toEqual(hash);
		expect(block.data).toEqual(data);
	});

	//static function on the block
	describe('genesis()', () => {
		const genesisBlock = Block.genesis();

		// compares first value to second
		it('returns a Block instance',  () => {
			expect(genesisBlock instanceof Block).toBe(true);
		});

		//return genesis data that we defined
		it('returns the genesis data', () => {
			expect(genesisBlock).toEqual(GENESIS_DATA);
		});
	});
	

	//test the minedBlock
	describe('mineBlock()', () => {
		const lastBlock = Block.genesis();
		const data = 'mined data';
		const minedBlock = Block.mineBlock({lastBlock, data});

		it('returns a Block instance', () => {
			expect(minedBlock instanceof Block).toBe(true);
		});

		it('sets the `lastHash` to be the `hash` of the lastBlock', () => {
			expect(minedBlock.lastHash).toEqual(lastBlock.hash);
		});

		it('sets the `data`', () => {
			expect(minedBlock.data).toEqual(data);
		});

		it('sets a `timestamp`', () => {
			expect(minedBlock.timestamp).not.toEqual(undefined);
		});

		it('creates a SHA-256 `hash` based on the proper inputs', () => {
			expect(minedBlock.hash)
				.toEqual(cryptoHash(minedBlock.timestamp, lastBlock.hash, data));
		});
	});
});