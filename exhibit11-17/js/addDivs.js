//how many divs are on screen
var numNarratives = 4;
//var numStories = stories0.length;
var numStories = 30; //this needs to be fixed per narrative, not like this
var spacerWidth;
var eachLength = [stories0.length, stories1.length, stories2.length, stories3.length]

console.log(eachLength[1]);

//create narratives
function addNarrative (e, f) {
	spacerWidth = $(document).width()/2;
	var content = '<div class="narrative" id="nar' + e + '"><div class="active" id="active' + e + '"></div><div class="storyContainer" id="container' + e + '"></div></div>';
	$("div.content").append(content)
	$("div#container" + e).width(f * 340); //400 is the individual stories width
}


function screenDivs (e, f) {
	var content = '<div class="story" id="screen'+ e + f +'">' + e + f + '</div>';
	$("div#container" + f).append(content)
}

function mobile () {
	var content = '<div class="mobileContainer"></div>';
	$("div.mobileContent").append(content)
	$("div.mobileContainer").width(numStories * 800); //400 is the individual stories width
}

function mobileDivs (e) {
	var content = '<div class="mobileStory" id="mobile'+ e +'">' + e + '</div>';
	$("div.mobileContainer").append(content)
}

$(document).ready(function(){
	//make narrative rows
	for (var i = 0; i < numNarratives; i++) {
		addNarrative(i, eachLength[i]);
		//addNarrative(i, eachLength[1]);

		// for (var j = 0; j < numStories; j++) {
		// 		screenDivs(i, j);
		// 		mobileDivs(i,j);
		// };
	};
	mobile();
	//add story divs

	for (var j = 0; j < numNarratives; j++) {
		for (var i = 0; i < eachLength[j]; i++) {
			screenDivs(i,j);
			mobileDivs(i);
		};
	};

	spacerWidth = $(document).width()/2;

	//populate divs
	var story0 = [];
	for (var i = 0; i < stories0.length; i++) {
		story0[i] = new populate(stories0[i].itemName, stories0[i].itemSubhead, stories0[i].itemDescription, stories0[i].itemMedia, stories0[i].itemThumb, stories0[i].mediaType,  i+1, 0);
		story0[i].popScreen();
		story0[i].popMobile();
		//story[i].popTime();

	}

	var story1 = [];
	for (var i = 0; i < stories1.length; i++) {
		story1[i] = new populate(stories1[i].itemName, stories1[i].itemSubhead, stories1[i].itemDescription, stories1[i].itemMedia, stories1[i].itemThumb, stories1[i].mediaType,  i+1, 1);
		story1[i].popScreen();
		story1[i].popMobile();
	}

	var story2 = [];
	for (var i = 0; i < stories2.length; i++) {
		story2[i] = new populate(stories2[i].itemName, stories2[i].itemSubhead, stories2[i].itemDescription, stories2[i].itemMedia, stories2[i].itemThumb, stories2[i].mediaType,  i+1, 2);
		story2[i].popScreen();
		story2[i].popMobile();
	}

	var story3 = [];
	for (var i = 0; i < stories3.length; i++) {
		story2[i] = new populate(stories3[i].itemName, stories3[i].itemSubhead, stories3[i].itemDescription, stories3[i].itemMedia, stories3[i].itemThumb, stories3[i].mediaType,  i+1, 3);
		story2[i].popScreen();
		story2[i].popMobile();
	}

});