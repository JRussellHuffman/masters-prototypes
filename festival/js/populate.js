function populate (n, s, d, m, num) {
	this.itemName = n;
	this.itemDescription = d;
	this.itemNumber = num;
	this.itemSubhead = s;
	this.itemMedia = m;

	//small left div
	this.popLeft = function popLeft() {
		$("div#left" + this.itemNumber).html(
			"<h2>" + this.itemName + "</h2>"
		);
	}

	//large right div
	this.popRight = function popRight() {
		$("div#right" + this.itemNumber).html(
			'<div class="text"><h1 class="content">' + this.itemName + "</h1> <span>" + this.itemSubhead + "</span><p>" + this.itemDescription + "</p></div>"
		).append(
			this.itemMedia
		);
	}

	//timeline div
	this.popTime = function popTime() {
		$("div#time" + this.itemNumber).html(
			'<span class="timeline">' + this.itemName + "</span>"
		)
	}
}