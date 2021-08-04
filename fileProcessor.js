'use strict'

const EventEmitter = require('events');
EventEmitter.captureRejection = true; 
const fs = require("fs");

class FileProcessor extends EventEmitter {
    constructor(props) {
        super(props);
    }

    run() {
        this.dealWithEventsInStreamsInFs();
        this.emit('data');       
        this.emit('end');
        this.dealWithStreamsInFs();
        this.emit('pdf');
        this.emit('error'); 
    }
    dealWithEventsInStreamsInFs() {
        const readStream = fs.createReadStream("./data/small.txt", "utf8");
        const writeStream = fs.createWriteStream('./output/small.txt');
        let count =  0;
        readStream.on("data", (chunk) => {
            writeStream.write(chunk); 
            count +=  chunk.length;
        })
        .on("end", () => {
           console.log("Finished read the stream, number of chunks: ", count);
        })
        readStream.on('error', function(err){
            if(err.code == 'ENOENT'){
                console.log("Файл не найден");
            }else{
                console.error(err);
            }
        });

        console.log("Main is finished, but streams are still working");
    }

    dealWithStreamsInFs() {
        const readStream = fs.createReadStream('./data/big.pdf');
        const writeStream = fs.createWriteStream('./output/big.pdf');
        readStream.on('pdf',() => {
            readStream.pipe(writeStream);
        });
    }
}

module.exports = new FileProcessor();