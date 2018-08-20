console.log("====system.js connected!====");
var db = require('../config/db.js');
var { body,validationResult } = require('express-validator/check');
var { sanitizeBody } = require('express-validator/filter');

exports.getConnectionIp = function(req){
	// var ip = req.header('x-forwarded-for');
	console.log('=====getConnectionIp=====');
	var ip = req.connection.remoteAddress;
	var ipTest = new RegExp("^(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))$");
	
	//Проверка на IPv4
	if(ipTest.test(ip)){
		var ipv4 = ip;
	} else {
		var ipv4 = ip.replace('::ffff:','');
	}
	var path = req.path;
	var date = new Date();
    var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
	var dataArray = [0,ip,str,ipv4,path];

	if(!ip || !date){
		console.log('EMPTY IP OR DATE');
		console.log('=====Exiting getConnectionIp=====');
		return false;
	}

	db.insertQuery('pen_connection_logs', dataArray);
	console.log('=====getConnectionIp Successfully Finished!=====');
}

exports.handleFormData = function(req){
	body('book_title', 'Название книги не может быть пустым!').isLength({min: 1}).withMessage('Название книги не может быть пустым!'),
	body('city','Город не указан!').isLength({min: 1}).withMessage('Укажите город!')
}

exports.sanitizeFormData = function(req){

}

exports.validateFormData = function(req){
	const errors = validationResult(req);

	if(!errors.isEmpty()){
		//stuff
	} else {
		// Data from form is valid.
	}
}

exports.getPostData = function(req){
	console.log(req.body);
}