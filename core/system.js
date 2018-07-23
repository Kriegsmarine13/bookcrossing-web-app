console.log("system.js connected!");
var url = require('url');
var api = require('../api/api.js');

exports.Router = function(route, res){
	// var module = require('../modules/')
	console.log("Router call for route: "+route.pathname);
	var path = rewriteModule(route.pathname);
	api.getRoute(path, res);
	// var filename = "./html/" + route.pathname+".html";
	// fs.readFile(filename, function(err,data){
	// 	if(err){
	// 		res.writeHead(404,{'Content-Type': 'text/html'});
	// 		return res.end("404 Not Found");
	// 	}
	// 	res.writeHead(200,{'Content-Type': 'text/html'});
	// 	res.write(data);
	// 	return res.end();
	// });
}

var rewriteModule = function(path){
	if(path == '/'){
		path = '/index';
	}


	return path;
}