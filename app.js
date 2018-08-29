console.log("====app.js connected!====");
var s = require('./core/system.js');
var path = require('path');
var pug = require('pug');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.set('view engine','pug');
app.set('views',__dirname+'/pug/blocks');

app.use('/css',express.static(__dirname+'/css'));
app.use('/js',express.static(__dirname+'/js'));
app.use('/uploads',express.static(__dirname+'/uploads'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Routes

app.get('/test', function(req,res){
	console.log("test path");
	res.render('test',{name:"jopa"});
});

app.get('', function(req,res){
	//SLEZHKA PZDC
	s.getConnectionIp(req);

	var data = {
		page: '/'
	};

	res.render('block_index', data);
});

app.get('/map', function(req,res){
	s.getConnectionIp(req);

	var data = {
		page: '/map'
	};

	res.render('block_map', data);
});

app.route('/add')
.get(function(req,res,next){
	s.getConnectionIp(req);
	var data = {
		page: '/add'
	};

	res.render('block_add',data);
})
.post(function(req,res,next){
	res.send('POST DATA SENT!');
	console.log('post request on /add');
	s.getPostData(req.body);
});

app.route('/getPlacemarks')
.get(function(req,res,next){
	var books = require('./models/books.js');
	var placemarks = books.getPlacemarks(function(err,data){
		res.send(data);
	});
});

app.route('/bookTaken')
.post(function(req,res,next){
	s.getConnectionIp(req);
	console.log('=== /bookTaken ===');
	console.log(req.body);
	var books = require('./models/books.js');
	var response = books.bookTaken(req.body);
	res.end();
});

//Создание сервера

app.listen(8080,function(){
	console.log('Listening on port 8080');
});