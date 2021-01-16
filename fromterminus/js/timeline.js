$(function(){
$("#testTimeline").timeline({
data:   [
//note that the month start at 0, so 7 == August
{date: new Date(1864,6,19), type: "someType", title: "Ch 1", description: "<p>Fighting is about to start. What should you do?</p>"},
{date: new Date(1864,6,20), type: "someType", title: "Ch 2", description: "<p>Battle of Peachtree Creek. Father O'Reilly helps by converting his church into a temporary hospital</p><br><button id='ch2'> start chapter 2 </button>"},
{date: new Date(1864,7,3), type: "someType", title: "Ch 3", description: "<p>Battle of Atlanta. Father O'Reilly approaches Sherman...</p><br><button id='ch3'> start chapter 3 </button>"},
{date: new Date(1864,7,9), type: "someType", title: "Ch 4", description: "<p>Meeting with Slocum. Father O'Reilly will try and reason with his friend.</p><br><button id='ch4'> start chapter 4 </button>"},
{date: new Date(1864,8,2), type: "someType", title: "Ch 5", description: "<p>Burning of Atlanta. Will the churches be spared?</p><br><button id='ch5'> view ending </button>"}
],
height: 600
});
});

$.widget('pi.timeline', {
	options: {
		data:   [
		{date: new Date(), type:"Type1", title:"Title1", description:"Description1"},
		{date: new Date(), type:"Type2", title:"Title2", description:"Description2"}
		],
		types:  [
		{name:"Type1", color:"#00ff00"},
		{name:"Type2", color:"#0000ff"}
		],
		display: "auto",
		height: 600
	},
	_create: function(){
		this._refresh();
	},
	_refresh: function(){
		var miliConstant = 86400000
		var firstDate = this.options.data[0].date;
		var lastDate = this.options.data[0].date;
		for (i=0;i<this.options.data.length;i++) {
			if (this.options.data[i].date > lastDate) { lastDate = this.options.data[i].date; }
			else if (this.options.data[i].date < firstDate) { firstDate = this.options.data[i].date; }
		}
		var dayRange = (lastDate - firstDate) / miliConstant;
		var segSpace = Math.floor(this.options.height / (dayRange / 7));
		var segLength = 7;
		if (segSpace < 80) {
			var segSpace = Math.floor(this.options.height / (dayRange / 14));
			segLength = 14;
		}
		if (segSpace < 80) {
			var segSpace = Math.floor(this.options.height / (dayRange / 28));
			segLength = 28;
		}
		if (segSpace < 80) {
			var segSpace = Math.floor(this.options.height / (dayRange / 56));
			segLength = 56;
		}
		if (segSpace < 80) {
			var segSpace = Math.floor(this.options.height / (dayRange / 112));
			segLength = 112;
		}

		var majorCount = Math.floor(this.options.height / segSpace) + 1;

		//Empty Current Element
		this.element.empty();

		//Draw TimeLine
		this.element.append("<div class='tlLine' style='height: " + this.options.height + "px;'></div>")

		//Draw Major Markers
		var tempDate = new Date(firstDate.getTime());
		for (i=0;i<majorCount;i++) {
			this.element.append("<div class='tlMajor' style='top: " + ((segSpace * i) - 7) + "px;'></div>");
			this.element.append("<span class='tlDateLabel' style='top: " + ((segSpace * i) - 7) + "px;'>" +  $.datepicker.formatDate( "d M y", tempDate) + "</span>");
			tempDate.setDate(tempDate.getDate() + segLength);
		}

		//draw event markers
		for (i=0;i<this.options.data.length;i++) {
			var dayPixels = ((this.options.data[i].date - firstDate) / (lastDate - firstDate)) * this.options.height;
			//alert((this.options.data[i].date - firstDate) + ", " + (lastDate - firstDate) + ", " +dayPixels);
			this.element.append("<div class='tlDateDot' style='top: " + (dayPixels - 11) + "px;'></div>");
			this.element.append("<div class='tlEventFlag' style='top: " + (dayPixels - 11) + "px;'>" + this.options.data[i].title + "</div>");
			this.element.append("<div class='tlEventExpand' style='top: " + (dayPixels - 11) + "px;'><p><b>" + this.options.data[i].date + "</b></p><p>" + this.options.data[i].description +  "<p></div>");
		}

		$(".tlEventExpand").hide();

		//$(".tlEventExpand").hide();
		$(".tlEventFlag").click(function(){
		var tempThis = $(this);
		$(".tlEventExpand").hide();
		$(".tlEventFlag").animate({width:'50px'}, 200);
		if (tempThis.hasClass('active')) {
			tempThis.removeClass('active');
		} else {
			$(".tlEventFlag").removeClass('active');
			tempThis.addClass('active');
			tempThis.animate({width:'70px'}, 200, function(){
				tempThis.next('div').show();
			});
		}
		});
	},
	_destroy: function() {},
	_setOptions: function() {}
});