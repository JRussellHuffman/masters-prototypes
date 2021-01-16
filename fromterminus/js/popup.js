$(document).ready(function() {
	$(".close, .confirm").click(function(){
		$(".popContainer").fadeOut();
	})
	$("#next0").click(function(){
		$("#slide0").fadeOut();
		$("#slide1").fadeIn();
	})
	$("#next1").click(function(){
		$("#slide1").fadeOut();
		$("#slide2").fadeIn();
	})
	$("#next2").click(function(){
		$("#slide2").fadeOut();
		$("#slide3").fadeIn();
	})
	$("#next3").click(function(){
		$("#slide3").fadeOut();
		$("#slide4").fadeIn();
	})
	$("#next4").click(function(){
		$(".popContainer").fadeOut();
		$("#slide4").fadeOut();
	})
});