import { useTaskStore } from "../store/taskStore";
import {
  RadialBarChart,
  RadialBar,
  PolarRadiusAxis,
  Label,
  Cell,
} from "recharts";

const RadialChart = () => {
  const { tasks, completedTasks, activeTasks } = useTaskStore();
  const totalTasks = tasks.length;

  const chartData = [
    {
      completed: completedTasks().length,
      pending: totalTasks - completedTasks().length + 1,
    },
  ];
  return (
    <div>
      <div className="mt-1 mb-4 text-center text-sm">
        <p className="text-base font-semibold">Completed vs Pending</p>
        {/* Indicators (Legend) */}
        <div className="mt-2 flex justify-center gap-6">
          <div className="flex items-center gap-2 text-sm">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: "#10b981" }}
            ></span>
            <span className="text-zinc-700 font-medium">
              Completed:{" "}
              <strong className="text-zinc-800">
                {completedTasks().length}
              </strong>
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: "#3b82f6" }}
            ></span>
            <span className="text-zinc-700 font-medium">
              Pending:{" "}
              <strong className="text-zinc-800">{activeTasks().length}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="flex justify-center items-center h-[240px]">
        <RadialBarChart
          width={Math.min(250, window.innerWidth * 0.8)}
          height={Math.min(250, window.innerWidth * 0.8)}
          data={chartData}
          startAngle={180}
          endAngle={0}
          innerRadius="70%"
          outerRadius="95%"
        >
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) - 16}
                        className="fill-gray-900 text-2xl font-bold"
                      >
                        {totalTasks.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 8}
                        className="fill-zinc-700 text-md font-semibold"
                      >
                        Total Tasks
                      </tspan>
                    </text>
                  );
                }
                return null;
              }}
            />
          </PolarRadiusAxis>

          {/* Stacked bars */}

          {/* <RadialBar dataKey="value" fillKey="fill" cornerRadius={5}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </RadialBar> */}
          <RadialBar
            dataKey="completed"
            stackId="a"
            cornerRadius={2}
            fill="#10b981"
            className="stroke-transparent stroke-2"
          />
          <RadialBar
            dataKey="pending"
            fill="#5c82ff"
            stackId="a"
            cornerRadius={2}
            className="stroke-transparent stroke-2"
          />
        </RadialBarChart>
      </div>
    </div>
  );
};

export default RadialChart;

// const chartData = [
//   { name: "Completed", value: completedTasks().length, fill: "#10b981" },
//   { name: "Pending", value: activeTasks().length, fill: "#3b82f6" },
// ];
