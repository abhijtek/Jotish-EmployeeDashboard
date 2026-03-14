"use client";

export default function SalaryChart({ users }) {

  const cityTotals = {};

  users.forEach((u) => {

    const city = u[2];

    const salary = parseInt(
      u[5].replace(/[$,]/g, "")
    );

    if (!cityTotals[city]) {
      cityTotals[city] = 0;
    }

    cityTotals[city] += salary;

  });

  const cities = Object.keys(cityTotals);

  const maxSalary = Math.max(...Object.values(cityTotals));

  const barWidth = 80;

  return (
    <div>

      <h2 className="text-xl font-semibold mb-4">
        Salary Distribution by City
      </h2>

      <svg width="700" height="400">

        {cities.map((city, index) => {

          const value = cityTotals[city];

          const height = (value / maxSalary) * 300;

          return (

            <g key={city}>

              <rect
                x={index * barWidth + 50}
                y={350 - height}
                width={40}
                height={height}
                fill="steelblue"
              />

              <text
                x={index * barWidth + 50}
                y="370"
                fontSize="12"
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
