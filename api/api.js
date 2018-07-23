console.log("api.js connected!");
var http = require('http');
var url = require('url');
var fs = require('fs');
var db = require('../config/db.js');
var s = require('../core/system.js');
var http = require('http');

// exports.Router = function(route, res){
// 	// var module = require('../modules/')
// 	console.log("Router call for route: "+route.pathname);
// 	var filename = "./html/" + route.pathname+".html"
// 	fs.readFile(filename, function(err,data){
// 		if(err){
// 			res.writeHead(404,{'Content-Type': 'text/html'});
// 			return res.end("404 Not Found");
// 		}
// 		res.writeHead(200,{'Content-Type': 'text/html'});
// 		res.write(data);
// 		return res.end();
// 	});
// }

exports.getRoute = function(route,res){

	var view = "./html/" + route + ".html";
	console.log("View path: "+view);
	var model = "./models/" + route.replace(/[A-Za-z]/g,"");
	console.log("Model path: "+model+'.js');
	switch(route){
		case '/index':
			console.log("index case!");
			fs.readFile('./html/index.html', function(err,data){
				if(err){
					res.writeHead(404, {'Content-type': 'text/html'});
					return res.end("404 Not Found");
				}
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.write(data);
				return res.end();
			});
			break;
		default:
		fs.readFile('./html/404.html',function(err,data){
			if(err){
				res.writeHead(404, {'Content-Type': 'text/html'});
				return res.end("Everything is so fucked up that even 404 threw an error >_<");
			}
			res.writeHead(200, {'Conent-Type': 'text/html'});
			res.write(data);
		});
	}
}