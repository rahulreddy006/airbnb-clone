
// // let mapToken = mapToken;
// //  console.log(mapToken);
//  maptilersdk.config.apiKey = mapToken;
// const map = new maptilersdk.Map({
//      container: 'map', // container's id or the HTML element to render the map
//  style: maptilersdk.MapStyle.STREETS,
//  center: [78.45636000,17.38405000], // starting position [lng, lat]
// zoom: 10, // starting zoom
// });

// Read values passed from EJS
const { token, coordinates, title } = window.mapConfig;

// Debug to confirm
console.log("Map token:", token);
console.log("Coordinates:", coordinates);

// Configure MapTiler
maptilersdk.config.apiKey = token;

const map = new maptilersdk.Map({
  container: "map", 
  style: maptilersdk.MapStyle.STREETS,
  center: coordinates, // [lng, lat] from DB
  zoom: 12,
});

// Add marker with popup
new maptilersdk.Marker()
  .setLngLat(coordinates)
  .setPopup(new maptilersdk.Popup().setText(title))
  .addTo(map);
