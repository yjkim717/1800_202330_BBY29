const apiKey = 'AIzaSyB8hXbq6-lLvbZ8-yUhPxL2jKgADB4Bf04';


async function loadGoogleMapsAPI() {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&libraries=places&language=en`;
        script.defer = true;
        script.async = true;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

function initMap() {
    const map = new google.maps.Map(document.getElementById('putMapHere'), {
        center: { lat: 49.2527, lng: -123.0034 }, //BCIT
        zoom: 14,
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        zoomControl: false,
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



const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('userId');

if (userId) {
    db.collection("users").doc(userId).get().then(doc => {
        if (doc.exists) {
            const userName = doc.data().name;
            showWelcomeMessage(userName);
        }
    });
}

function showWelcomeMessage(userName) {
    let welcomeMessage = document.createElement("div");
    welcomeMessage.id = "welcomeMessage";
    const upperCaseUserName = userName.toUpperCase();
    welcomeMessage.innerText = 'Welcome back, ' + upperCaseUserName + '!';

    welcomeMessage.style.position = "fixed";
    welcomeMessage.style.top = "50%";
    welcomeMessage.style.left = "50%";
    welcomeMessage.style.transform = "translate(-50%, -50%)";
    welcomeMessage.style.background = "rgba(255, 216, 228, 0.4)";
    welcomeMessage.style.border = "8px solid rgba(255, 216, 228, 0.9)";
    welcomeMessage.style.backdropFilter = "blur(10px)";
    welcomeMessage.style.color = "#625B71";
    welcomeMessage.style.fontSize = "20px";
    welcomeMessage.style.padding = "20px";
    welcomeMessage.style.borderRadius = "8px";

    document.body.appendChild(welcomeMessage);

    setTimeout(function () {
        let welcomeMessage = document.getElementById("welcomeMessage");
        if (welcomeMessage) {
            document.body.removeChild(welcomeMessage);
        }
    }, 3000);
}