// NOTE: This is a file for test. Your mentor (or speaker) executes this file and checks your code
const fileProcessor = require('./fileProcessor');
const {registerAllListeners} = require('./listener');
const cleanup = require('./cleanup');
const prepare = require('./prepare');

cleanup();
prepare();
registerAllListeners();
fileProcessor.run();