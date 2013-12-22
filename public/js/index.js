$(document).ready(function(){
	io = io.connect();

	io.on('connect', function onConnect(){
		io.emit('ready', null);
	});
});

$('#register_form').submit(function onSubmit(event){
	event.preventDefault();
	var username = $('#register_username').val();
	var password1 = $('#register_password').val();
	var password2 = $('#register_password2').val();
	var captcha = $('#captcha').val();
})