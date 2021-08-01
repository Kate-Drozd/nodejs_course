// TODO: Add logic for the next todos:
//       import an instance of FileProcessor class from fileProcessor.js as 'fileProcessingEventEmitter'
//       create listeners and listen to events (define by yourself what you want to do inside the listeners)
//       handle 'error' event

function listenerForPrepare(...messages) {
    // this listener is an example: he wants to be subscribed on 'prepare' event
    console.log('"prepare" event has been handled');
    console.log(`Received messages: ${messages.join('.')}`)
}

// This listener wants to be subscribed on event, emitter for 'dealWithEventsInStreamsInFs'
function <add function name>() { }

// This listener wants to be subscribed on event, emitter for 'dealWithStreamsInFs'
function <add function name>() { }

function errorListener() { }


exports.registerAllListeners = function () {
    // This is an example how to subscribe on event
    fileProcessingEventEmitter.on('prepare', listenerForPrepare);

    // TODO: subscribe to all other events
}