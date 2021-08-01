'use strict'
/**
 * Used resources:
 * https://nodejs.org/docs/latest-v12.x/api/fs.html
 * https://nodejs.org/docs/latest-v12.x/api/buffer.html
 * https://nodejs.org/docs/latest-v12.x/api/events.html
 * https://www.tutorialspoint.com/nodejs/nodejs_event_emitter.htm
 */
//      The main goal - copy files from folder "data" to "output" folder (using fs module) and emit events

const EventEmitter = require('events');
EventEmitter.captureRejection = true; //node --unhandled-rejections=strict
const fs = require("fs");
const prepare = require("./prepare");

class FileProcessor extends EventEmitter {
    constructor(props) {
        super(props);
    }

    run() {
        prepare();
        this.emit('prepare');
        // TODO: call here 'dealWithEventsInStreamsInFs' and 'dealWithStreamsInFs' and emit events

        this.emit('error', 'Some error message'); // this error has to be handled in listeners
    }
    dealWithEventsInStreamsInFs() {
        // TODO: Set utf-8 encoding for the read stream
        const readStream = fs.createReadStream("some file");

        readStream.on("data", (chunk) => {
            // TODO: count chunks and append file in output folder with each chunk
        })

        readStream.on("end", () => {
            // TODO:
            //  emit event (e.g. 'end') that you finish to read from the stream
            //  add to event a message with number of chunks (as an event argument)
        })

        console.log("Main is finished, but streams are still working");
    }

    dealWithStreamsInFs() {
        const readStream = fs.createReadStream('./data/<file_name>.pdf');
        const writeStream = fs.createWriteStream('./output/<file_name>.pdf');
        // Use pipe here to read from one stream and write to another
    }
}

module.exports = new FileProcessor();