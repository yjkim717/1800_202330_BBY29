const apiKey = 'AIzaSyB8hXbq6-lLvbZ8-yUhPxL2jKgADB4Bf04';




async function loadGoogleMapsAPI() {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&libraries=places`;
        script.defer = true;
        script.async = true;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

function initMap() {
    const map = new google.maps.Map(document.getElementById('putMapHere'), {
        center: { lat: 49.2827, lng: -123.1207 }, //vancouver
        zoom: 13,
        //try to change it to greyscale.. need to work more
        styles: [
            { elementType: 'geometry', stylers: [{ hue: '#f5f5f5' }] },
            { elementType: 'labels.text.stroke', stylers: [{ visibility: 'off' }] },
            { elementType: 'labels.text.fill', stylers: [{ color: '#616161' }] },
            { featureType: 'administrative.land_parcel', elementType: 'labels.text.fill', stylers: [{ color: '#bdbdbd' }] },
            { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] },
            { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#e5e5e5' }] },
            { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{ color: '#9e9e9e' }] },
            { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#ffffff' }] },
            { featureType: 'road.arterial', elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] },
            { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#dadada' }] },
            { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#616161' }] },
            { featureType: 'road.local', elementType: 'labels.text.fill', stylers: [{ color: '#9e9e9e' }] },
            { featureType: 'transit.line', elementType: 'geometry', stylers: [{ color: '#e5e5e5' }] },
            { featureType: 'transit.station', elementType: 'geometry', stylers: [{ color: '#eeeeee' }] },
            { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#c9c9c9' }] },
            { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#9e9e9e' }] }
        ]
    });

    //show users' current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            map.setCenter(userLocation);

            new google.maps.Marker({
                position: userLocation,
                map: map,
                title: 'Your current location'
            });
        }, error => {
            console.error('Error getting user location:', error.message);
        });
    } else {
        console.error('Geolocation is not supported by this browser.');
    }

    const searchInput = document.getElementById('searchBar');
    const searchBox = new google.maps.places.SearchBox(searchInput);

    //TODO: After Search Inserted
    map.addListener('bounds_changed', () => {
        searchBox.setBounds(map.getBounds());
    });

    searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();

        if (places.length === 0) {
            return;
        }

        const place = places[0];

        if (place.geometry && place.geometry.location) {
            map.panTo(place.geometry.location);
            map.setZoom(15);
        }
    });
}

loadGoogleMapsAPI().then(() => {
    initMap();
}).catch(error => {
    console.error('Error loading Google Maps API:', error.message);
});


