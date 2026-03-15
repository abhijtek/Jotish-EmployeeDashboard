"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function CityMap({ users }) {

  useEffect(() => {

    const L = require("leaflet");

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });

  }, []);

  const cityCoords = {
    Edinburgh: [55.9533, -3.1883],
    London: [51.5072, -0.1276],
    Tokyo: [35.6762, 139.6503],
    "San Francisco": [37.7749, -122.4194],
    "New York": [40.7128, -74.0060],
    Singapore: [1.3521, 103.8198],
  };

  const cities = [...new Set(users.map((u) => u[2]))];

  return (
    <MapContainer
      center={[30, 20]}
      zoom={2}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        attribution="OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {cities.map((city) => {

        const coords = cityCoords[city];
        if (!coords) return null;

        return (
          <Marker key={city} position={coords}>
            <Popup>{city}</Popup>
          </Marker>
        );

      })}

    </MapContainer>
  );
}
