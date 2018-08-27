var db = require('../config/db.js');

exports.getPlacemarks = function(callback){
	db.selectQuery(null,'pen_books_addresses','available = 1',function(err,res){
		console.log('FC getPlacemarks =====');
		callback(null,res);
	});
}