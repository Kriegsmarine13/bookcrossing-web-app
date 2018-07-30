var mysql = require('mysql');
console.log("db connected!");

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
	con.connect(function(err){
		if (err) throw err;
		console.log("Connected!");
		con.query("CREATE DATABASE "+name, function(err_create, result){
			if(err_create) throw err_create;
			console.log('Database '+name+' created!');
		});
	});
}

exports.createTable = function(name,columns,primary_key,keys){
	con.connect(function(err){
		if(err) throw err;
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
			if(err) throw err;
			console.log("Table created!");
		});
	});
}

exports.selectQuery = function(columns,table,cond){
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
			if(err_select) throw err_select;
			console.log('Query completed!');
			console.log(result);
		});
	});
}

exports.insertQuery = function(table,dataArray){
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
				if(err_insert) throw err_insert;
				console.log('1 row inserted!');
			});
		} else {
			console.log('Insert failed!');
		}
	});
}

