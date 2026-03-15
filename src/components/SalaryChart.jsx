"use client";

export default function SalaryChart({ users }) {

  const cityTotals = {};

  users.forEach((u) => {

    const city = u[2];

    const salary = parseInt(
      u[5].replace(/[$,]/g, "")
    );

    if (!cityTotals[city]) cityTotals[city] = 0;

    cityTotals[city] += salary;

  });

  const cities = Object.keys(cityTotals);

  const maxSalary = Math.max(...Object.values(cityTotals));

  const chartHeight = 300; // mx ht
  const barWidth = 60;
  const gap = 40;

  const svgWidth = cities.length * (barWidth + gap) + 150;

  return (
    <div>

      <h2 className="text-xl font-semibold mb-4">
        Salary Distribution by City
      </h2>

      <svg width={svgWidth} height="400">

        {/* Y Axis */}
        <line
          x1="50"
          y1="20"
          x2="50"
          y2="350"
          stroke="white"
        />

        {/* X Axis */}
        <line
          x1="50"
          y1="350"
          x2={svgWidth - 50}
          y2="350"
          stroke="white"
        />

        {/* y axis scale */}
        {[0.25, 0.5, 0.75, 1].map((p, i) => {

          const y = 350 - chartHeight * p;

          return (
            <g key={i}>

              <line
                x1="45"
                y1={y}
                x2="50"
                y2={y}
                stroke="white"
              />

              <text
                x="10"
                y={y + 4}
                fill="white"
                fontSize="10"
              >
                {Math.round((maxSalary * p) / 1000)}k
              </text>

            </g>
          );

        })}

        {/* bars */}
        {cities.map((city, i) => {

          const value = cityTotals[city];

          const height =
            (value / maxSalary) * chartHeight;

          const x = 70 + i * (barWidth + gap);

          const y = 350 - height;

          return (
            <g key={city}>

              <rect
                x={x}
                y={y}
                width={barWidth}
                height={height}
                fill="#3b82f6"
              />

              {/* cities */}
              <text
                x={x + barWidth / 2}
                y="370"
                fill="white"
                fontSize="12"
                textAnchor="middle"
              >
                {city}
              </text>

            </g>
          );

        })}

      </svg>

    </div>
  );
}
