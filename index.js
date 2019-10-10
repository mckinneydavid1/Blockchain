const bodyParser = require('body-parser');
const express = require('express');
const request = require('request');
const Blockchain = require('./blockchain');
const PubSub = require('./pubsub');


const app = express();
const blockchain = new Blockchain();


const pubsub = new PubSub({blockchain});
const DEFAULT_PORT = 3000;

const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`;


//setTimeout(() => pubsub.broadcastChain(), 1000);





app.use(bodyParser.json());

//request and response parameters
app.get('/api/blocks', (req, res) => {
	//will return the blockchain.chain in its json form
	res.json(blockchain.chain);
});

//user will add a block
app.post('/api/mine', (req, res) => {
	const {data} = req.body;
	blockchain.addBlock({data});

	pubsub.broadcastChain();
	//user will see that their block was added
	res.redirect('/api/blocks');
});

//sync chains so they all have the same chain upon starting
const syncChains = () => {
	request({url:`${ROOT_NODE_ADDRESS}/api/blocks`}, (error, response, body) => {
		if(!error && response.statusCode === 200) {
			const rootChain = JSON.parse(body);

			console.log('replace chain on a sync with', rootChain);
			blockchain.replaceChain(rootChain);
		}
	});
};



let PEER_PORT ;

if(process.env.GENERATE_PEER_PORT === 'true') {
	PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}

const PORT = PEER_PORT || DEFAULT_PORT;	
app.listen(PORT, () => {
	console.log(`listening at localhost:${PORT}`)
	//only call syncChains if not default port
	if(PORT !== DEFAULT_PORT)
		syncChains();
});




