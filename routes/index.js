var express = require('express');
var router = express.Router();
var shortener = require('../lib/shortener.js')

/* GET home page. */
router.get('/:param', function(req, res, next) {
	var response = shortener.shortify(req.params.param, req.headers.host)
	console.log(response);
	if(response.redir){
		var redir = 'http://'+response.original_url;
		console.log(redir)
		res.redirect(redir);
	}
	else{
		res.send(response);
	}
});

module.exports = router;
