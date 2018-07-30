console.log("system.js connected!");
var db = require('../config/db.js');

exports.getConnectionIp = function(req){
	// var ip = req.header('x-forwarded-for');
	// console.log(req);
	var ip = req.connection.remoteAddress;
	// var date = new Date();
	var date = new Date();
    var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
	var dataArray = [0,ip, str];
	// var dataArray = new Array();
	// dataArray['ip'] = ip;
	// dataArray['timestamp'] = date;
	console.log('system.js dataArray '+dataArray[0]);
	console.log('IP of client: '+ip);
	console.log('Current date is '+str);
	if(!ip || !date){
		console.log('EMPTY IP OR DATE');
		return false;
	}
	db.insertQuery('pen_connection_logs', dataArray);

	// return ip;
}