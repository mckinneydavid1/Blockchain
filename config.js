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

//let other files have access to this object
module.exports = {GENESIS_DATA};