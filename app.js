const express = require('express');
const ejs = require('ejs');
const multer = require('multer');
const path = require('path');
const fileValidator = require('./custom_modules/file_validator');
const port=8080;



const app=express();
app.set('views', path.join(__dirname + '/views'));
app.set('view engine','ejs');

app.use(express.static('./public'));

// 1-Setting up storage engines
const storageEngine=multer.diskStorage({
	destination : './public/uploads/',
	filename : function (req,file,callback) {
		// null replaced err
		callback(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname));
	}
});

 // 2-Init uploader
 // using single for single file we can upload arrays of images too
 const uploader=multer({
 	storage:storageEngine,
 	limits:{fileSize:1000000},
 	fileFilter:function(req,file,callback) {
 		fileValidator.checkFileType(file,callback);
 	}
 }).single('file_upload');



app.get('/',function(req,res,next) {
	res.render('index');
});


app.post('/upload',function(req,res,next) {
	// the middlware which is initialized above
	uploader(req,res,function(err) {
		if(err){
			res.render('index',{
				msg:err
			});
		}else{
			console.log(req.file);
			if(req.file==undefined){
				res.render('index',{
					msg:"Error:Please select a file to upload!"
				});
			}else{
				res.render('index',{
					msg:"File uploaded!",
					file:`uploads/${req.file.filename}`
				});
			}
			
		}		
	});
});





app.listen(port,function() {
	console.log(`Server is started at port ${port}`); 
});

