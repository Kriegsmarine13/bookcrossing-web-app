$(document).ready(function(){
	console.log('custom.js connected');
	var swiper = new Swiper ('.swiper-container', {
		direction: 'horizontal',
		loop: true,
		autoplay: {
			delay: 5000,
		}
	});

	$('#add-book').submit(function(event) {
		console.log('submit event fired');
		event.preventDefault();
		var jsonData = {};
		$(this).find('input').each(function() {
			// console.log($(this).val());
			var name = $(this).attr('name');
			var val = $(this).val();

			jsonData[name] = val;
		});
		console.log(jsonData);

		$.post('/add', jsonData, function(resp) {
			console.log('Data sent!');
		});
	});
})
.on('click','.book-taken', function(){
	var id = $(this).attr('data-id');
	var jsonData = {
		'id': id,
		'queryData': {
			'available': 0,
		}
	};
	console.log(jsonData);
	$.post('/bookTaken', jsonData, function(resp){
		console.log('Book taken!');
	})
});