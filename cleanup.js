const fs = require("fs");
function cleanup () {
	fs.rmdir('./Output'=>{console.log('Output directory removed successfully!')})
}
module.exports.cleanup = cleanup();