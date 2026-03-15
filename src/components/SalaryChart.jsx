"use client";

export default function SalaryChart({ users }) {
  const cityTotals = {};

  users.forEach((u) => {
    const city = u[2];
    const salary = parseInt(u[5].replace(/[$,]/g, ""));

    if (!cityTotals[city]) cityTotals[city] = 0;
    cityTotals[city] += salary;
  });

  const cities = Object.keys(cityTotals);
  const maxSalary = Math.max(...Object.values(cityTotals));

  const chartHeight = 300;
  const barWidth = 60;
  const gap = 40;

  const svgWidth = cities.length * (barWidth + gap) + 150;

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold text-gray-200">
        Salary Distribution by City
      </h2>

      <div className="w-full overflow-x-auto">
        <svg width={svgWidth} height="400">
          <line x1="50" y1="20" x2="50" y2="350" stroke="gray" />
          <line x1="50" y1="350" x2={svgWidth - 50} y2="350" stroke="gray" />

          {[0.25, 0.5, 0.75, 1].map((p, i) => {
            const y = 350 - chartHeight * p;

            return (
              <g key={i}>
                <line x1="45" y1={y} x2="50" y2={y} stroke="gray" />
                <text x="10" y={y + 4} fill="gray" fontSize="10">
                  {Math.round((maxSalary * p) / 1000)}k
                </text>
              </g>
            );
          })}

          {cities.map((city, i) => {
            const value = cityTotals[city];
            const height = (value / maxSalary) * chartHeight;

            const x = 70 + i * (barWidth + gap);
            const y = 350 - height;

            return (
              <g key={city}>
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={height}
                  fill="blue"
                  className="hover:fill-green-500"
                />

                <text
                  x={x + barWidth / 2}
                  y="370"
                  fill="gray"
                  fontSize="12"
                  textAnchor="middle"
                >
                  {city}
                </text>

                <text
                  x={x + barWidth / 2}
                  y={y - 6}
                  fill="gray"
                  fontSize="10"
                  textAnchor="middle"
                >
                  {Math.round(value / 1000)}k
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}