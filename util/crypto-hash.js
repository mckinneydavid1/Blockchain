//this file is used for creating a one-to-one hash function
//input can not be found based on output
const crypto = require('crypto');

const cryptoHash = (...inputs) => {
	const hash = crypto.createHash('sha256');

	hash.update(inputs.sort().join(' '));

	return hash.digest('hex');

};

module.exports = cryptoHash;