function initializeMap() {
    window.map = new google.maps.Map(document.getElementById('map-canvas'), { mapTypeId: google.maps.MapTypeId.ROADMAP });
	window.mapBounds = new google.maps.LatLngBounds();
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

var infowindow
function buildInfoBox(marker, School) {
	if(infowindow){infowindow.close();}
	infoWindow = new google.maps.InfoWindow();
	google.maps.event.addListener(marker, "click", function(e){
		infoWindow.setContent("<b>"+School.Name+"</b><br/><a target='_newtab' href='"+School.BytewizeLink+"'>Bytewize Info</a>");
		infoWindow.open(window.map, marker);
	});
	(function(marker, School) {
		google.maps.event.addListener(marker, "click", function(e){
			infoWindow.setContent("<b>"+School.Name+"</b><br/><a target='_newtab' href='"+School.BytewizeLink+"'>Bytewize Info</a>");
			infoWindow.open(window.map, marker);
	  });
	})(marker, School);
}
