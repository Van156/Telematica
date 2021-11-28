import L from "leaflet";

const map = require("./location.svg");
console.log(map);
export const IconLocation = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/FaztWeb/react-leaflet-example/871b975703dec0ccd30ac56c96016af69cf7f0c0/src/assets/venue_location_icon.svg",
  iconRetinaUrl:
    "https://raw.githubusercontent.com/FaztWeb/react-leaflet-example/871b975703dec0ccd30ac56c96016af69cf7f0c0/src/assets/venue_location_icon.svg",
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [35, 35],
  className: "leaflet-venue-icon",
});
