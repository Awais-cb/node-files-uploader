const express = require('express');
const ejs = require('ejs');
const multer = require('multer');
const path = require('path');
const port=8080;



const app=express();
app.set('view engine','ejs');

app.use(express.static('./public'));

// Setting up storage engines
const storageEngine=multer.diskStorage({
	destination : './public/uploads/',
	filename : function (req,file,callback) {
		// null replaced err
		callback(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname));
	}
});

 // Init uploader
 // using single for single file we can upload arrays of images too
 const uploader=multer({
 	storage:storageEngine
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
			res.send('test');
		}		
	});
});





app.listen(port,function() {
	console.log(`Server is started at port ${port}`); 
});

