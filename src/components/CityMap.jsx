"use client";

export default function CityMap({ users }) {

  const cityCoords = {
    Edinburgh: [410, 120],
    London: [395, 140],
    Tokyo: [720, 210],
    "San Francisco": [120, 250],
    "New York": [210, 220],
    Singapore: [660, 330]
  };

  const cities = [...new Set(users.map((u) => u[2]))];

  return (
    <div>

      <h2 className="text-xl font-semibold mb-4">
        Employee Locations
      </h2>

      <svg
        viewBox="0 0 1000 500"
        className="border w-full max-w-[900px] bg-slate-900"
      >

        {/* simple world silhouette */}
        <rect width="1000" height="500" fill="#0f172a" />

        <ellipse cx="300" cy="250" rx="220" ry="140" fill="#1e293b" />
        <ellipse cx="600" cy="220" rx="250" ry="150" fill="#1e293b" />
        <ellipse cx="820" cy="260" rx="120" ry="100" fill="#1e293b" />

        {cities.map((city) => {

          const coord = cityCoords[city];

          if (!coord) return null;

          return (

            <circle
              key={city}
              cx={coord[0]}
              cy={coord[1]}
              r="6"
              fill="red"
            />

          );

        })}

      </svg>

    </div>
  );
}
