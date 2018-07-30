console.log("app.js connected!");
// var http = require('http');
// var url = require('url');
// var fs = require('fs');
// var db = require('./config/db.js');
var s = require('./core/system.js');
// var http = require('http');
var path = require('path');
var pug = require('pug');
var express = require('express');
var app = express();

app.set('view engine','pug');
app.set('views',__dirname+'/pug/blocks');
// console.log('Dirname is : '+__dirname);
app.use('/css',express.static(__dirname+'/css'));
// app.use(express.static(path.join(__dirname,'/css


app.get('/test', function(req,res){
	console.log("test path");
	res.render('test',{name:"jopa"});
});

app.get('', function(req,res){
	//SLEZHKA PZDC
	s.getConnectionIp(req);

	console.log('index path');
	res.render('block_index');
});

app.listen(8080,function(){
	console.log('Listening on port 8080');
})