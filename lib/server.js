var http = require("http"),
	url = require("url"),
	router = require("./router.js"),
	config = require("../config/config.json"),
	port = process.env.PORT || 3000;


module.exports.start = function(route, handle) {
	function onRequest(request, response) {
		
		var pathname = url.parse(request.url).pathname;
        route(handle, pathname, request, response);
    }
	
	module.exports.externalServer = http.createServer(onRequest).listen(port);
	console.log("Server has started at: "+port);
}
