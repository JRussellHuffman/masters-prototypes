function populate (n, s, d, m, t, type, num, nar) {
	this.itemName = n;
	this.itemSubhead = s;
	this.itemDescription = d;
	this.itemMedia = m;
	this.itemThumb = t;
	this.mediaType = type;
	this.itemNumber = num;
	this.narrativeNumber = nar;


	//for videos
	var videoWidth = "90%";
	var videoHeight = 500;

	//small screen div
	this.popScreen = function popScreen() {
		$("div#screen" + this.itemNumber + this.narrativeNumber).html(
			'<h2 class="name">' + this.itemName + '</h2>'
		);
		$("div#screen" + this.itemNumber + this.narrativeNumber).append(this.itemThumb)
	}

	//large mobile div
	this.popMobile = function popMobile() {
		$("div#mobile" + this.itemNumber).html(
			'<div class="text"><h1 class="content">' + this.itemName + "</h1> <span>" + this.itemSubhead + "</span><p>" + this.itemDescription + "</p></div>"
		);
		if (this.mediaType == "video") {
			$("div#mobile" + this.itemNumber).append(
				'<iframe src="' + this.itemMedia + '" width="' + videoWidth + '" height="' + videoHeight + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen id="video' + this.itemNumber + '"></iframe>'
			);
		} else {
			$("div#mobile" + this.itemNumber).append(this.itemMedia);
		}
	}

	//timeline div
	this.popTime = function popTime() {
		$("div#time" + this.itemNumber).html(
			'<span class="timeline">' + this.itemName + "</span>"
		)
	}

	//populate fotorama
	this.popFotorama = function popFotorama() {

		var item = '<div class="text"><h1 class="content">' + this.itemName + "</h1> <h2>" + this.itemSubhead + "</h2><p>" + this.itemDescription + "</p></div>"
		if (this.mediaType == "video") {
			item += '<iframe src="' + this.itemMedia + '" width="' + videoWidth + '" height="' + videoHeight + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen id="video' + this.itemNumber + '"></iframe>'
		} else {
			item += this.itemMedia
		}
		return item;
	}

}