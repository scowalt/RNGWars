module.exports = function(passport) {
	return function authenticate(req, res, next) {
		passport.authenticate('local', function(err, user, info) {
			if (err) {
				return next(err);
			}
			if (!user) {
				return res.redirect('/');
			}
			req.logIn(user, function(err) {
				if (err) {
					return next(err);
				}
				return res.redirect('/game');
			});
		})(req, res, next);
	}
}