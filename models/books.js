var db = require('../config/db.js');

exports.getPlacemarks = function(callback){
	db.selectQuery(null,'pen_books_addresses','available = 1',function(err,res){
		console.log('FC getPlacemarks =====');
		callback(null,res);
	});
};

exports.bookTaken = function(data){
	console.log('=====bookTaken=====');
	console.log(data);
	db.updateQuery('pen_books_addresses',data,'id = ' + data['id']);
}