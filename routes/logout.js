module.exports = function onLogout(req, res){
	req.logout();
	res.redirect('/');
}