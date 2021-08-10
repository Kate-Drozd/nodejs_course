/**
 * Main documentation links:
 * (1) https://nodejs.org/dist/latest-v14.x/docs/api/http.html
 * (2) https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/#anatomy-of-an-http-transaction
 * Main idea: your simple application in dedicatedSever folder has to support two types of requests:
 *      - POST request to create a position (required fields - 'category', 'level', 'company', 'description')
 *      - GET request to get all positions
 *
 * Main TODOs:
 *      add logic to check certificate and key in 'certificates' folder. add this folder to ignored files
 *      add logic to use https instead of http in case there are certificate and key in 'certificates' folder
 *      add logic to handle request body
 *      add property for https server port 3001 to ./config.json
 *      follow other TODOs in the code
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const ports = require('./config.json');
const router = require('./router.js')


const options = {
  key: fs.readFileSync('./certificates/server.key'),
  cert: fs.readFileSync('./certificates/server.crt')
};
//console.log(options.cert);


// TODO: Add check for certificate and use https in case you have self-signed certificate on server
 const server = options.cert !== null ? https.createServer(options, requestHandler) : http.createServer(requestHandler)

// TODO: Add check for certificate and use port 3001 in case you have self-signed certificate on server
// use config file to keep both port for http and port for https
// e.g. const port = <check for cert and key> ? <port for https from config> : <port for http from config>
const port = options.cert !== null ? ports.https.port : ports.http.port;

function requestHandler(request, response) {
    const {method, url} = request;
    const parsedUrl = new URL(url);
    const trimmedPath = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');

    // TODO: add logic to handle request body data
    // See: https://nodejs.org/dist/latest-v14.x/docs/api/http.html
    const buffer = [];
    request.addListener('error', (err) => {
        console.error(err);
    });
    request.addListener('data', (chunk) => {
        buffer.push(chunk);
    });
    request.addListener('end', () => {
        // TODO: add logic here to handle the end of emitting chunks of body data:
        //       add logic to find endpoint from ./router.js file using trimmedPath and method - router[trimmedPath][method.toLowerCase()]
        //       handle errors
        buffer = Buffer.concat(buffer).toString();
        //url.concat()
        log(request,response);
    });
    response.writeHead(200);

    // TODO: log all your requests method and url
    function log(request, response) {
        console.log(`${request.method} ${request.url}`);
    }
}

server.listen(port, () => {
    console.log(`I am listening to port ${port} on this computer`);
});