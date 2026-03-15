"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";

const cityIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  tooltipAnchor: [0, -25]
});

export default function CityMap({ users }) {
  const [coords, setCoords] = useState({});

  const API_KEY = "66255119c36af91d3e5d560a8e98e7b4";

  const cities = [...new Set(users.map((u) => u[2].trim()))];

  useEffect(() => {
    async function fetchCoordinates() {
      const cityData = {};

      for (const city of cities) {
        try {
          const res = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
              city
            )}&limit=1&appid=${API_KEY}`
          );

          const data = await res.json();

          if (data.length > 0) {
            cityData[city] = [data[0].lat, data[0].lon];
          }
        } catch {}
      }

      setCoords(cityData);
    }

    fetchCoordinates();
  }, [cities]);

  return (
    <div className="w-full bg-white border border-gray-300 p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-black">City Locations</h2>
        <span className="text-sm text-gray-600">{cities.length} cities</span>
      </div>

      <div className="w-full border border-gray-200">
        <MapContainer
          center={[20, 0]}
          zoom={2}
          style={{ height: "400px", width: "100%" }}
        >
<TileLayer
  attribution="&copy; OpenStreetMap contributors &copy; CARTO"
  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
/>

          {cities.map((city) => {
            const position = coords[city];
            if (!position) return null;

            return (
              <Marker key={city} position={position} icon={cityIcon}>
                <Tooltip direction="top">{city}</Tooltip>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}