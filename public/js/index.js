$(document).ready(function() {
	io = io.connect();

	$('#register_form').submit(function onSubmit(event) {
		event.preventDefault();
		var submit = true;

		var username = $('#register_username').val();
		if (!validateUsername(username)) submit = false;

		var password1 = $('#register_password').val();
		var password2 = $('#register_password2').val();
		if (!validatePassword(password1, password2)) submit = false;

		var captcha = $('#captcha_answer').val();

		if (submit) {
			io.emit('register', {
				username: username,
				password: password1,
				captchaAttempt: captcha,
				captchaSolution: window.captchaSolution
			});
		}
		return;
	});

	function validateUsername(username) {
		$input = $('#register_username');
		if (typeof username !== 'string' ||
			username.length < 3 ||
			username.match(/[A-Za-z0-9]*/)[0] !== username) {
			$input.parent().addClass('has-error')
			$input.siblings('label').text('Username - invalid username');
			return false;
		} else {
			$input.parent().removeClass('has-error');
			$input.siblings('label').text('Username');
			return true;
		}
	};

	function validatePassword(password1, password2) {
		$input1 = $('#register_password');
		$input2 = $('#register_password2');
		if (typeof password1 !== 'string' ||
			password1 !== password2 ||
			password1.length < 4) {
			$input1.parent().addClass('has-error');
			$input1.siblings('label').text('Password - must be at least 4 characters long and passwords must match');
			return false;
		} else {
			$input1.parent().removeClass('has-error');
			$input1.siblings('label').text('Password');
			return true;
		}
	}

	io.on('incorrect_captcha', function(data){
		$('#captcha_img').attr('src', data.captcha.image);
		window.captchaSolution = data.captcha.solution;
		$('#captcha_img').parent().parent().addClass('has-error');
	})
});