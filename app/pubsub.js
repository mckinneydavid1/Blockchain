const redis = require('redis');
const Blockchain = require('../blockchain');

const CHANNELS = {
	TEST: 'TEST',
	BLOCKCHAIN: 'BLOCKCHAIN'
};


class PubSub {
	constructor({blockchain}) {
		this.blockchain = blockchain;
		this.publisher = redis.createClient();
		this.subscriber = redis.createClient();

		//this.subscriber.subscribe(CHANNELS.TEST);
		//this.subscriber.subscribe(CHANNELS.BLOCKCHAIN);
		//replace with helper func
		this.subscribeToChannels();

		//we need a way for the subscriber to handle the messages
		//fires every time a messgage is received
		this.subscriber.on(
			'message', 
			(channel, message) => this.handleMessage(channel, message)
		);
	}

	handleMessage(channel, message) {
		console.log(`Message received. Channel: ${channel}. Message ${message}.`);
		//parse the json message object
		const parsedMessage = JSON.parse(message);

		if(channel === CHANNELS.BLOCKCHAIN) {
			this.blockchain.replaceChain(parsedMessage);
		}
	}

	subscribeToChannels() {
		//create an object that takes all the values in CHANNEL and 
		//uses a callback to subscribe to each one
		Object.values(CHANNELS).forEach(channel => {
			this.subscriber.subscribe(channel);
		});
	}
	//helper function to publish to a channel
	publish({channel, message}) {
		//this is included so that we aren't subscribing to a message that we are publishing
		this.subscriber.unsubscribe(channel, () => {
			this.publisher.publish(channel, message, () => {
				this.subscriber.subscribe(channel, message);
			});
		});
		
	}

	broadcastChain() {
		this.publish({
			channel: CHANNELS.BLOCKCHAIN,
			//is an array, so we have to turn it into a string
			message: JSON.stringify(this.blockchain.chain)
		});
	}
}

module.exports = PubSub;