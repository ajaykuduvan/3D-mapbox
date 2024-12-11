mapboxgl.accessToken = 'pk.eyJ1IjoiYWpheWt1bWFyY3NlIiwiYSI6ImNtNGUwOWc4aTBxOGIya3M4cHVyZjAxbG8ifQ.SyCeLLUbbztPlOavusvsew';

// Coordinates for Rosy Tower
var rosyTowerCoordinates = [80.2486, 13.0559];

// Initialize the map
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-streets-v12',
    center: rosyTowerCoordinates,
    zoom: 15,
    pitch: 60,
    bearing: -30,
    hash: true
});

map.on('load', function() {
    var layers = map.getStyle().layers;
    var labelLayerId;
    for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
            labelLayerId = layers[i].id;
            break;
        }
    }

    // Add 3D buildings layer
    map.addLayer({
        'id': '3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
            'fill-extrusion-color': '#aaa',
            'fill-extrusion-height': [
                'interpolate', ['linear'], ['zoom'],
                15, 0,
                15.05, ['get', 'height']
            ],
            'fill-extrusion-base': [
                'interpolate', ['linear'], ['zoom'],
                15, 0,
                15.05, ['get', 'min_height']
            ],
            'fill-extrusion-opacity': 0.6
        }
    }, labelLayerId);

    // Add marker for Rosy Tower
    new mapboxgl.Marker()
        .setLngLat(rosyTowerCoordinates)
        .setPopup(new mapboxgl.Popup().setHTML("<strong>Rosy Tower</strong>"))
        .addTo(map);
});
