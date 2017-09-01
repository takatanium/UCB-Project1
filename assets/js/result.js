$(function() {
	$.scrollify({
		section : ".sticky-scroll",
		scrollSpeed: 1100,
		before: function() {
      var currentSlide = $.scrollify.current();
      console.log(currentSlide.attr('id'));
    }
	});
});