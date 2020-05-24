const rootPath = "../";
const logger = require(rootPath + "helpers/logger");
const db = require(rootPath + "db");
const utils = require(rootPath + "helpers/utils");

function saveImage(file) {
	return utils.promisifyFileRead({
		type: "ArrayBuffer",
		data: file
	}).then(
		function (buffer) {
			const image = new db.Image();
			image.name = file.name;
			image.type = file.type;
			image.data = buffer.target.nodeBufferResult;
			return image.save();
		}
	)
}

module.exports = {
	saveImage
}
