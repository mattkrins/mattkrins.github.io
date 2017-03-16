var showingTraffic = false;
$( ".trafficButton" ).click(function() {
	if (!window.trafficLayer){return;}
	if (showingTraffic){
		window.trafficLayer.setMap(null);
		$(this).css("font-weight","normal");
	}else{
		window.trafficLayer.setMap(window.map);
		$(this).css("font-weight","bold");
	}
	showingTraffic = !showingTraffic;
});

function initializeMap() {
    window.map = new google.maps.Map(document.getElementById('map-canvas'), { mapTypeId: google.maps.MapTypeId.ROADMAP });
	window.mapBounds = new google.maps.LatLngBounds();
	window.trafficLayer = new google.maps.TrafficLayer();
	
	var bytewizeUrl = 'https://employment.bytewize.com.au/recruit/downloadrssfeed?digest=3sTZVsHKxHFiY6oVylxFfhWMAsezGsogx5ji7Hc6ZVY-';
	var corsUrl = 'https://cors-anywhere.herokuapp.com/'; // Use a proxy because nobody likes to share data.
	$.get(corsUrl + bytewizeUrl, function( data ) {
		$(data).find("item").each(function () {
			var str = $(this).find("description").text();
			var htmlObject = $.parseHTML( str )
			var RSSObject = $(htmlObject).find("span").html();
			var schoolName = "Error";
			if (RSSObject){ // Proper RSS object
				var html = $.parseHTML(RSSObject);
				var text = $(html).text();
				schoolName = text;
			}else{ // Unformatted string, Thanks Bytewize...
				var html = $.parseHTML(str.substr(str.indexOf("<br><br><br>") + 12));
				var text = $(html).text();
				text = text.replace('Details Apply Now','');
				text = text.replace(/\-.*/,'');
				schoolName = text;
			}
			var School = [];
			School["BytewizeLink"] = $(this).find("link").text();
			School["Name"] = schoolName;
			buildGeoMarker( School );
		});
	});
}
google.maps.event.addDomListener(window, 'load', initializeMap);

function buildGeoMarker( School ) {
	var geocoder =  new google.maps.Geocoder();
	geocoder.geocode( { 'address': School.Name}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			var latLng = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()); 
			var marker = new google.maps.Marker({
				position: latLng,
				map: window.map,
				icon: 'school.png',
				title: School.Name
			});
			window.mapBounds.extend(marker.position);
			window.map.fitBounds(window.mapBounds);
			buildInfoBox(marker, School);
		}
	});	
}


function getPhoto(place, w, h) {
	var photo = false;
	if ( (place) && (place.photos) ) { photo = place.photos[0].getUrl({'maxWidth': w, 'maxHeight': h}); }
	return photo;
}

function populateSchoolInfo(marker, School) {
	var request = {location: marker.position,radius: '500',query: School.Name};
	var service = new google.maps.places.PlacesService(window.map);
	service.textSearch(request, function(results, status){
		if (status != google.maps.places.PlacesServiceStatus.OK) {return;}
		var place = results[0];
		var photo = getPhoto(place, 32, 32);
		marker.setMap(null);
		if (place){ marker.place = place; }
		if (photo){ marker.icon = photo; }
		marker.setMap(window.map);
	});
}

var infowindow
function showInfoBox(marker, School) {
	if(infowindow){infowindow.close();}
	var textBox = "";
	if (marker.place){
		var photo = getPhoto(marker.place, 200, 100);
		if (photo){ textBox = textBox+"<img src='"+photo+"' /><br/>"; }
		if (marker.place.icon){textBox = textBox+"<img with='10' height='10' src='"+marker.place.icon+"' /> ";}
	}
	textBox = textBox+"<b>"+School.Name+"</b><br/>";
	if ((marker.place) && (marker.place.formatted_address)){
		textBox = textBox+"<a target='_newtab' href='https://maps.google.com?daddr="+marker.place.formatted_address+"&layer=t'>Google Navigate</a><br/>";
	}
	textBox = textBox+"<a target='_newtab' href='"+School.BytewizeLink+"'>Bytewize Info</a>";
	infoWindow.setContent(textBox);
	infoWindow.open(window.map, marker);
}
function buildInfoBox(marker, School) {
	populateSchoolInfo(marker, School);
	infoWindow = new google.maps.InfoWindow();
	google.maps.event.addListener(marker, "click", function(e){
		showInfoBox(marker, School);
	});
	(function(marker, School) {
		google.maps.event.addListener(marker, "click", function(e){
			showInfoBox(marker, School);
	  });
	})(marker, School);
}

