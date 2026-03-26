import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444"];

const AnalyticsCharts = ({ data }) => {
  return (
    <div className="grid md:grid-cols-2 gap-8 mt-10">

      {/* Industry Risk */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-4 dark:text-white">
          Risk by Industry
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.avgRiskByIndustry}>
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="avgRisk" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Clause Distribution */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-4 dark:text-white">
          Clause Distribution
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data.clauseFrequency}
              dataKey="count"
              nameKey="_id"
              outerRadius={100}
            >
              {data.clauseFrequency.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default AnalyticsCharts;