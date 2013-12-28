module.exports = function ensureAuthenticated(req, res, next){
	if (req.isAuthenticated()){
		// serve the page
		next();
	} else {
		res.redirect('/');
	}
}