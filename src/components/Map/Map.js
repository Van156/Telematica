import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  Tooltip,
  useMap,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  IconLocation,
  IconLocationGreen,
  IconLocationYellow,
  IconLocationRed,
  IconLocationPink,
  IconLocationOrange,
} from "./IconLocation";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import HouseIcon from "@mui/icons-material/House";
import WorkIcon from "@mui/icons-material/Work";

const MapView = ({ data, option, center, data2 }) => {
  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }
  const [customCenter, setCustomCenter] = useState(1);

  const setCenter = (d) => {
    if (option === 1 && d === 1) {
      setCustomCenter(data.trabajo);
    } else {
      setCustomCenter(data.residencia);
    }
  };

  return (
    <div>
      {center && (
        <div>
          {option === 1 ? (
            <div>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  endIcon={<WorkIcon />}
                  onClick={() => setCenter(1)}
                >
                  Trabajo
                </Button>
                <Button
                  variant="contained"
                  endIcon={<HouseIcon />}
                  onClick={() => setCenter(2)}
                >
                  Residencia
                </Button>
              </Stack>
            </div>
          ) : (
            <></>
          )}

          <MapContainer center={center} zoom={15} scrollWheelZoom={false}>
            <ChangeView
              zoom={15}
              center={customCenter === 1 ? center : customCenter}
            />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {data && option == 1 && (
              <>
                <Marker
                  position={data.residencia}
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
                <Marker position={data.trabajo} icon={IconLocation}>
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
            )}

            {data &&
              option == 2 &&
              data.map((location) => {
                if (location.color === "green") {
                  return (
                    <>
                      <Marker
                        position={location.residencia}
                        icon={IconLocationGreen}
                      ></Marker>
                    </>
                  );
                }
                if (location.color === "yellow") {
                  return (
                    <>
                      <Marker
                        position={location.residencia}
                        icon={IconLocationYellow}
                      ></Marker>
                    </>
                  );
                }
                if (location.color === "red") {
                  return (
                    <>
                      <Marker
                        position={location.residencia}
                        icon={IconLocationRed}
                      ></Marker>
                    </>
                  );
                }
                if (location.color === "Pink") {
                  return (
                    <>
                      <Marker
                        position={location.residencia}
                        icon={IconLocationPink}
                      ></Marker>
                    </>
                  );
                }
                if (location.color === "orange") {
                  return (
                    <>
                      <Marker
                        position={location.residencia}
                        icon={IconLocationOrange}
                      ></Marker>
                    </>
                  );
                }
              })}
          </MapContainer>
        </div>
      )}
    </div>
  );
};

export default MapView;
