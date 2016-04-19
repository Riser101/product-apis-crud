//commonfunctions
var crypto = require('crypto');
exports.getHRFDate = function() {
	var m_names = new Array("January", "February", "March", 
							"April", "May", "June", "July", "August", "September", 
							"October", "November", "December");
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth();
	var yyyy = today.getFullYear();
	if(dd<10) { dd='0'+dd } 
	var date = m_names[mm]+' '+dd+', '+yyyy;
	return date;
}

module.exports.validateLogin = function(email, password, callback) {
	var hashedPass = crypto
		.createHash('md5')
		.update(password)
        .digest('hex');

    var data = {
    	email: email,
    	password: hashedPass
    };    
	databaseConnection.collection("users").findOne(data, function(err, result) {
		if(err) {
			return callback(true, false);	
		}
		callback(false, result);
	});
};


module.exports.successResponse = function(res, text, result) {
	res.writeHead(200, {"Content-Type": "application/json"});
 	var successRes = JSON.stringify({ 
		data: {
		 	id : result
		},
		error : {
			code : 0,
			text : text
			}
	});
	res.end(successRes);
};



