import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { IconLocation } from "./IconLocation";
const MapView = ({ data, option, data2 }) => {
  return (
    <div>
      <MapContainer
        center={[11.3762, -72.2455]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data &&
          option == 1 &&
          data.map((location) => (
            <>
              <Marker
                key={location.id}
                position={location.residencia}
                icon={IconLocation}
                title="Residencia"
              >
                <Tooltip
                  direction="right"
                  offset={[0, 0]}
                  opacity={1}
                  permanent
                >
                  Residencia
                </Tooltip>
              </Marker>
              <Marker
                key={location.id + 1}
                position={location.trabajo}
                icon={IconLocation}
              >
                <Tooltip
                  direction="right"
                  offset={[0, 0]}
                  opacity={1}
                  permanent
                >
                  Trabajo
                </Tooltip>
              </Marker>
            </>
          ))}

        {data &&
          option == 2 &&
          data.map((location) => (
            <Circle
              center={location.residencia}
              radius={5}
              color={location.color}
            />
          ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
