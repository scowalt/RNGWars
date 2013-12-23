$(document).ready(function() {
	io = io.connect();

	io.on('connect', function onConnect() {
		io.emit('ready', null);
	});

	$('#register_form').submit(function onSubmit(event) {
		event.preventDefault();
		var username = $('#register_username').val();
		if (!validateUsername(username)) return;
		var password1 = $('#register_password').val();
		var password2 = $('#register_password2').val();
		var captcha = $('#captcha').val();
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
});