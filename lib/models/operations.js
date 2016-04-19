"use strict"

var MongoClient = require('mongodb').MongoClient,
    config = require('../../config/config'),
    host = config.mongodb.host || "127.0.0.1",
	port = config.mongodb.port || 27017,
	db = config.mongodb.db,
	url = "mongodb://"+host+":"+port+"/"+db,
    objectId = require("mongodb").ObjectID,
    MONGOLAB_URI = 'mongodb://ds011251.mlab.com:11251/heroku_fxq3cjhg';

module.exports.establishConnection = function (callback) {
	MongoClient.connect(MONGOLAB_URI || url, function(err, db) {
		if(err) {
			console.log("Unable to establish database connection, quitting..");
			callback(true, false);
		}
		console.log("Connected to database..");
		callback(false, db);
	});
}

module.exports.save = function(body, callback) {
	databaseConnection.collection("productList").insert(body, function(err,data) {
	  if(err){
		    return callback(true, false);
	    }
	    callback(false, data);
	});
}

module.exports.delete = function(id, callback) {
	var productID = objectId(id);
	databaseConnection.collection("productList").remove({_id:productID}, function(err, data) {
        if (err) {
        	return callback(true, false);    
        }
       	callback(false, data); 
	});
};

module.exports.search = function(id, callback) {
	var productID = objectId(id);
    databaseConnection.collection("productList").findOne({_id:productID}, function(err, result) {
        if (err) {
            return callback(true, false);    
        }
        callback(false,true);
    });
};

module.exports.edit = function(id, body, callback) {
	var productID = objectId(id);
	databaseConnection.collection("productList").findAndModify({ _id: productID }, [], { $set: body }, { new: true }, function(err,result) {
        if (err) {
            return callback(true, false);      
        }
        callback(false, result);
	});
};

module.exports.addUsers = function(data, callback) {
	databaseConnection.collection("users").insert(data, function(err,result) {
	    if(err){
			return callback(true, false);    
	    }
	    callback(false, result);
	});
};

