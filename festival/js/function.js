//scroll amounts
var multiplierRight = 1;
var multiplierLeft = 1;
var multiplier = 4.65;

//default active section is left
var activeSection = "left";
//the system will center the active div if autoscroll is true
var autoscroll = false;

//div height stuff
var bottom;
var smallHeight;
var docScroll;
var docHeight;

var windowHeight;

//hover over the left side will make left scroll at speed
function hoverIn() {

	activeSection = "left";
	multiplierLeft = 1;
	multiplierRight = multiplier;
	//$("div.columns").height(bottom / (multiplier-1.4));
	$(document).scrollTop(docScroll / multiplier);
}

//hover over the right side will make right side scroll at speed
function hoverOut() {

	activeSection = "right";
	multiplierRight = 1;
	multiplierLeft = multiplier;
	//$("div.columns").height(bottom);
	$(document).scrollTop(docScroll*multiplier);

 }

//find active element and give it the active class
 function findActive() {

 	$("div.small, div.large").each(function(){

 		if ($(this).offset().top < halfHeight && $(this).offset().top + $(this).outerHeight() > halfHeight) {
 		//if(true){
 			$( this ).addClass( "active" );
 		} else {
 			$( this ).removeClass( "active" );
 		}

 	})

 }

//do stuff to the active div
 function active() {
 	$("div.small").each(function(){
 		if ($(this).hasClass("active") && autoscroll) {
 			//do something to active one with "this"
 			if (activeSection == "left") {
 				//if the mouse is over the left, scroll to the middle of the left div
 				//the 80 is the height of the div with margin, this can be done programatically
 				$('body').animate({scrollTop: ($(this).attr("data-left-id") * smallHeight - 35)}, 250);
 				console.log(activeSection);
 			} else if (activeSection == "right" && autoscroll) {
 				//if the mouse is over the right, scroll to the middle of the right div
 				//the 480 is the height of the div with margin, this can be done programatically
 				$('body').animate({scrollTop: ($(this).attr("data-left-id") * 520 -220)}, 250);
 				console.log(activeSection);
 			}
 		}
 	})
 }

 //choose div
 function choose() {
 	$("div.small").each(function(){
 		$(this).click(function(){
 			$('div.left').animate({scrollTop: ($(this).attr("data-left-id") * smallHeight - 35)}, 500);
 		})
 	});
 }

// ---------------------------- make items on the far left timeline clickable
function chooseFromTime() {
 	$("div.time").each(function(){
 		$(this).click(function(){
 			//$('div.left').animate({scrollTop: ($(this).attr("data-left-id") * smallHeight - 35)}, 500);
 		})
 	});
 }


//touch tests
var $touchLeft = $("div.left")
var $touchRight = $("div.right")

$touchLeft.on('touchstart mousedown',function (e){ 
	activeSection = "left";
	left();  
});

$touchRight.on('touchstart mousedown',function (e){ 
	activeSection = "right";
	right();  
});

//find where active element should be (which is right in the middle)
var winHeight;
function activePos() {
	winHeight = ($(window).height());
	halfHeight = winHeight/2;
	console.log("half window height is " + halfHeight);
}

//filter stories
var blueOn = true;
function toggleBlue() {
	if (blueOn) {
		$("div.blue").fadeOut();
		blueOn = false;
	} else {
		$("div.blue").fadeIn();
		blueOn = true;
	}
}

var pinkOn = true;
function togglePink() {
	if (pinkOn) {
		$("div.pink").fadeOut();
		pinkOn = false;
	} else {
		$("div.pink").fadeIn();
		pinkOn = true;
	}
}

var percentScrolled;

function scrollTime () {
	$("div.timeSlider").css({
		top: windowHeight*percentScrolled,
	})
}

function scrollPercent () {
	percentScrolled = leftScrollAmount/leftHeight;

	return percentScrolled
}

var leftScrollAmount;
var leftHeight;

function left() {
	$("div.left").scroll(function(){
		leftHeight = $("div.leftContent").height();
		leftScrollAmount = $(this).scrollTop();

		if (activeSection == "left") {
			var leftScroll = $("div.left").scrollTop();
			var rightScroll = leftScroll * multiplier;
			$("div.right").scrollTop(rightScroll);
			//console.log("left running");
		} else {
			//console.log("left NOT running");
			return;
		}
	});
}

// when the right is scrolled, scroll the left at a fraction of right
function right() {
	$("div.right").scroll(function(){
		if (activeSection == "right") {
			var rightScroll = $("div.right").scrollTop();
			var leftScroll = rightScroll / multiplier;
			$("div.left").scrollTop(leftScroll);
			//console.log("right running");
		} else {
			//console.log("right NOT running");
			return;
		}
	});
}

//call functions

$("div.right").scroll(function(){

	//update the size of the document and scroll distance base on scroll
	//docScroll = $(document).scrollTop();
	docHeight = $(document).height();
	//the left and right scroll at different speeds
	//$("div.left").scrollTop(docScroll/multiplierLeft);
	//$("div.right").scrollTop(docScroll*multiplierRight);
	//call funcitons based on scroll
	scrollPercent();
	findActive();
	scrollTime ();

	clearTimeout($.data(this, 'scrollTimer'));
	//do something after scrolling has stopped
    $.data(this, 'scrollTimer', setTimeout(function() {
        active();
        console.log("Haven't scrolled in 250ms!");
    }, 250));


});

$(document).ready(function(){

	//find window height
	windowHeight = $(window).height();

	bottom = $("div.bottom").offset().top;
	console.log("height from bottom is " + bottom);
	//$("div.columns").height(bottom);

	smallHeight = $("div.small").outerHeight();
	console.log(smallHeight);

	//setup some divs for filtering (placeholder)
	// $("div.small, div.large, div.time").each(function(){
	// 	if ($(this).attr("data-left-id") % 5 == 0 || $(this).attr("data-right-id") % 5 == 0 || $(this).attr("data-time-id") % 5 == 0) {
 // 			$( this ).addClass( "pink" );
 // 		} else if ($(this).attr("data-left-id") % 3 == 0 || $(this).attr("data-right-id") % 3 == 0 || $(this).attr("data-time-id") % 3 == 0) {
 // 			$( this ).addClass( "blue" );
 // 		}
 // 	});

	choose();
	hoverOut();
	left();
	right();
})

$("div.left").hover(hoverIn, hoverOut);

activePos();