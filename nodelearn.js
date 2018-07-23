//Подключение
var http = require('http'); //Самое важное - ХТТП
var s = require('./core/system.js');
// var formidable = require('formidable'); //Что-то для форм
var fs = require('fs'); //Использование файловой системы
var db = require('./config/db.js'); //Коннектор к ДБ
var url = require('url');
var api = require('./api/api.js');
console.log("Started!");

http.createServer(function(req,res){
	var q = url.parse(req.url,true);
	s.Router(q, res);
}).listen(8080);



// Создание базы данных - ОКs
// db.createDatabase('test');

// Объект данных для создания таблицы (имя:значение) - ОК
// var data = {
// 	"id": "INT(255) NOT NULL AUTO_INCREMENT",
// 	"login": "VARCHAR(25) NOT NULL",
// 	"password": "VARCHAR(88) NOT NULL",
// 	"email": "VARCHAR(60) DEFAULT NULL",
// 	"permission_level": "TINYINT(1)",
// 	"additional_name": "VARCHAR(60) DEFAULT NULL"
// }

// Объект данных для создания ключей таблицы, не предусмотрен вариант отсутствия ключей
// var keys = {
// 	"`login`": "(`login`)",
// 	"`password`": "(`password`)",
// 	"`email`": "(`email`)",
// 	"`additional_name`": "(`additional_name`)"
// }

// Создание таблицы - ОК
// db.createTable('users',data,'id',keys);

//Массив данных для таблицы - ОК
// var dataArray = ['null',"'admin'","'12345'","'test@test.ru'","'0'","'furi321'"];

// Создание записи в таблице - ОК
// db.insertQuery('users',dataArray);

// Получение данных из таблицы - ОК? Как потом передать в шаблон, если нельзя вызвать сюда?
// var select = db.selectQuery('*','users');