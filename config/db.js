var mysql = require('mysql');
console.log("====db.js connected!====");

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "gbhfvblf",
	database: "test"
});

// con.connect(function(err){
// 	if(err) throw err;
// 	console.log("connected");
// })

exports.createDatabase = function(name){
	console.log('=====createDatabase=====');
	con.connect(function(err){
		if (err) throw err;
		console.log("Connected!");
		con.query("CREATE DATABASE "+name, function(err_create, result){
			if(err_create){
				console.log('=====Exiting createDatabase with error=====');
				throw err_create;
			}
			console.log('Database '+name+' created!');
			console.log('=====Finishing Successfully createDatabase=====');
		});
	});
}

exports.createTable = function(name,columns,primary_key,keys){
	console.log('=====createTable=====');
	con.connect(function(err){
		if(err){
			console.log('=====Exiting createTable with error=====');
			throw err;
		}
		console.log("Connected!");
		var columnsString = '';
		for(column in columns){
			columnsString += '`'+column+'` '+columns[column]+','
		}
		var keysString = '';
		for(key in keys){
			keysString += ",UNIQUE KEY "+key+keys[key];
		}
		var sql = "CREATE TABLE "+name+" ("+columnsString+" PRIMARY KEY(`"+primary_key+"`)"+keysString+")";
		console.log(sql);
		con.query(sql, function (err, result){
			if(err){
				console.log('=====Exiting createTable with error=====');
				throw err;
			}
			console.log("Table created!");
			console.log('=====Finishing Successfully createTable=====');
		});
	});
}

exports.selectQuery = function(columns,table,cond){
	console.log('=====selectQuery=====');
	if(columns == null || columns == undefined){
		columns = '*';
	}
	if(cond == null || cond == undefined){
		cond = '1';
	}
	con.connect(function(err){
		if(err) throw err;
		console.log("Connected!");
		con.query("SELECT "+columns+" FROM "+table+" WHERE "+cond,function(err_select, result){
			if(err_select){
				console.log('=====Exiting selectQuery with error=====');
				throw err_select;
			}
			console.log('Query completed!');
			console.log(result);
			console.log('=====Finishing Successfully selectQuery=====');
		});
	});
}

exports.insertQuery = function(table,dataArray){
	console.log('=====insertQuery=====');
	con.connect(function(err){
		console.log('Connected!');
		console.log('dataArray is '+dataArray);
		// var valuesString = "";
		// var data = Array.prototype.slice.call(dataArray);
		// console.log('test '+data);
		var queryString = dataArray.join('\',\'');
		var sql = "INSERT INTO "+table+" VALUES ('"+queryString+"')";
		console.log("Query: "+sql);
		if(dataArray){
			con.query(sql,function(err_insert,result){
				if(err_insert){
					console.log('=====Exiting insertQuery with error=====');
					throw err_insert;
				}
				console.log('1 row inserted!');
				console.log('=====Finishing Successfully insertQuery=====');
			});
		} else {
			console.log('Data Error!');
		}
	});
}

