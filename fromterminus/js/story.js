$(document).ready(function() {

//show developer options
var devMode = false;

//story variables based on if a dialogue has happened yet. starts false
var church = false;
var southHelped = 0;
var northHelped = 0;
var peachtreeCreek = false;
//meet slocum
var slocum = false;
//befriend slocum
var friends = false;

//argument with sherman variables. have these options been said?
var affront = false;
var excom = false;
var mutiny = false;

//argument with Sherman
var angry = false;

//final letter dialogue
var results;


//mapbox setup 
L.mapbox.accessToken = 'pk.eyJ1IjoianJ1c3NlbGxodWZmbWFuIiwiYSI6Iks3dlBmdTQifQ.zUvtgRAtyQlMEaMpTaVVIQ';
// Replace 'examples.map-i87786ca' with your map id.
var mapboxTiles = L.tileLayer('https://{s}.tiles.mapbox.com/v4/jrussellhuffman.l2c2ncdb/{z}/{x}/{y}.png?access_token=' + L.mapbox.accessToken, {
    attribution: 'Designed by <a href="http://jrussellhuffman.com" target="_blank">J. Russell Huffman</a>'
});

//load the map, set the start point
var map = L.map('map')
    .addLayer(mapboxTiles)
    .setView([33.751184, -84.389587], 20);

var liveIcon = L.icon({
    iconUrl: 'img/marker-iconRed.png',
    iconSize: [25,41],
    iconAnchor:   [13, 40],
    popupAnchor:  [0, -33],
    className: 'redAlive'
});

var redDead = L.icon({
    iconUrl: 'img/marker-iconRedSoft.png',
    iconSize: [25,41],
    iconAnchor:   [13, 40],
    popupAnchor:  [0, -33]
});

var staticIcon = L.icon({
    iconUrl: 'img/marker-icon.png',
    iconSize: [25,41],
    iconAnchor:   [13, 40],
    popupAnchor:  [0, -33],
    className: 'blueAlive'
});

var blueDead = L.icon({
    iconUrl: 'img/marker-iconBlueSoft.png',
    iconSize: [25,41],
    iconAnchor:   [13, 40],
    popupAnchor:  [0, -33]
});

var noIcon = L.icon({
    iconUrl: 'img/marker-none.png',
    iconSize: [0,0],
    iconAnchor:   [13, 40],
    popupAnchor:  [0, -33],
    className: 'redAlive'
});

var noIconBlue = L.icon({
    iconUrl: 'img/marker-none.png',
    iconSize: [0,0],
    iconAnchor:   [13, 40],
    popupAnchor:  [0, -33],
    className: 'blueAlive'
});

//other markers these are essentially static
var other0 = L.marker([33.840280, -84.379133], {icon: staticIcon});
    other0.addTo(map);
    other0.bindPopup('<div class="dContainer"><div class="header"><h2 class="dTitle">Henry Irby\'s General Story in Buckhead</h2><span class="time">1864</span></div><div class="dContent" id="content3-2"><img class="content" src="other/buckhead1850s.jpg"><p class="setup"> This is the future site of Buckhead. Currently there is only a general story at a fork in the road.</p></div></div>');

var other1 = L.marker([33.756824, -84.392413], {icon: staticIcon});
    other1.addTo(map);
    other1.bindPopup('<div class="dContainer"><div class="header"><h2 class="dTitle">Marietta Street</h2><span class="time">1864</span></div><div class="dContent" id="content3-2"><img class="content" src="other/marietta1864.jpg"><p class="setup"> Marietta Street is bustling with people.</p></div></div>');

var other2 = L.marker([33.751650, -84.397605], {icon: staticIcon});
    other2.addTo(map);
    other2.bindPopup('<div class="dContainer"><div class="header"><h2 class="dTitle">The Roundhouse</h2><span class="time">1864</span></div><div class="dContent" id="content3-2"><img class="content" src="other/roundhouse1864.jpg"><p class="setup"> Near the Atlanta Railroad depot is the Roundhouse.</p></div></div>');

var other3 = L.marker([33.751570, -84.387939], {icon: staticIcon});
    other3.addTo(map);
    other3.bindPopup('<div class="dContainer"><div class="header"><h2 class="dTitle">The Atlanta Railroad Depot</h2><span class="time">1864</span></div><div class="dContent" id="content3-2"><img class="content" src="other/depot1864.jpg"><p class="setup"> The Atlanta Railroad depot is a primary supply line for Confederate Troops, and therefore a large target for the Union Army</p></div></div>');

var other4 = L.marker([33.752854, -84.390031], {icon: staticIcon});
    other4.addTo(map);
    other4.bindPopup('<div class="dContainer"><div class="header"><h2 class="dTitle">The Intelligencer</h2><span class="time">1864</span></div><div class="dContent" id="content3-2"><img class="content" src="other/downtown1864.jpg"><p class="setup"> Atlanta Intelligencer newspaper office by the railroad depot. People of Atlanta are informed about battles from the Intelligencer</p></div></div>');

//start story here:
var marker8 = L.marker([33.749016, -84.388214], {icon: noIcon});
    marker8.addTo(map);

var marker0 = L.marker([33.750441, -84.389593], {icon: liveIcon}).addTo(map);
	marker0.bindPopup('<div class="dContainer"><div class="header"><h2 class="dTitle">Immaculate Conception Church</h2><span class="time"> 7-19-1864</span></div><div class="dContent" id="content01"><img class="content" src="content/church01.jpg"><p class="setup"> you enter your church when Brother Chris approaches you with a solemn concerned expression</p><p class="talking"><span class="name"> Br. Chris: </span>Word has it that fighting is schedule to start tomorrow up at Peachtree Creek.</p><span class="response" id="action1-1">God have mercy on us in these hard times</span><br><span class="response" id="action1-2">Hard times are ahead for Atlanta</span></div></div>');

    var action1Dialogue = '<p class="setup">Brother Chris gives you a look of agreement</p><p class="talking"><span class="name"> Br. Chris: </span> I will begin setting up the church to receive the wounded. Should we harbor both the Confederate soldiers as well as Union soldiers?</p><span class="response" id="action1-1-1">We have brothers on both sides</span><br><span class="response" id="action1-1-2">My alliance is to Atlanta and to those who are fighting for it.</span>';

	$('.leaflet-popup-pane').on("click", "#action1-1", function() {
        $("#action1-2").fadeOut(0);
        $("#action1-1").fadeOut(0);
        $('#content01').append('<p class="talking"><span class="name"> Fa. O\'Reilly: </span> God have mercy on us in these hard times</p>');
		$('#content01').append(action1Dialogue);
        $("#content01").animate({ scrollTop: $(document).height() }, "slow");
    });
    $('.leaflet-popup-pane').on("click", "#action1-2", function() {
        $("#action1-1").fadeOut(0);
        $("#action1-2").fadeOut(0);
        $('#content01').append('<p class="talking"><span class="name"> Fa. O\'Reilly: </span> Hard times are ahead for Atlanta</p>');
        $('#content01').append(action1Dialogue);
        $("#content01").animate({ scrollTop: $(document).height() }, "slow");
    });

    //next response
    $('.leaflet-popup-pane').on("click", "#action1-1-1", function() {
        $("#action1-1-2").fadeOut(0);
        $("#action1-1-1").fadeOut(0);
        $('#content01').append('<p class="talking"><span class="name"> Fa. O\'Reilly: </span> We have brothers on both sides</p>');
        $('#content01').append('<p class="setup">Brother Chris gives an approving nod</p><p class="talking"><span class="name"> Br. Chris: </span> It is the right thing to do.</p><span class="response" id="action1-1-1-1">Thank you brother. I am headed up to the battlefield to help there.</span>');
        church = true;
        $("#content01").animate({ scrollTop: $(document).height() }, "slow");
    });
    $('.leaflet-popup-pane').on("click", "#action1-1-2", function() {
        $("#action1-1-1").fadeOut(0);
        $("#action1-1-2").fadeOut(0);
        $('#content01').append('<p class="talking"><span class="name"> Fa. O\'Reilly: </span> my alliance is to Atlanta and to those who are fighting for it.</p>');
        $('#content01').append('<p class="setup">Brother Chris looks surprised</p><p class="talking"><span class="name"> Br. Chris: </span> Sir, I strongly believe that God would want us to tend to all the wounded and dying.</p><span class="response" id="action1-1-2-1">You are right, we will accept all wounded the same.</span><br><span class="response" id="action1-1-2-2">The north will have their own medics, we need to care for our own.</span>');
        $("#content01").animate({ scrollTop: $(document).height() }, "slow");
    });
    //response
    $('.leaflet-popup-pane').on("click", "#action1-1-2-1", function() {
        $("#action1-1-2-1").fadeOut(0);
        $("#action1-1-2-2").fadeOut(0);
        $('#content01').append('<p class="talking"><span class="name"> Fa. O\'Reilly: </span> You are right, we will accept all wounded the same.</p>');
        $('#content01').append('<p class="setup">Brother Chris looks relieved</p><p class="talking"><span class="name"> Br. Chris: </span> Thank you, it is the right thing to do.</p><span class="response" id="action1-1-1-1">Thank you brother. I am headed up to the battlefield to help there.</span>');
        $("#content01").animate({ scrollTop: $(document).height() }, "slow");
    });
    $('.leaflet-popup-pane').on("click", "#action1-1-2-2", function() {
        $("#action1-1-2-1").fadeOut(0);
        $("#action1-1-2-2").fadeOut(0);
        church = false;
        $('#content01').append('<p class="talking"><span class="name"> Fa. O\'Reilly: </span> The north will have their own medics, we need to care for our own.</p>');
        $('#content01').append('<p class="setup">Brother Chris is about to say something but decides against it.</p><p class="talking"><span class="name"> Br. Chris: </span> I understand. I will make preperations accordingly.</p><span class="response" id="action1-1-1-1">Thank you brother. I am headed up to the battlefield to help there.</span>');
        $("#content01").animate({ scrollTop: $(document).height() }, "slow");
    });

function startCh2 () {
        //marker0.togglePopup();
        marker1.bindPopup('<div class="dContainer"><div class="header"><h2 class="dTitle">Lt. Hardee\'s Confederate front line</h2><span class="time">7-20-1864</span></div><div class="dContent" id="content2-1"><img class="content" src="content/hardee.jpg"><p class="setup"> You arrive at the camp and are directed to Lieutenant Hardee to speak with him</p><p class="talking"><span class="name"> Lt. Hardee: </span>What bring you to such a wretched place, Father?</p><span class="response" id="action2-1">I am here to minister to the wonded and perform last rites. May I approach your medical tent?</span></div></div>');
        marker2.bindPopup('<div class="dContainer"><div class="header"><h2 class="dTitle">Gen. Stewart\'s Confederate front line</h2><span class="time">7-20-1864</span></div><div class="dContent" id="content2-2"><img class="content" src="content/stewart.jpg"><p class="setup"> You arrive at the camp and are directed to General Stewart to speak with him</p><p class="talking"><span class="name"> Gen. Stewart: </span>This is no place for a holy man.</p><span class="response" id="action2-2">I am here to minister to the wonded and perform last rites. May I approach your medical tent?</span></div></div>');
        marker3.bindPopup('<div class="dContainer"><div class="header"><h2 class="dTitle">General Sherman\'s Union front line</h2><span class="time">7-20-1864</span></div><div class="dContent" id="content2-3"><img class="content" src="content/sherman.jpg"><p class="setup"> You arrive at the camp and are directed to General Sherman to speak with him</p><p class="talking"><span class="name"> Gen. Sherman: </span>What is a Southern Catholic Priest doing here?</p><span class="response" id="action2-3">I would to perform last rites to your dying. May I approach your medical tent?</span></div></div>');
        marker4.bindPopup('<div class="dContainer"><div class="header"><h2 class="dTitle">Major Slocum\'s Union front line</h2><span class="time">7-20-1864</span></div><div class="dContent" id="content2-4"><img class="content" src="content/slocum.jpg"><p class="setup"> You arrive at the camp and are directed to Major Slocum to speak with him</p><p class="talking"><span class="name"> Maj. Slocum: </span>It takes a brave man to enter into the enemies camp. What brings you here, father?</p><span class="response" id="action2-4">I would to perform last rites to your dying. May I approach your medical tent?</span></div></div>');
        $("#action1-1-1-1").fadeOut(0);
        $('#content01').append('<p class="talking"><span class="name"> Fa. O\'Reilly: </span> Thank you brother. I am headed up to the battlefield to help there.</p>');
        $("#nowContainer").animate({top:"82px"},1500);
        map.setView([33.781531, -84.390944],13);
        marker0.bindPopup('<div class="dContainer"><div class="header"><h2 class="dTitle">Immaculate Conception Church</h2><span class="time"> 7-19-1864</span></div><div class="dContent" id="content01"><img class="content" src="content/churchOutside.jpg"><p class="setup"> This is the church where you are father. Everyone is busy getting ready for the battle. You should go check on the soldiers at the front lines.</p></div></div>');
        marker0.setIcon(liveIcon);
        marker1.setIcon(liveIcon);
        marker2.setIcon(liveIcon);
        marker3.setIcon(liveIcon);
        marker4.setIcon(liveIcon);
    }

$('.leaflet-popup-pane').on("click", "#action1-1-1-1", startCh2);

$("#ch1").click(startCh2);
// ----- END SCENE 1 ----- //
//scene 2 is up at the front lines

var healing = '<p class="talking"><span class="name"> Fa. O\'Reilly: </span> I am here to minister to the wonded and perform last rites. May I approach your medical tent?</p>';

//hardee's fronline
var marker1 = new L.marker([33.819845, -84.405337], {icon: noIcon});
    marker1.addTo(map);

    $('.leaflet-popup-pane').on("click", "#action2-1", function() {
        peachtreeCreek = true;
        if (slocum){
            marker0.bindPopup(churchFull);
            marker0.setIcon(liveIcon);
        } else {
            marker0.bindPopup(churchBusy);
            marker0.setIcon(liveIcon);
        }
        $('#action2-1').remove();
        $('#content2-1').append(healing);
        $('#content2-1').append('<p class="setup">The Lieutenant is glad you are here.</p><p class="talking"><span class="name"> Lt. Hardee: </span>Thank you father. This battle is not going well and we need someone like you. One of my men will show you the way.</p><p class="setup">You are escorted to the medical tent where several men are being tended to. Many are badly wounded and dying.</p><span class="response" id="action2-1-1">Approach a wounded soldier</span><br><span class="response" id="action2-1-2">Turn around and leave</span><br>');
        $("#content2-1").animate({ scrollTop: $(document).height() }, "slow");
    });

    function helpSouthHardee () {
        southHelped ++;
        $('#action2-1-1').remove();
        $('#action2-1-2').remove();
        $('#content2-1').append('<p class="setup">You approach a man who is dying. You lean over his cot and perform a last rites prayer.</p><span class="response" id="action2-1-1">Approach a wounded soldier</span><br><span class="response" id="action2-1-2">Turn around and leave</span><br>');
        $("#content2-1").animate({ scrollTop: $(document).height() }, "slow");
    }

    function leaveHardee () {
        marker1.togglePopup();
        marker1.bindPopup('<div class="dContainer"><div class="header"><h2 class="dTitle">Lieutenant Hardee\'s front line</h2><span class="time">7-20-1864</span></div><div class="dContent" id="content2-1"><p class="setup"> You approach the medical tent again</p><span class="response" id="action2-1-1">Approach a wounded soldier</span><br><span class="response" id="action2-1-2">Turn around and leave</span><br></div></div>');
    }

    $('.leaflet-popup-pane').on("click", "#action2-1-1", helpSouthHardee);
    $('.leaflet-popup-pane').on("click", "#action2-1-2", leaveHardee);

//stewarts frontline
var marker2 = new L.marker([33.815602, -84.398385], {icon: noIcon});
    marker2.addTo(map);
    //marker2.setIcon(liveIcon);

    $('.leaflet-popup-pane').on("click", "#action2-2", function() {
        peachtreeCreek = true;
        if (slocum){
            marker0.bindPopup(churchFull);
            marker0.setIcon(liveIcon);
        } else {
            marker0.bindPopup(churchBusy);
            marker0.setIcon(liveIcon);
        }
        $('#action2-2').remove();
        $('#content2-2').append(healing);
        $('#content2-2').append('<p class="setup">The General is surprised and relieved.</p><p class="talking"><span class="name"> Gen. Stewart: </span>Thank you father. We are losing this battle and we are losing men too. One of my men will show you the way to the medical tent.</p><p class="setup">You are escorted to the medical tent where several men are being tended to. Many are badly wounded and dying.</p><span class="response" id="action2-2-1">Approach a wounded soldier</span><br><span class="response" id="action2-2-2">Turn around and leave</span><br>');
        $("#content2-2").animate({ scrollTop: $(document).height() }, "slow");
    });

    function helpSouthStewart () {
        southHelped ++;
        $('#action2-2-2').remove();
        $('#action2-2-1').remove();
        $('#content2-2').append('<p class="setup">You approach a man who is dying. You lean over his cot and perform a last rites prayer.</p><span class="response" id="action2-2-1">Approach a wounded soldier</span><br><span class="response" id="action2-2-2">Turn around and leave</span><br>');
        $("#content2-2").animate({ scrollTop: $(document).height() }, "slow");
    }

    function leaveStewart () {
        marker2.togglePopup();
        marker2.bindPopup('<div class="dContainer"><div class="header"><h2 class="dTitle">General Stewart\'s front line</h2><span class="time">7-20-1864</span></div><div class="dContent" id="content2-2"><p class="setup"> You approach the medical tent again</p><span class="response" id="action2-2-1">Approach a wounded soldier</span><br><span class="response" id="action2-2-2">Turn around and leave</span><br></div></div>');
        //marker2.setIcon(liveIcon);
    }

    $('.leaflet-popup-pane').on("click", "#action2-2-1", helpSouthStewart);
    $('.leaflet-popup-pane').on("click", "#action2-2-2", leaveStewart);



//shermans troops
var marker3 = new L.marker([33.816693, -84.398915], {icon: noIcon});
    marker3.addTo(map);
    //marker3.setIcon(liveIcon);

    $('.leaflet-popup-pane').on("click", "#action2-3", function() {
        peachtreeCreek = true;
        if (slocum){
            marker0.bindPopup(churchFull);
            marker0.setIcon(liveIcon);
        } else {
            marker0.bindPopup(churchBusy);
            marker0.setIcon(liveIcon);
        }
        $('#action2-3').remove();
        $('#content2-3').append(healing);
        $('#content2-3').append('<p class="setup">The General seems skeptical.</p><p class="talking"><span class="name"> Gen. Sherman: </span>I suppose that can be of no harm</p><p class="setup">You are escorted to the medical tent where several men are being tended to. Many are badly wounded and dying.</p><span class="response" id="action2-3-1">Approach a wounded soldier</span><br><span class="response" id="action2-3-2">Turn around and leave</span><br>');
        $("#content2-3").animate({ scrollTop: $(document).height() }, "slow");
    });

    function helpNorthSherman () {
        northHelped ++;
        $('#action2-3-1').remove();
        $('#action2-3-2').remove();
        $('#content2-3').append('<p class="setup">You approach a man who is dying. You lean over his cot and perform a last rites prayer.</p><span class="response" id="action2-3-1">Approach a wounded soldier</span><br><span class="response" id="action2-3-2">Turn around and leave</span><br>');
        $("#content2-3").animate({ scrollTop: $(document).height() }, "slow");
    }

    function leaveSherman () {
        marker3.togglePopup();
        marker3.bindPopup('<div class="dContainer"><div class="header"><h2 class="dTitle">General Sherman\'s front line</h2><span class="time">7-20-1864</span></div><div class="dContent" id="content2-3"><p class="setup"> You approach the medical tent again</p><span class="response" id="action2-3-1">Approach a wounded soldier</span><br><span class="response" id="action2-3-2">Turn around and leave</span><br></div></div>');
        //marker3.setIcon(liveIcon);
    }

    $('.leaflet-popup-pane').on("click", "#action2-3-1", helpNorthSherman);
    $('.leaflet-popup-pane').on("click", "#action2-3-2", leaveSherman);

// Major Slocum
var marker4 = new L.marker([33.820633, -84.404258], {icon: noIcon});
    marker4.addTo(map);

    $('.leaflet-popup-pane').on("click", "#action2-4", function() {
        peachtreeCreek = true;
        slocum = true;
            marker0.bindPopup(churchFull);
            marker0.setIcon(liveIcon);
        $('#action2-4').remove();
        $('#content2-4').append(healing);
        $('#content2-4').append('<p class="setup">The Major seems confused at first but then is pleasantly surprised</p><p class="talking"><span class="name"> Maj. Slocum: </span>It takes a brave man to enter an enemies camp, but it takes an even braver man to not see enemies.</p><span class="response" id="action2-4-1">There are no enemies in God\'s eyes.</span><br><span class="response" id="action2-4-2">We are only enemies by circumstance.</span><br>');
        $("#content2-4").animate({ scrollTop: $(document).height() }, "slow");
    });

    $('.leaflet-popup-pane').on("click", "#action2-4-1", function() {
        slocum = true;
            marker0.bindPopup(churchFull);
            marker0.setIcon(liveIcon);
        $('#action2-4-1').remove();
        $('#action2-4-2').remove();
        $('#content2-4').append('<p class="talking"><span class="name"> Fa. O\'Reilly: </span>There are no enemies in God\'s eyes.</p>');
        $('#content2-4').append('<p class="setup">The Major gives you a look showing that what you are saying resonates with his beliefs as well.</p><p class="talking"><span class="name"> Maj. Slocum: </span>If we are not enemies, then we must be allies. Call on me if you need anything, Father.</p><p class="setup">You are escorted to the medical tent where several men are being tended to. Many are badly wounded and dying.</p><span class="response" id="action2-4-1-1">Approach a wounded soldier</span><br><span class="response" id="action2-4-1-2">Turn around and leave</span><br>');
        $("#content2-4").animate({ scrollTop: $(document).height() }, "slow");
        friends = true;
    });

    $('.leaflet-popup-pane').on("click", "#action2-4-2", function() {
        slocum = true;
            marker0.bindPopup(churchFull);
            marker0.setIcon(liveIcon);
        $('#action2-4-1').remove();
        $('#action2-4-2').remove();
        $('#content2-4').append('<p class="talking"><span class="name"> Fa. O\'Reilly: </span>We are only enemies by circumstance.</p>');
        $('#content2-4').append('<p class="setup">The Major gives you a nod.</p><p class="talking"><span class="name"> Maj. Slocum: </span>Circumstances are cruel. Do what God has sent you to do, Father.</p><p class="setup">You are escorted to the medical tent where several men are being tended to. Many are badly wounded and dying.</p><span class="response" id="action2-4-1-1">Approach a wounded soldier</span><br><span class="response" id="action2-4-1-2">Turn around and leave</span><br>');
        $("#content2-4").animate({ scrollTop: $(document).height() }, "slow");
    });

    $('.leaflet-popup-pane').on("click", "#action2-10", function() {
        slocum = true;
            marker0.bindPopup(churchFull);
            marker0.setIcon(liveIcon);
        $('#action2-4').remove();
        $('#content2-4').append(healing);
        $('#content2-4').append('<p class="setup">The Major seems confused at first but then is pleasantly surprised</p><p class="talking"><span class="name"> Maj. Slocum: </span>It takes a brave man to enter an enemies camp, but it takes an even braver man to not see enemies. Do what God has sent you to do, Father.</p><p class="setup">You are escorted to the medical tent where several men are being tended to. Many are badly wounded and dying.</p><span class="response" id="action2-4-1">Approach a wounded soldier</span><br><span class="response" id="action2-4-2">Turn around and leave</span><br>');
        $("#content2-4").animate({ scrollTop: $(document).height() }, "slow");
    });

    function helpNorthSlocum () {
        northHelped ++;
        $('#action2-4-1-1').remove();
        $('#action2-4-1-2').remove();
        $('#content2-4').append('<p class="setup">You approach a man who is dying. You lean over his cot and perform a last rites prayer.</p><span class="response" id="action2-4-1-1">Approach a wounded soldier</span><br><span class="response" id="action2-4-1-2">Turn around and leave</span><br>');
        $("#content2-4").animate({ scrollTop: $(document).height() }, "slow");
    }

    function leaveSlocum () {
        marker4.togglePopup();
        marker4.bindPopup('<div class="dContainer"><div class="header"><h2 class="dTitle">General Slocum\'s front line</h2><span class="time">7-20-1864</span></div><div class="dContent" id="content2-4"><p class="setup"> You approach the medical tent again</p><span class="response" id="action2-4-1-1">Approach a wounded soldier</span><br><span class="response" id="action2-4-1-2">Turn around and leave</span><br></div></div>');
    }

    $('.leaflet-popup-pane').on("click", "#action2-4-1-1", helpNorthSlocum);
    $('.leaflet-popup-pane').on("click", "#action2-4-1-2", leaveSlocum);

    //text for church
var churchBusy = '<div class="dContainer"><div class="header"><h2 class="dTitle">Immaculate Conception Church</h2><span class="time"> 7-20-1864</span></div><div class="dContent" id="content01"><img class="content" src="content/church01.jpg"><p class="setup"> The church is bustling with people tending to soldiers who are arriving from the front lines at Peachtree Creek. There is still much that can be done up at the battlefield.</p><span class="response" id="action2-5-1">Return to the front lines</span><br><span class="response" id="action2-5-2">Stay at the church</span></div></div>'

var churchFull = '<div class="dContainer"><div class="header"><h2 class="dTitle">Immaculate Conception Church</h2><span class="time"> 7-20-1864</span></div><div class="dContent" id="content01"><img class="content" src="content/church01.jpg"><p class="setup"> The church is full of wounded soliders being tended to from both sides.</p><span class="response" id="action2-6-1">Stay and help</span></div></div>'

    $('.leaflet-popup-pane').on("click", "#action2-5-1", function() {
            marker0.togglePopup();
    });

    $('.leaflet-popup-pane').on("click", "#action2-5-2", startCh3);

    $('.leaflet-popup-pane').on("click", "#action2-6-1", startCh3);

//---------------------battle of atlanta, visiting Sherman

var battlefield = '<div class="dContainer"><div class="header"><h2 class="dTitle">Battle of Peachtree Creek</h2><span class="time">8-3-1864</span></div><div class="dContent" id="content3-2"><img class="content" src="content/peachtreeCreek01.jpg"><p class="setup"> This is where the Battle of Peachtree Creek took place.</p></div></div>';

function startCh3 () {
        marker0.bindPopup(preSherman);
        marker0.togglePopup();
        marker0.setIcon(liveIcon);
        marker1.addTo(map).bindPopup(battlefield);
        marker2.addTo(map).bindPopup(battlefield);
        marker3.addTo(map).bindPopup(battlefield);
        marker4.addTo(map).bindPopup(battlefield);
        marker6.setIcon(staticIcon);
        marker6.bindPopup('<div class="dContainer"><div class="header"><h2 class="dTitle">General McPherson\'s army</h2><span class="time">8-7-1864</span></div><div class="dContent" id="content3-2"><img class="content" src="content/mcpherson.jpg"><p class="setup"> his is where McPhearson\'s army is located.</p></div></div>');
        marker7.setIcon(staticIcon);
        marker7.bindPopup('<div class="dContainer"><div class="header"><h2 class="dTitle">Bridgadier General Sprague\'s army</h2><span class="time">8-7-1864</span></div><div class="dContent" id="content3-3"><img class="content" src="content/sprague.jpg"><p class="setup"> This is where Sprague\'s army is located.</div></div>');
        $("#nowContainer").animate({top:"269px"},1500);
        marker1.setIcon(liveIcon);
        marker2.setIcon(liveIcon);
        marker3.setIcon(liveIcon);
        marker4.setIcon(liveIcon);
    };

$("#ch3").click(startCh3);
//at the church

var preSherman = '<div class="dContainer"><div class="header"><h2 class="dTitle">Immaculate Conception Church</h2><span class="time"> 8-3-1864</span></div><div class="dContent" id="content01"><img class="content" src="content/church01.jpg"><p class="setup"> For the next few weeks you maintain your church as a hospital. Fighting continues to the east and it becomes clear that the confederates will lose the battle. There are rumors of abandoning Atlanta and worse yet rumors of the Union Army burning Atlanta down. </p><p class="talking"><span class="name"> Br. Chris: </span>We should consider leaving as well.</p><span class="response" id="action2-7-1">Yes, once all the wounded are gone from here, we too shall leave.</span><br><span class="response" id="action2-7-2">No, this is our home and I will fight for it.</span></div></div>'

$('.leaflet-popup-pane').on("click", "#action2-7-1", function() {
        $('#action2-7-1').remove();
        $('#action2-7-2').remove();
        $('#content01').append('<p class="talking"><span class="name"> Fa. O\'Reilly </span>Yes, once all the wounded are gone from here, we too shall leave.</p>');
        $('#content01').append('<p class="setup">You remain at the church for as long as you can. However, On September 1st General Sherman orders that all non-military personnel to leave the city. You and those congregated at the church leave Atlanta, never to return again.</p><br><span class="response" id="action5-3">Game Over</span>');
        $("#content01").animate({ scrollTop: $(document).height() }, "slow");
        startCh5();
    });

$('.leaflet-popup-pane').on("click", "#action2-7-2", function() {
    $('#action2-7-1').fadeOut(0);
    $('#action2-7-2').fadeOut(0);
    $('#content01').append('<p class="talking"><span class="name"> Fa. O\'Reilly: </span>No, this is our home and I will fight for it.</p>');
    $('#content01').append('<p class="talking"><span class="name"> Br. Chris: </span>What can we possibly do? We lose more men every day.</p><span class="response" id="action2-7-2-1">I will approach Sherman myself.</span>');
    $("#content01").animate({ scrollTop: $(document).height() }, "slow");
});

$('.leaflet-popup-pane').on("click", "#action2-7-2-1", function() {
    $('#action2-7-2-1').fadeOut(0);
    $('#content01').append('<p class="talking"><span class="name"> Fa. O\'Reilly: </span>I will approach Sherman myself.</p>');
    $('#content01').append('<p class="talking"><span class="name"> Br. Chris: </span>And what, beg him to spare the churches?</p><span class="response" id="action2-7-2-1-1">Yes, exactly.</span>');
    $("#content01").animate({ scrollTop: $(document).height() }, "slow");
});

$('.leaflet-popup-pane').on("click", "#action2-7-2-1-1", function() {
    $('#action2-7-2-1-1').fadeOut(0);
    $('#content01').append('<p class="talking"><span class="name"> Fa. O\'Reilly: </span>Yes, exactly.</p>');
    $('#content01').append('<p class="talking"><span class="name"> Br. Chris: </span>best of luck Father, and please return safely</p><p class="setup">You set up a mission to meet with General Sherman in a few days.</p>');
    $("#content01").animate({ scrollTop: $(document).height() }, "slow");
        marker5.bindPopup('<div class="dContainer"><div class="header"><h2 class="dTitle">General Sherman\'s headquarters</h2><span class="time">8-7-1864</span></div><div class="dContent" id="content3-1"><img class="content" src="content/sherman.jpg"><p class="setup"> You show up at Sherman’s headquarters ready to negotiate the saving of Atlanta. Upon arriving at his headquarters you are escorted into a tent with a table in the center.</p><p class="talking"><span class="name"> Soldier: </span>Wait here. The general will see you shortly.</p><span class="response" id="action3-1">Thank you.</span><br><span class="response" id="action3-2">Please send him quickly. I am a busy man.</span></div></div>');
        marker5.setIcon(liveIcon);
        map.setView([33.773000, -84.338476],13);
        $("#nowContainer").animate({top:"279px"},1500);
        marker0.bindPopup('<div class="dContainer"><div class="header"><h2 class="dTitle">Immaculate Conception Church</h2><span class="time"> 8-7-1864</span></div><div class="dContent" id="content01"><img class="content" src="content/church01.jpg"><p class="talking"><span class="name"> Br. Chris: </span>Did you get a chance to speak with General Sherman?</p><span class="response" id="action3-0">No, not yet. I should get going to meet with him.</span></div></div>');
        marker0.setIcon(liveIcon);
});

$('.leaflet-popup-pane').on("click", "#action3-0", function() {
    $('#action3-0').fadeOut(0);
    $('#content01').append('<p class="talking"><span class="name"> Fa. O\'Reilly: </span>No, not yet. I should get going to meet with him.</p><span class="response" id="action3-0-1">Leave</span>');
    $("#content01").animate({ scrollTop: $(document).height() }, "slow");
});

$('.leaflet-popup-pane').on("click", "#action3-0-1", function() {
    marker0.togglePopup();
});

//sherman's hq
var marker5 = new L.marker([33.765616, -84.356886], {icon: noIcon});
    marker5.addTo(map);
    //marker5.setIcon(liveIcon);

    $('.leaflet-popup-pane').on("click", "#action3-1", function() {
        $('#action3-1').fadeOut(0);
        $('#action3-2').fadeOut(0);
        $('#content3-1').append('<p class="talking"><span class="name"> Fa. O\'Reilly: </span>Thank You.');
        $('#content3-1').append('<p class="setup">The soldier hurries away. In about 5 minutes General Sherman arrives. You stand and greet him.</p><p class="talking"><span class="name"> Gen. Sherman: </span>What brings an Atlanta Catholic priest here to see me?</p><span class="response" id="action3-1-1">I want you to spare Atlanta from being burned down.</span><br><br><span class="response" id="action3-1-2">As a representative of Atlanta and a man of faith, I want you to spare the churches of Atlanta from being burned down.</span><br>');
        $("#content3-1").animate({ scrollTop: $(document).height()*3 }, "slow");
        $("#action3-2").fadeOut();
    });

    $('.leaflet-popup-pane').on("click", "#action3-2", function() {
        $('#action3-1').fadeOut(0);
        $('#action3-2').fadeOut(0);
        $('#content3-1').append('<p class="talking"><span class="name"> Fa. O\'Reilly: </span>Please send him quickly. I am a busy man.');
        $('#content3-1').append('<p class="talking"><span class="name"> Soldier: </span>A little respect will go a long way, Father</p><p class="setup">The soldier walks away. In about 10 minutes General Sherman arrives. You stand and greet him.</p><p class="talking"><span class="name"> Gen. Sherman: </span>what brings a Atlanta Catholic priest here to see me?</p><span class="response" id="action3-1-1">I want you to spare Atlanta from being burned down</span><br><br><span class="response" id="action3-1-2">As a representative of Atlanta and a man of faith, I want you to spare the churches of Atlanta from being burned down.</span><br>');
        $("#content3-1").animate({ scrollTop: $(document).height()*3 }, "slow");
        $("#action3-2").fadeOut();
    });

    $('.leaflet-popup-pane').on("click", "#action3-1-1", function() {
        $('#action3-1-1').fadeOut(0);
        $('#action3-1-2').fadeOut(0);
        $('#content3-1').append('<p class="talking"><span class="name"> Fa. O\'Reilly: </span>I want you to spare Atlanta from being burned down.');
        $('#content3-1').append('<p class="setup"> The General scoffs at the request</p><p class="talking"><span class="name"> Gen. Sherman: </span>Atlanta is a major strategic point for the Confederate Army.</p><span class="response" id="action3-1-2-1">It would be an affront to heaven to burn down the churches</span><br><br><span class="response" id="action3-1-2-2">I will excommunicate any soldiers who burn down the churches from the catholic church</span><br><br><span class="response" id="action3-1-2-3">I will use my influence to cause a mutiny with your Irish troops, which there are many</span>');
        $("#content3-1").animate({ scrollTop: $(document).height()*3 }, "slow");
        $("#action3-2").fadeOut();
    });

    $('.leaflet-popup-pane').on("click", "#action3-1-2", function() {
        $('#action3-1-1').fadeOut(0);
        $('#action3-1-2').fadeOut(0);
        $('#content3-1').append('<p class="talking"><span class="name"> Fa. O\'Reilly: </span>As a representative of Atlanta and a man of faith, I want you to spare the churches of Atlanta from being burned down.');
        $('#content3-1').append('<p class="talking"><span class="name"> Gen. Sherman: </span>Atlanta is a major strategic point for the Confederate Army. It must be burnt down.</p><span class="response" id="action3-1-2-1">It would be an affront to heaven to burn down the churches</span><br><br><span class="response" id="action3-1-2-2">I will excommunicate any soldiers who burn down the churches from the catholic church</span><br><br><span class="response" id="action3-1-2-3">I will use my influence to cause a mutiny with your Irish troops, which there are many</span>');
        $("#content3-1").animate({ scrollTop: $(document).height()*3 }, "slow");
        $("#action3-2").fadeOut();
    });

    //choices to speak
    var affrontText = '<span class="response" id="action3-1-2-1">It would be an affront to heaven to burn down the churches.</span><br><br>';
    var excomText = '<span class="response" id="action3-1-2-2">I will excommunicate any soldiers who burn down the churches from the catholic church.</span><br><br>';
    var mutinyText = '<span class="response" id="action3-1-2-3">I will use my influence to cause a mutiny with your Irish troops, which there are many.</span><br><br>';

    //choices are said
    var affrontSaid = '<p class="talking"><span class="name"> Fa. O\'Reilly: </span>It would be an affront to heaven to burn down the churches.';
    var excomSaid = '<p class="talking"><span class="name"> Fa. O\'Reilly: </span>I will excommunicate any soldiers who burn down the churches from the catholic church.';
    var mutinySaid = '<p class="talking"><span class="name"> Fa. O\'Reilly: </span>I will use my influence to cause a mutiny with your Irish troops, which there are many.';

    //dead
    var firingSquad = '<p class="talking"><span class="name"> Gen. Sherman: </span>I said not another word!</p><p class="setup"> General Sherman pulls out a pistol and shoots you on the spot.</p>'

    function shermanResponse() {
        if (affront == false) {
            $('#content3-1').append(affrontText);
            if (excom == false){
                $('#content3-1').append(excomText);
                if (mutiny == false) {
                    $('#content3-1').append(mutinyText);
                }
            } else if(mutiny == false) {
                $('#content3-1').append(mutinyText);
            }
        } else if(excom == false) {
            $('#content3-1').append(excomText);
            if (mutiny == false) {
                    $('#content3-1').append(mutinyText);
                }
        } else if(mutiny == false) {
            $('#content3-1').append(mutinyText);
        } else {
            $('#content3-1').append('<span class="response" id="action3-1-2-4">plead further</span><br>');
        };

        if (angry){
            $('#content3-1').append('<br><span class="response" id="action3-1-2-5">leave quietly</span>');
        }
    }

    $('.leaflet-popup-pane').on("click", "#action3-1-2-1", function() {
        affront = true;
        $("#action3-1-2-1").remove();
        $("#action3-1-2-2").remove();
        $("#action3-1-2-3").remove();
        $('#content3-1').append(affrontSaid);
        if (!angry) {
            $('#content3-1').append('<p class="talking"><span class="name"> Gen. Sherman: </span>Heaven is where many of our men have found themselves lately. Churches can be rebuilt.</p>');
            shermanResponse();
        } else {
            $('#content3-1').append(firingSquad);
            setTimeout(gameOver, 3000);
        }
        $("#content3-1").animate({ scrollTop: $(document).height()*3 }, "slow");
    });
    $('.leaflet-popup-pane').on("click", "#action3-1-2-2", function() {
        excom = true;
        $("#action3-1-2-1").remove();
        $("#action3-1-2-2").remove();
        $("#action3-1-2-3").remove();
        $('#content3-1').append(excomSaid);
        if (!angry) {
            $('#content3-1').append('<p class="talking"><span class="name"> Gen. Sherman: </span>You won’t have the opportunity to excommunicate my soldiers! You will be lucky to have your life by the time I am done with Atlanta!</p>');
            shermanResponse();
        } else {
            $('#content3-1').append(firingSquad);
            setTimeout(gameOver, 3000);
        } 
        $("#content3-1").animate({ scrollTop: $(document).height()*3 }, "slow");
    });
    $('.leaflet-popup-pane').on("click", "#action3-1-2-3", function() {
        mutiny = true;
        $("#action3-1-2-1").remove();
        $("#action3-1-2-2").remove();
        $("#action3-1-2-3").remove();
        $('#content3-1').append(mutinySaid);
        $('#content3-1').append('<p class="talking"><span class="name"> Gen. Sherman: </span> Are you threatening to cause a mutiny? We put men in front of a firing squad who talk like that. Holy man or not, you are still a man and if I hear another word from you, then I will put you in front of a firing squad!</p>');
        angry = true;
        shermanResponse();
        $("#content3-1").animate({ scrollTop: $(document).height()*3}, "slow");
    });

var ch3StartText = '<div class="dContainer"><div class="header"><h2 class="dTitle">Immaculate Conception Church</h2><span class="time"> 8-9-1864</span></div><div class="dContent" id="content1"><img class="content" src="content/church01.jpg"><p class="setup"> You arrive back in your church in a fit of quiet rage after the meeting with General Sherman. Brother Chris attempts to console you.</p><p class="talking"><span class="name"> Br. Chris: </span>there must still be something we can do</p><span class="response" id="action4-1">Hope is lost. We need to leave the city while we still can.</span><br><span class="response" id="action4-2">If I could just reason with someone.</span></div></div>';

    $('.leaflet-popup-pane').on("click", "#action3-1-2-4", function() {
        $("#action3-1-2-4").remove();
        $("#action3-1-2-5").remove();
        $('#content3-1').append(firingSquad);
        $("#content3-1").animate({ scrollTop: $(document).height()*2}, "slow");
        setTimeout(gameOver, 3000);
    });

    $('.leaflet-popup-pane').on("click", "#action3-1-2-5", function() {
        $("#action3-1-2-1").remove();
        $("#action3-1-2-2").remove();
        $("#action3-1-2-3").remove();
        $("#action3-1-2-4").remove();
        $("#action3-1-2-5").remove();
        $('#content3-1').append('<p class="setup">Without saying another word you stand up and quietly show yourself out. Rages courses through you, but there is more you can do without being dead.</p>');
        $("#content3-1").animate({ scrollTop: $(document).height()*3 }, "slow");
        startCh4();
        //marker5.togglePopup();
    });

    var afterSherman = '<div class="dContainer"><div class="header"><h2 class="dTitle">General Sherman\'s headquarters</h2><span class="time">8-9-1864</span></div><div class="dContent" id="content3-1"><img class="content" src="other/base1864.jpg"><p class="setup"> This is General Sherman\'s headquarters. You are clearly no longer welcome here.</p></div></div>';

function startCh4() {
    marker0.bindPopup(ch3StartText);
    marker0.setIcon(liveIcon);
    $("#nowContainer").animate({top:"349px"},1500);
    marker5.addTo(map).bindPopup(afterSherman);
    marker5.setIcon(liveIcon);
    marker6.bindPopup('<div class="dContainer"><div class="header"><h2 class="dTitle">General McPherson\'s army</h2><span class="time">8-7-1864</span></div><div class="dContent" id="content3-2"><img class="content" src="other/war1894.jpg"><p class="setup"> This is where McPhearson\'s army was located. It is now occupied by Union Forces.</p></div></div>');
    marker6.setIcon(staticIcon);
    marker7.bindPopup('<div class="dContainer"><div class="header"><h2 class="dTitle">Bridgadier General Sprague\'s army</h2><span class="time">8-7-1864</span></div><div class="dContent" id="content3-3"><img class="content" src="other/war1894.jpg"><p class="setup"> This is where Sprague\'s army was located.It is now occupied by Union Forces.</div></div>');
    marker7.setIcon(staticIcon);
}

//other battle locations
var marker6 = new L.marker([33.744672, -84.349547], {icon: noIconBlue});
    marker6.addTo(map);
    //marker6.bindPopup('<div class="dContainer"><div class="header"><h2 class="dTitle">General McPherson\'s army</h2><span class="time">8-7-1864</span></div><div class="dContent" id="content3-2"><img class="content" src="content/mcpherson.jpg"><p class="setup"> his is where McPhearson\'s army is located.</p></div></div>');
    //marker6.setIcon(staticIcon);

var marker7 = new L.marker([33.770503, -84.291183], {icon: noIconBlue});
    marker7.addTo(map);
    //marker7.bindPopup('<div class="dContainer"><div class="header"><h2 class="dTitle">Bridgadier General Sprague\'s army</h2><span class="time">8-7-1864</span></div><div class="dContent" id="content3-3"><img class="content" src="content/sprague.jpg"><p class="setup"> This is where Sprague\'s army is located.</div></div>');
    //marker7.setIcon(staticIcon);

//------------ pursuading slocum

function leave() {
    marker0.bindPopup('<div class="dContainer"><div class="header"><h2 class="dTitle">Immaculate Conception Church</h2><span class="time"> 8-20-1864</span></div><div class="dContent" id="content01"><img class="content" src="content/church01.jpg"><p class="setup"> you enter your church knowing that the church will not be here for much longer.</p><span class="response" id="action5-2">I could not save the church.</span><br></div></div>');
    marker0.setIcon(liveIcon);
}

    $('.leaflet-popup-pane').on("click", "#action5-2", function() {
        $('#action5-2').remove();
        $('#content01').append('<p class="talking"><span class="name"> Fa. O\'Reilly </span>I could not save the church.</p>');
        $('#content01').append('<p class="setup">You remain at the church for as long as you can. However, On September 1st General Sherman orders that all non-military personnel to leave the city. You and those congregated at the church leave Atlanta, never to return again.</p><br><span class="response" id="action5-3">Game Over</span>');
        $("#content01").animate({ scrollTop: $(document).height() }, "slow");
        startCh5();
    });

    $('.leaflet-popup-pane').on("click", "#action4-1", function() {
        $('#action4-2').remove();
        $('#action4-1').remove();
        $('#content1').append('<p class="talking"><span class="name"> Fa. O\'Reilly </span>Hope is lost. We need to leave the city while we still can.</p>');
        $('#content1').append('<p class="setup">You remain at the church for as long as you can. However, On September 1st General Sherman orders that all non-military personnel to leave the city. You and those congregated at the church leave Atlanta, never to return again.</p><br><span class="response" id="action5-3">Game Over</span>');
        $("#content1").animate({ scrollTop: $(document).height() }, "slow");
        startCh5();
    });

    $('.leaflet-popup-pane').on("click", "#action4-2-3", function() {
        $('#action4-2-3').remove();
        $('#action4-1').remove();
        $('#content1').append('<p class="talking"><span class="name"> Fa. O\'Reilly </span>Unfortunately there I do not know anyone else. It looks like we should leave the city as well.</p>');
        $('#content1').append('<p class="setup">You remain at the church for as long as you can. However, On September 1st General Sherman orders that all non-military personnel to leave the city. You and those congregated at the church leave Atlanta, never to return again.</p><br><span class="response" id="action5-3">Game Over</span>');
        $("#content1").animate({ scrollTop: $(document).height() }, "slow");
        startCh5();
    });

    $('.leaflet-popup-pane').on("click", "#action5-3", function() {
        gameOver();
    });

    $('.leaflet-popup-pane').on("click", "#action4-2", function() {
        $('#action4-2').remove();
        $('#action4-1').remove();
        $('#content1').append('<p class="talking"><span class="name"> Fa. O\'Reilly </span>If I could just reason with someone.</p>');
        if (friends){
            $('#content1').append('<p class="talking"><span class="name"> Br. Chris: </span>is there no one else you can talk with in the Union Army?</p><span class="response" id="action4-2-1">There is Major Slocum, whom I met at Peachtree Creek. We have spoken a few times since and he has become a friend. I will call for a meeting with him at City Hall.</span><br>');
        } else if (slocum) {
            $('#content1').append('<p class="talking"><span class="name"> Br. Chris: </span>is there no one else you can talk with in the Union Army?</p><span class="response" id="action4-2-2"> I met a man named Major Slocum. We should reach out to him and see if he can help us.</span><br>');
        } else {
            $('#content1').append('<p class="talking"><span class="name"> Br. Chris: </span>is there no one else you can talk with in the Union Army?</p><span class="response" id="action4-2-3"> Unfortunately there I do not know anyone else. It looks like we should leave the city as well.</span><br>');
        }
        $("#content1").animate({ scrollTop: $(document).height() }, "slow");
    });

//aquaintance option
    $('.leaflet-popup-pane').on("click", "#action4-2-2", function() {
        $('#action4-2-1').remove();
        $('#action4-2-2').remove();
        $('#action4-2-3').remove();
        $('#content1').append('<p class="talking"><span class="name"> Fa. O\'Reilly </span>I met a man named Major Slocum. We should reach out to him and see if he can help us.</p>');
        $("#content3-1").animate({ scrollTop: $(document).height() }, "slow");
            marker8.setIcon(liveIcon);
            marker8.bindPopup('<div class="dContainer"><div class="header"><h2 class="dTitle">City Hall</h2><span class="time"> 8-14-1864</span></div><div class="dContent" id="content8"><p class="setup"> One week later you meet with Major Slocum. He remembers you, but is skeptical as to why you requested a meeting.</p><p class="talking"><span class="name"> Maj. Slocum: </span>Why do you bring me here, Father?</p><span class="response" id="action4-2-2-1">Thank you for coming, Major. I called you here today to ask for your help.</span><br><span class="response" id="action4-2-2-2">I brought you here to help ask for your help.</span></div></div>');
            marker8.setIcon(liveIcon);
        $("#nowContainer").animate({top:"349px"},1500);
        $("#content1").animate({ scrollTop: $(document).height() }, "slow");
        map.setView([33.750136, -84.389228],20);
    });

    $('.leaflet-popup-pane').on("click", "#action4-2-2-1", function() {
        $('#action4-2-2-1').remove();
        $('#action4-2-2-2').remove();
        $('#content8').append('<p class="talking"><span class="name"> Fa. O\'Reilly </span>Thank you for coming, Major. I called you here today to ask for your help.</p>');
        $('#content8').append('<p class="setup">The Major looks skeptical but sees the compassion in your eyes.</p><p class="talking"><span class="name"> Maj. Slocum </span>How can I be of a service to you, Father?</p>');
        $('#content8').append('<span class="response" id="action4-2-1-2-1">Sherman is going to burn down Atlanta. I need you to stop him.</span><br><span class="response" id="action4-2-1-2-2">Our churches and sanctuaries are in danger.</span>');
        $("#content8").animate({ scrollTop: $(document).height() }, "slow");
    });
    $('.leaflet-popup-pane').on("click", "#action4-2-2-2", function() {
        $('#action4-2-2-1').remove();
        $('#action4-2-2-2').remove();
        $('#content8').append('<p class="talking"><span class="name"> Fa. O\'Reilly </span>I brought you here to help ask for your help.</p>');
        $('#content8').append('<p class="setup">The Major seems annoyed.</p><p class="talking"><span class="name"> Maj. Slocum </span>Is that right? What do you need me for?</p>');
        $('#content8').append('<span class="response" id="action4-2-2-2-1">Sherman is going to burn down Atlanta. I need you to stop him.</span><br><span class="response" id="action4-2-1-2-2">Our churches and sanctuaries are in danger.</span>');
        $("#content8").animate({ scrollTop: $(document).height() }, "slow");
    });

    $('.leaflet-popup-pane').on("click", "#action4-2-2-2-1", function() {
        $('#action4-2-2-1').remove();
        $('#action4-2-2-2').remove();
        $('#content8').append('<p class="talking"><span class="name"> Fa. O\'Reilly </span>Sherman is going to burn down Atlanta. I need you to stop him</p>');
        $('#content8').append('<p class="setup">The Major looks cross. After 30 seconds he speaks</p>');
        $('#content8').append('<p class="talking"><span class="name"> Maj. Slocum: </span>Sorry Father, I cannot help you.</p>');
        $('#content8').append('<p class="setup">Without another word he stands up and leaves.</p>');
        $("#content8").animate({ scrollTop: $(document).height() }, "slow");
    });

    $('.leaflet-popup-pane').on("click", "#action4-2-1-2-1", function() {
        $('#action4-2-1-2-1, #action4-2-1-2-2').remove();
        $('#content8').append('<p class="talking"><span class="name"> Fa. O\'Reilly </span>Sherman is going to burn down Atlanta. I need you to stop him.</p>');
        $('#content8').append('<p class="setup">The major is surprised by brevity of your statement</p><p class="talking"><span class="name"> Maj. Slocum: </span>That is not something I can do.</p><span class="response" id="action4-2-1-2-1-1">The battle is over and the city is yours. I just care about the churches.</span><br><span class="response" id="action4-2-1-2-1-2">God demands that you help us.</span>');
        $("#content8").animate({ scrollTop: $(document).height() }, "slow");
    });

    $('.leaflet-popup-pane').on("click", "#action4-2-1-2-1-1", function() {
        $('#action4-2-1-2-1-1, #action4-2-1-2-1-2').remove();
        $('#content8').append('<p class="talking"><span class="name"> Fa. O\'Reilly </span>The battle is over and the city is yours. I just care about the churches.</p>');
        $('#content8').append('<p class="talking"><span class="name"> Maj. Slocum: </span>And how do you intend to stop him?</p><span class="response" id="action4-2-1-2-2-1-1">I want you to stop him</span><br><span class="response" id="action4-2-1-2-2-1-2">Give him this message. Feel free to choose better words as you know his character.</span>');
        $("#content8").animate({ scrollTop: $(document).height() }, "slow");
    });

    $('.leaflet-popup-pane').on("click", "#action4-2-1-2-1-2", function() {
        $('#action4-2-1-2-1-2').remove();
        $('#action4-2-1-2-1-1').remove();
        $('#content8').append('<p class="talking"><span class="name"> Fa. O\'Reilly </span>God demands that you help us.</p>');
        $('#content8').append('<p class="setup">The Major looks shocked. After 30 seconds he speaks</p>');
        $('#content8').append('<p class="talking"><span class="name"> Maj. Slocum: </span>You may be God\'s messenger here in Atlanta, but soon there will be no Atlanta for you to be the messenger.</p>');
        $('#content8').append('<p class="setup">Without another word he stands up and leaves.</p>');
        marker8.bindPopup('<div class="dContainer"><div class="header"><h2 class="dTitle">City Hall</h2><span class="time"> 8-14-1864</span></div><div class="dContent" id="content8"><p class="setup"> This is where you met with Major Slocum.</p></div></div>');
        $("#content8").animate({ scrollTop: $(document).height() }, "slow");
        marker8.setIcon(liveIcon);
        leave();
    });

// friends option
    $('.leaflet-popup-pane').on("click", "#action4-2-1", function() {
        $('#action4-2-1').remove();
        $('#action4-2-2').remove();
        $('#action4-2-3').remove();
        $('#content1').append('<p class="talking"><span class="name"> Fa. O\'Reilly </span>There is Major Slocum, whom I met at Peachtree Creek. We have spoken a few times since and he seems like a reasonable gentlemen. I will call for a meeting with him at City Hall.</p>');
        $('#content1').append('<p class="talking"><span class="name"> Br. Chris: </span>Great idea. I will send word to General Slocum.</p>');
        $("#content3-1").animate({ scrollTop: $(document).height() }, "slow");
            marker8.addTo(map);
            marker8.bindPopup('<div class="dContainer"><div class="header"><h2 class="dTitle">City Hall</h2><span class="time"> 8-14-1864</span></div><div class="dContent" id="content8"><p class="setup"> One week later you meet with Major Slocum. He is glad to see you and it is clear that Major Slocum is sympathetic with your struggle.</p><p class="talking"><span class="name"> Maj. Slocum: </span>Great to see you again Father. I am glad we can be civil during this crazy time.</p><span class="response" id="action4-2-1-1">Glad to see you as well.</span><br><span class="response" id="action4-2-1-2">“Civil” is an interesting word to use, Major.</span></div></div>');
            marker8.setIcon(liveIcon);
        $("#nowContainer").animate({top:"349px"},1500);
        $("#content1").animate({ scrollTop: $(document).height() }, "slow");
        map.setView([33.750136, -84.389228],20);
    });

    $('.leaflet-popup-pane').on("click", "#action4-2-1-2", function() {
        $('#action4-2-1-2, #action4-2-1-1').remove();
        $('#content8').append('<p class="talking"><span class="name"> Fa. O\'Reilly </span>“Civil” is an interesting word to use, Major.</p>');
        $('#content8').append('<p class="setup">The major is taken back by your comment, but then seems to empathize.</p><p class="talking"><span class="name"> Maj. Slocum: </span>Why have you called this meeting today?</p><span class="response" id="action4-2-1-2-1">Sherman is going to burn down Atlanta. I need you to stop him.</span><br><span class="response" id="action4-2-1-2-2">Our churches and sanctuaries are in danger.</span>');
        $("#content8").animate({ scrollTop: $(document).height() }, "slow");
    });

    $('.leaflet-popup-pane').on("click", "#action4-2-1-1", function() {
        $('#action4-2-1-2, #action4-2-1-1').remove();
        $('#content8').append('<p class="talking"><span class="name"> Fa. O\'Reilly </span>Glad to see you as well</p>');
        $('#content8').append('<p class="setup">Although the meeting is friendly, Major Slocum senses your urgency.</p><p class="talking"><span class="name"> Maj. Slocum: </span>Why have you called this meeting today?</p><span class="response" id="action4-2-1-2-1">Sherman is going to burn down Atlanta. I need you to stop him.</span><br><span class="response" id="action4-2-1-2-2">Our churches and sanctuaries are in danger.</span>');
        $("#content8").animate({ scrollTop: $(document).height() }, "slow");
    });

    $('.leaflet-popup-pane').on("click", "#action4-2-1-2-2", function() {
        $('#action4-2-1-2-2, #action4-2-1-2-1').remove();
         $('#content8').append('<p class="talking"><span class="name"> Fa. O\'Reilly </span>Our churches and sanctuaries are in danger.</p>');
        $('#content8').append('<p class="talking"><span class="name"> Maj. Slocum: </span>how so?</p><span class="response" id="action4-2-1-2-2-1">This battle is already lost, and Sherman will not leave the city without first burning it to the ground. Churches included.</span><br><span class="response" id="action4-2-1-2-2-2">You’re armies will destroy it, along with all the churches.</span>');
        $("#content8").animate({ scrollTop: $(document).height() }, "slow");
    });

    $('.leaflet-popup-pane').on("click", "#action4-2-1-2-2-2", function() {
        $('#action4-2-1-2-2-1, #4-2-1-2-2-2').remove();
         $('#content8').append('<p class="talking"><span class="name"> Fa. O\'Reilly </span>You’re armies will destroy it, along with all the churches.</p>');
        $('#content8').append('<p class="talking"><span class="name"> Maj. Slocum: </span>We are at war. The churches not the worst of the casualties.</p><span class="response" id="action4-2-1-2-2-2-1">These churches are all we have. They are our homes. Destroying the churches is no military necessity. Please leave us with the means to rebuild.</span><br>');
        $("#content8").animate({ scrollTop: $(document).height() }, "slow");
    });

    $('.leaflet-popup-pane').on("click", "#action4-2-1-2-2-2-1", function() {
        $('#action4-2-1-2-2-2-1').remove();
        $('#content8').append('<p class="talking"><span class="name"> Fa. O\'Reilly: </span>These churches are all we have. They are our homes. Destroying the churches is no military necessity. Please leave us with the means to rebuild.</span><br>');
         $('#content8').append('<p class="setup">Major Slocum is moved by your words.</p>');
        $('#content8').append('<p class="talking"><span class="name"> Maj. Slocum: </span>The churches should be spared, but General Sherman is not easily pursuaded. How do you approach him?</p><span class="response" id="action4-2-1-2-2-1-2">Give him this message. Feel free to choose better words as you know his character.</span><br>');
        $("#content8").animate({ scrollTop: $(document).height() }, "slow");
    });

    $('.leaflet-popup-pane').on("click", "#action4-2-1-2-2-1", function() {
        $('#action4-2-1-2-2-1, #action4-2-1-2-2-2').remove();
        $('#content8').append('<p class="talking"><span class="name"> Fa. O\'Reilly </span>This battle is already lost, and Sherman will not leave the city without first burning it to the ground. Churches included.</p>');
        $('#content8').append('<p class="talking"><span class="name"> Maj. Slocum: </span>And how do you intend to stop him?</p><span class="response" id="action4-2-1-2-2-1-1">I want you to stop him</span><br><span class="response" id="action4-2-1-2-2-1-2">Give him this message. Feel free to choose better words as you know his character.</span>');
        $("#content8").animate({ scrollTop: $(document).height() }, "slow");
    });

    $('.leaflet-popup-pane').on("click", "#action4-2-1-2-2-1-1", function() {
        $('#action4-2-1-2-2-1-1, #action4-2-1-2-2-1-2').remove();
        $('#content8').append('<p class="talking"><span class="name"> Maj. Slocum: </span>And why would I do something like that?</p>');
        $('#content8').append('<p class="setup">Slocum is your only hope at saving your church.</p><span class="response" id="action4-2-1-2-1-1">The battle is over and the city is yours. I just care about the churches.</span>');
        $("#content8").animate({ scrollTop: $(document).height() }, "slow");
    });

    $('.leaflet-popup-pane').on("click", "#action4-2-1-2-2-1-2", function() {
        $('#action4-2-1-2-2-1-1, #action4-2-1-2-2-1-2').remove();
        $('#content8').append('<p class="talking"><span class="name"> Fa. O\'Reilly </span>Give him this message. Feel free to choose better words as you know his character.</p>');
        $('#content8').append('<p class="setup">Major Slocum reads the message:<br>Destruction of the churches of Atlanta is not a military necessity. In fact, their burning would be a sin against God. If Sherman persists in burning the Catholic Church, all Catholics in the ranks of the Union Army will be primed for mutiny, not by me, but by the fact that they are of catholic faith. I request that all five of Atlanta\'s churches be spared as well as its City Hall and Courthouse. Atlanta has been defeated by you, so let us maintain our means to rebuild the city under one God and one government.</p>');
        if (church){
            if (northHelped > 1){
                $('#content8').append('<p class="setup"> We helped ' + northHelped + ' northern soliders on the frontlines and accepted them into our church hospital. Now we request your help in the name of God.</p>');
            } else if(northHelped == 1) {
                $('#content8').append('<p class="setup"> We helped ' + northHelped + ' northern solider on the frontlines and accepted them into our church hospital. Now we request your help in the name of God.</p>');
            } else {
                $('#content8').append('<p class="setup"> We accepted your soliders into our church hospital. Now we request your help in the name of God.</p>');
            }
            $('#content8').append('<p class="talking"><span class="name"> Maj. Slocum: </span> You are a brave man, father. You showed my soldiers compassion in your hospitals, and now I will do you the favor of talking with General Sherman. I cannot guarantee you results, but I will meet you at your church in one week and inform you of a decision. </p>');
        } else {
            $('#content8').append('<p class="talking"><span class="name"> Maj. Slocum: </span> You are a brave man, father. We are greatful to your services on the frontline, but General Sherman will remember that you did not accept our soliders into your hospital. Regardless, I will take this note to him. I cannot guarantee you results, but I will meet you at your church in one week and inform you of a decision. </p>');
        }
        $('#content8').append('<span class="response" id="action4-2-1-2-2-1-2-1">Thank you friend. God be with you.</span>');
        $("#content8").animate({ scrollTop: $(document).height() }, "slow");
    });

    $('.leaflet-popup-pane').on("click", "#action4-2-1-2-2-1-2-1", startCh5 );

    var ch5StartText = '<div class="dContainer"><div class="header"><h2 class="dTitle">Immaculate Conception Church</h2><span class="time"> 9-2-1864</span></div><div class="dContent" id="content8"><img class="content" src="content/church01.jpg"><p class="setup"> One week later word arrived from Major Slocum. It reads:</p>';
    function finalLetter() {
        if (friends && church) {
            results = '<p class="talking"><span class="name"> Maj. Slocum: </span>Dear Father O’Reilly.<br> I am pleased to inform you that after lengthy discussion with General Sherman, it has been agreed that destroying the churches of Atlanta is not a military necessity. All Atlanta churches and designated official buildings will be placed under armed guard and spared. Surrounding buildings too will be spared as a buffer between these buildings. God is speaking, and you carry his voice. </p><p class="setup">Brother Chris sees the joy in your eyes as you read the letters.</p><p class="talking"><span class="name"> Br. Chris: </span>What does it say?</p><span class="response" id="action5-1">The churches of Atlanta will be spared from being destroyed, along with city hall, and the surrounding buildings. Despite the madness of this war, we will still have a place to call home.</span></div></div>';
        } else if ((friends || church) && (northHelped > 1)){
            results = '<p class="talking"><span class="name"> Maj. Slocum: </span>Father O’Reilly. After lengthy discussion with General Sherman, it has been agreed that destroying the churches of Atlanta is not a military necessity. All Atlanta churches will be placed under armed guard and spared. We wish you the best of luck in rebuilding your city. </p><p class="setup">Brother Chris sees that you are relieved as you read the letters.</p><p class="talking"><span class="name"> Br. Chris: </span>What does it say?</p><span class="response" id="action5-1">The churches of Atlanta will be spared from being destroyed. Despite the madness of this war, we will still have a place to call home.</span></div></div>';
        } else {
            results = '<p class="talking"><span class="name"> Maj. Slocum: </span>Father O’Reilly. I have received word from General Sherman. <br> <i>"You might as well appeal against the thunder-storm as against these terrible hardships of war. They are inevitable, and the only way the people of Atlanta can hope once more to live in peace and quiet at home, is to stop the war, which can only be done by admitting that it began in error and is perpetuated in pride."</i><br> Today we have ordered that non-combatants leave the city. I recommend you take heed and leave the city while you still can. </p><p class="setup">Brother Chris sees your disappointment as you read the letters.</p><p class="talking"><span class="name"> Br. Chris: </span>What does it say?</p><span class="response" id="action5-1">We need to leave. Take one good last look at our church, for it will be the last time we see it.</span></div></div>';
        }
    }

    function startCh5() {
        marker8.togglePopup();
        marker8.bindPopup('<div class="dContainer"><div class="header"><h2 class="dTitle">City Hall</h2><span class="time">9-1-1864</span></div><div class="dContent" id="content3-3"><img class="content" src="content/cityHall.jpg"><p class="setup"> This is where you met with Major Slocum.</div></div>');
        marker8.setIcon(liveIcon);
        finalLetter();
        marker0.bindPopup(ch5StartText + results);
        marker0.setIcon(liveIcon);
        $("#nowContainer").animate({top:"669px"},1500);
    }

    //-------------chapter 5, game ending

    function gameOver() {
        $("#slide1").fadeOut(0);
        $("#slide2").fadeOut(0);
        $("#slide3").fadeOut(0);
        $("#slide4").fadeOut(0);
        $(".popContainer").fadeIn();
        $("#ending").fadeIn();
        $("#refresh").fadeIn(0);
    }

    $('.leaflet-popup-pane').on("click", "#action5-1", gameOver);
    $("#next5").click(function(){
        $(".popContainer").fadeOut();
    });

    //change icons

    $('.blueAlive').click(function(){
        $(this).attr("src", "img/marker-iconBlueSoft.png");
    });

    $('.redAlive').click(function(){
        $(this).attr("src", "img/marker-iconRedSoft.png");
    });

    $('.leaflet-marker-pane').on("click", ".redAlive", function(){
        console.log("something");
        $(".redAlive").attr("src", "img/marker-iconRedSoft.png");
    });

    function resetRed() {
        $('.redAlive').click(function(){
            $('.redAlive').attr("src", "img/marker-iconRed.png");
        });
    }

    function resetBlue() {
        $('.blueAlive').click(function(){
            $(this).attr("src", "img/marker-icon.png");
        });
    }


    //restart game at end
    $('#restart, #refresh').click(function() {
        location.reload();
    });

    // stuff specifically for development
    if (!devMode) {
        $("#vars").remove();
        $("#ch2, #ch3, #ch4, #ch5").remove();
        $("#logo").show();
    }

    //button to check variable status

    $("#vars").click(function(){
        console.log("checking variables...");
        console.log("open church to both sides: "+ church);
        console.log("southern soldiers helped: "+ southHelped);
        console.log("northern soldiers helped: "+ northHelped);
        console.log("visited peachtree creek battle: "+ peachtreeCreek);
        console.log("met Maj. Slocum: "+ slocum);
        console.log("befriend Maj. Slocum: " + friends);
        console.log("sherman variables:");
        console.log("affront = "+ affront);
        console.log("excom = " + excom);
        console.log("mutiny = " + mutiny);
    })

    //time events
    $("button#ch2").click(startCh2);
    $("button#ch3").click(startCh3);
    $("button#ch4").click(startCh4);
    $("button#ch5").click(startCh5);
});

