"use strict";

var requestHandler = require("./lib/requestHandler.js");  
var router = require("./lib/router.js");
var server = require("./lib/server.js");
var db = require('./lib/models/operations');

db.establishConnection(function (err, db){
    if(err) {
        process.exit(1);
    }
	global.databaseConnection = db;

	var handle = {};
    handle["/"] = requestHandler.defaultRoute;
    handle["/add"] = requestHandler.addMethod;
    handle["/delete"] = requestHandler.deleteMethod;
    handle["/edit"] = requestHandler.editMethod;
    handle["/search"] = requestHandler.searchMethod;
    handle["/users"] = requestHandler.usersMethod;
    handle["/login"] = requestHandler.login;
    
    server.start(router.route, handle);
}); 



