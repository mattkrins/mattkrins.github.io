function initialize() {
    window.map = new google.maps.Map(document.getElementById('map-canvas'), {
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
	var bounds = new google.maps.LatLngBounds();
	var myUrl = 'https://employment.bytewize.com.au/recruit/downloadrssfeed?digest=3sTZVsHKxHFiY6oVylxFfhWMAsezGsogx5ji7Hc6ZVY-';
	$.get('https://cors-anywhere.herokuapp.com/' + myUrl, function( data ) {
		$(data).find("item").each(function () {
			var str = $(this).find("description").text();
			var jqueryObject = $.parseHTML( str )
			var yes = $(jqueryObject).find("span").html();
			var Schools = [];
			if (yes){ // Proper XML object
				var html = $.parseHTML(yes);
				var text = $(html).text();
				var School = [];
				School["Name"] = text;
				School["Link"] = $(this).find("link").text();
				Schools.push(School);
			}else{ // Unformatted string
				var html = $.parseHTML(str.substr(str.indexOf("<br><br><br>") + 12));
				var text = $(html).text();
				text = text.replace('Details Apply Now','');
				text = text.replace(/\-.*/,'');
				var School = [];
				School["Name"] = text;
				School["Link"] = $(this).find("link").text();
				Schools.push(School);
			}
			for (var i = 0, length = Schools.length; i < length; i++) {
				var data = Schools[i];
				makeGeoMarker( bounds, data );
			}
		});
	});

}
google.maps.event.addDomListener(window, 'load', initialize);

function makeGeoMarker( bounds, data ) {
	var geocoder =  new google.maps.Geocoder();
	geocoder.geocode( { 'address': data.Name}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			var latLng = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()); 
			var marker = new google.maps.Marker({
				position: latLng,
				map: window.map,
				icon: 'school.png',
				title: data.Name
			});
			bounds.extend(marker.position);
			window.map.fitBounds(bounds);
			buildInfoBox(marker, data);
		}
	});	
}

var infowindow
function buildInfoBox(marker, data) {
	if(infowindow){infowindow.close();}
	infoWindow = new google.maps.InfoWindow();
	google.maps.event.addListener(marker, "click", function(e){
		infoWindow.setContent("<b>"+data.Name+"</b><br/><a target='_newtab' href='"+data.Link+"'>Bytewize Info</a>");
		infoWindow.open(window.map, marker);
	});
	(function(marker, data) {
		google.maps.event.addListener(marker, "click", function(e){
			infoWindow.setContent("<b>"+data.Name+"</b><br/><a target='_newtab' href='"+data.Link+"'>Bytewize Info</a>");
			infoWindow.open(window.map, marker);
	  });
	})(marker, data);
}
