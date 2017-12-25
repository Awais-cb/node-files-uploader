module.exports= {
	// Check file type currently made for images 
	checkFileType:function(file,callback) {
		// we can require node modules into out custom modules too
		const path = require('path');
		// Allowed extensions
		var filetypes = /jpeg|jpg|png|gif/;
		// checking if file's extension matches the Allowed ext
		var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
		// Check mime type 
		var mimetype = filetypes.test(file.mimetype);
		if(extname && mimetype){
			return callback(null,true);
		}else{
			callback("Error:Images only!");
		}
	}
}