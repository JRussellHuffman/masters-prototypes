//plant
function plantOn (){
	$(this).html("Add Plant");
	$(this).css("width", "100px");
};

function plantOff (){
	$(this).html("P");
	$(this).css("width", "30px");
};

//camera
function locationOn (){
	$(this).html("Add Location");
	$(this).css("width", "120px");
};

function locationOff (){
	$(this).html("L");
	$(this).css("width", "30px");
};

//guides
function guideOn (){
	$(this).html("Read Guidelines");
	$(this).css("width", "130px");
};

function guideOff (){
	$(this).html("G");
	$(this).css("width", "30px");
};

//resources
function resourcesOn (){
	$(this).html("View Resources");
	$(this).css("width", "130px");
};

function resourcesOff (){
	$(this).html("R");
	$(this).css("width", "30px");
};

$(document).ready(function() {
	//hover over a button
	$("#plant").hover(plantOn, plantOff);
	$("#location").hover(locationOn, locationOff);
	$("#guide").hover(guideOn, guideOff);
	$("#resources").hover(resourcesOn, resourcesOff);

	//click a button
	$("#location").click(function(){
		$(".rightContent").load("ajax/location.html");
	});
	$("#guide").click(function(){
		$(".rightContent").load("ajax/guidelines.html");
	});
	$("#resources").click(function(){
		$(".rightContent").load("ajax/resources.html");
	});
	$("#plant").click(function(){
		$(".rightContent").load("ajax/plant.html");
	});
	$("div.button").click(function(){
		$(".rightContent").html("content loading... but really, if you are reading this, something went wrong. reload the page.");
	});
	//close popup
	$("div.close, div.bg").click(function(){
		$(".popContainer").fadeOut();
	});
});






