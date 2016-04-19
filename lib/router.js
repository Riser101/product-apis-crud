"use strict";

var url = require("url");

module.exports.route = function(handle, pathname, request, response) {
	if(typeof handle[pathname] === 'function') {
		handle[pathname](request, response);
	} else {
		console.log("no request handler found for "+pathname);
	}
}

