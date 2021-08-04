const fs = require("fs");
module.exports = function cleanup () {
	fs.rmdirSync('./output', { recursive: true }, (err) => {
  		if (err) throw err;
	})
	console.log('Output directory removed successfully!');
}
