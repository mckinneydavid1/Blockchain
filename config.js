const MINE_RATE = 1000;
const INITIAL_DIFFICULTY = 3;

//since we have an initial difficulty for genesis block,
//every block that comes after can base their difficulty
//on the one that came before it
const GENESIS_DATA = {
	timestamp: 1,
	lastHash: 'omegaHash',
	hash: 'alphaHash',
	difficulty: INITIAL_DIFFICULTY,
	nonce : 0,
	data: []
};

//starting balance for a wallet
const STARTING_BALANCE = 1000;


//let other files have access to this object
module.exports = {GENESIS_DATA, MINE_RATE, STARTING_BALANCE};
