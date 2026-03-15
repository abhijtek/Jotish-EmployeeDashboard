"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMap
} from "react-leaflet";
import L from "leaflet";

/* ---------- Custom Flaticon Marker ---------- */

const cityIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  tooltipAnchor: [0, -25]
});

/* ---------- Auto Fit Map Bounds ---------- */

function FitBounds({ coords }) {

  const map = useMap();

  useEffect(() => {

    const points = Object.values(coords);

    if (points.length === 0) return;

    const bounds = L.latLngBounds(points);

    map.fitBounds(bounds, { padding: [50, 50] });

  }, [coords, map]);

  return null;
}

/* ---------- Main Component ---------- */

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
            `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`
          );

          const data = await res.json();

          if (data.length > 0) {

            cityData[city] = [
              data[0].lat,
              data[0].lon
            ];

          }

        } catch (err) {

          console.error("Error fetching coordinates for:", city);

        }

      }

      setCoords(cityData);

    }

    fetchCoordinates();

  }, [cities]);

  return (

    <MapContainer
      center={[0, 0]}
      zoom={2}
      style={{ height: "400px", width: "100%" }}
    >

      <TileLayer
        attribution="OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Automatically center map to markers */}
      <FitBounds coords={coords} />

      {cities.map((city) => {

        const position = coords[city];

        if (!position) return null;

        return (
          <Marker
            key={city}
            position={position}
            icon={cityIcon}
          >
            <Tooltip direction="top">
              {city}
            </Tooltip>
          </Marker>
        );

      })}

    </MapContainer>

  );
}