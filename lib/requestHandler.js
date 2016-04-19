"use strict"

var	objectId = require("mongodb").ObjectID,
	productID="",
	body = "",
    validatesEmail = require('email-validator'),
    dateISO = Math.floor(Date.now()/1000),
    common = require('../commonFunctions/common'),
    product = require('./models/operations.js'),
    crypto = require('crypto'),
    dateHRF = common.getHRFDate(),
    errMsg = require('../errors/errorCodes');

module.exports.defaultRoute = function (req, res) {
    body = "";
    req.on('data', function (chunk) {
        body += chunk;
    });
	  
    req.on('end', function () {
 	    res.end('Welcome, you should probably be hitting /users, /add, /delete, /search, /edit, /login.\nTry this: localhost:3000/users \n\nBest of luck!');
	});
};


/**
 * Adds product to the database
 *
 * @param req http request object
 * @param res http response object
 */
module.exports.addMethod = function (req, res) {
    body = "";
    req.on('data', function (chunk) {
        body += chunk;
    });
	  
    req.on('end', function () {
 	    body = JSON.parse(body);   
 		    
		common.validateLogin(body.email, body.password, function(err, data) {
 	    	if(data == null) {
 	    		return res.end(errMsg['1000']);
 	    	}
	 	    delete body['email'];
	 	    delete body['password'];
			
	 	    product.save(body, function(err, result) {
	 	    	if(err){
				 	return res.end(errMsg['1001']);
				}	
				common.successResponse(res,'Successfully added your product', result);
			}); 
 	    });
	});
};

/**
 * Deletes a product from the database
 *
 * @param req http request object
 * @param res http response object
 */
module.exports.deleteMethod = function (req, res) {
    body="";
    req.on('data', function (chunk) {
        body += chunk;
    });
  
    req.on('end', function () {
  	    body = JSON.parse(body);   
  	    productID = body["id"];
   		
   		if(objectId.isValid(productID) == false) {
   			return res.end(errMsg['1004']);
   		}
   		
        common.validateLogin(body.email, body.password, function(err, data) {
 	    	if(data == null) {
 	    		return res.end(errMsg['1000']);
 	    	}
	 	    delete body['email'];
	 	    delete body['password'];

	 	    product.delete(productID, function(err, result) {
	 	        if(err) {
	 	            return res.end(errMsg['1003']);	
	 	        }				
	 	        common.successResponse(res,'Successfully deleted your product', result);
	 	    });
		});
	})
};

/**
 * Searches a product in the database
 *
 * @param req http request object
 * @param res http response object
 * returns _id
 */
module.exports.searchMethod = function (req, res) {
	body = "";
	req.on('data', function (chunk) {
        body += chunk;
    });
  
    req.on('end', function () {
  	    body = JSON.parse(body);   
  	    productID = body["id"];

  		if(objectId.isValid(productID) == false) {
   			return res.end(errMsg['1004']);	
   		}
  	    
  	    common.validateLogin(body.email, body.password, function(err, data) {
 	    	if(data == null) {
 	    		return res.end(errMsg['1000']);
 	    	}
	 	    delete body['email'];
	 	    delete body['password'];
	  	    
			product.search(productID, function(err, result) {
	 	    	if(err) {
	 	    		return res.end(errMsg['1005']);
	 	    	}
	 	    	if(result !== null) {
			    	return common.successResponse(res,'Found your product', result);
			    }
			    res.end(errMsg['1006']);
	 	    });
		});
	})
};

/**
 * Edits a product in the database
 *
 * @param req http request object
 * @param res http response object
 */
module.exports.editMethod = function(req, res) {
	body = "";
	req.on('data', function (chunk) {
        body += chunk;
    });
  
    req.on('end', function () {
  	    body = JSON.parse(body);   
  	    productID = body["id"];

  	    if(objectId.isValid(productID) == false) {
   			return res.end(errMsg['1004']);	
   		}

        common.validateLogin(body.email, body.password, function(err, data) {
			if(data == null) {
				return res.end(errMsg['1000']);
			}
		    delete body['email'];
		    delete body['password'];
	  	    delete body["id"];
	  	   
	  	    product.edit(productID, body, function(err, result) {
	  	       	 if(err) {
	  	    	  	 return res.end(errMsg['1007']);
	  	    	 }
	  	    	 common.successResponse(res, 'Successfully edited your product', result);
	  	    });
		});    
	})
};

/**
 * adds users to the database
 *
 * @param req http request object
 * @param res http response object
 */
module.exports.usersMethod = function(req, res) {
	body = '';
	req.on('data', function(chunk) {
		body += chunk;
	});

	req.on('end', function () {
  	    body = JSON.parse(body);   
  	  	
  	  	var hashedPass = crypto
			.createHash('md5')
			.update(body.password)
			.digest('hex');


  	  	var data = {
  	  		email: body.email,
  	  		password : hashedPass,
  	  		ts: {
				insISO : dateISO,
				insHRF : dateHRF,
				updISO : dateISO,
				updHRF : dateHRF
		   }
  	  	};	
  	  		
  	    if(!body.email || body.email == '' || !body.password || body.password == '' || !validatesEmail.validate(body.email)) {
    		res.writeHead(400, {"contentType":"application/JSON"});
		    return res.end(errMsg['1002']);
		}
		
		product.addUsers(data, function(err, result) {
			if(err) {
				return res.end(errMsg['1008']);
			}
			common.successResponse(res, 'Successfully added the user', result);
		});
	})
};


/**
 * logs-in a user to the app
 *
 * @param req http request object
 * @param res http response object
 */
module.exports.login = function(req, res) {
	body = '';
	req.on('data', function(chunk) {
		body += chunk;
	});

	req.on('end', function () {
  	    body = JSON.parse(body);   
  	 	
		common.validateLogin(body.email, body.password, function(err, result) {
    		if(err) {
    			return res.end(errMsg['1009']);	
    		}
    		
    		if(result == null) {
    			return res.end(errMsg['1000']);
    		}
    		var result="";
    		common.successResponse(res, "you're logged-in successfully", result);
    	});
    });	
};










