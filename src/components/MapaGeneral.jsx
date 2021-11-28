import React, { useState } from "react";
import MapView from "./Map/Map";

const MapaGeneral = () => {
  const data = [
    {
      id: "12321321",
      residencia: [11.3764, -72.2455],
      trabajo: [11.3764, -72.2155],
      cedula: "1121526580",
      color: "green",
    },
    {
      id: "2213213213",
      residencia: [11.3464, -72.2465],
      trabajo: [11.37564, -72.2165],
      cedula: "1124044935",
      color: "yellow",
    },
    {
      id: "2312321321",
      residencia: [11.3764, -72.2485],
      trabajo: [11.3734, -72.2195],
      cedula: "84070302",
      color: "orange",
    },
  ];

  return (
    <div className="visualizacionContainer">
      <MapView data={data} option={2} />
    </div>
  );
};

export default MapaGeneral;
