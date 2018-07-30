console.log("system.js connected!");
var db = require('../config/db.js');

exports.getConnectionIp = function(req){
	// var ip = req.header('x-forwarded-for');
	var ip = req.connection.remoteAddress;
	var ipTest = new RegExp("^(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))$");
	if(ipTest.test(ip)){
		var ipv4 = ip;
	} else {
		var ipv4 = ip.replace('::ffff:','');
		console.log(ipv4);
	}
	var date = new Date();
    var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
	var dataArray = [0,ip,str,ipv4];
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