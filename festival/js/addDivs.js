//how many divs are on screen
var numDivs = stories.length;
var timeline = 100/numDivs;

//create more divs
function smallDivs (e) {
	$("div.leftContent").append('<div data-left-id='+ e + ' class="small" id="left'+ e +'">' + e + '</div>')
}

function largeDivs (e) {
	$("div.rightContent").append('<div data-right-id='+ e + ' class="large" id="right'+ e +'">' + e + '</div>')
}

function timelineDivs (e) {
	$("div.timeContent").append('<div data-time-id='+ e + ' class="time" id="time'+ e +'">' + e + '</div>')
}

function timelineHeight () {
	$("div.time").height((timeline-1) + "%")
}

$(document).ready(function(){
	//create divs on screen
	for (var i = 0; i < numDivs; i++) {
		smallDivs(i+1);
		largeDivs(i+1);
		timelineDivs(i+1);
	};
	//timeline should always be 100% height of the screen
	timelineHeight();

	//populate divs
	var story = [];
	for (var i = 0; i < stories.length; i++) {
		story[i] = new populate(stories[i].itemName, stories[i].itemSubhead, stories[i].itemDescription, stories[i].itemMedia, i+1);
		story[i].popLeft();
		story[i].popRight();
		story[i].popTime();
	}

})