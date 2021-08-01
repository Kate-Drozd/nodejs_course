// NOTE: This is a file for test. Your mentor (or speaker) executes this file and checks your code
const fileProcessor = ('./fileProcessor');
const {registerAllListeners} = require('./listener');
const prepare = require('./prepare');
const cleanup = require('./cleanup');

cleanup();
prepare();
registerAllListeners();
fileProcessor.run();