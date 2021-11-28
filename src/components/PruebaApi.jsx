import Geocode from "react-geocode";

import React from "react";

const PruebaApi = () => {
  Geocode.setLanguage("en");

  Geocode.setApiKey("AIzaSyCajUA3mYzE7u9JhvqDXDUHJTG304p7R3I");
  Geocode.setRegion("es");

  Geocode.setLocationType("ROOFTOP");

  Geocode.enableDebug();

  Geocode.fromAddress(
    "Barrio San Martin Calle 21 #18-49 Maicao La guajira"
  ).then(
    (response) => {
      const { lat, lng } = response.results[0].geometry.location;
      console.log(lat, lng);
    },
    (error) => {
      console.error(error);
    }
  );

  return <div></div>;
};
export default PruebaApi;
