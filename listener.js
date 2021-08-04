const events = require('events');
const fileProcessingEventEmitter = require('./fileProcessor');

function listenerForEventsInStreamsInFs() {
	console.log('"dealWithEventsInStreamsInFs" event has been handled');
 }

function listenerForStreamsInFs() { 
	console.log('"dealWithStreamsInFs" event has been handled');
}

function errorListener(...messages) { 
	console.log('"error" event has been handled');
    console.log(`Received messages: ${messages.join('.')}`)
}


exports.registerAllListeners = function () {
    fileProcessingEventEmitter.on('data', listenerForEventsInStreamsInFs);
    fileProcessingEventEmitter.on('end', listenerForStreamsInFs );
    fileProcessingEventEmitter.on('error', errorListener);
}