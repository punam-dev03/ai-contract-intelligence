import { useEffect, useState } from "react";
import API from "../api/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Analytics = () => {

  const [contracts, setContracts] = useState([]);

  useEffect(() => {

    const fetchContracts = async () => {

      const res = await API.get("/contracts/my");

      setContracts(res.data);

    };

    fetchContracts();

  }, []);

  const timelineData = contracts.map((c, index) => ({
    name: `Contract ${index + 1}`,
    risk: c.overallRiskScore,
  }));

  return (

    <div className="space-y-10">

      <h1 className="text-2xl font-bold dark:text-white">
        Contract Analytics Dashboard
      </h1>

      {/* RISK TIMELINE */}

      <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg">

        <h2 className="text-xl font-bold mb-6 dark:text-white">
          Risk Timeline
        </h2>

        <ResponsiveContainer width="100%" height={300}>

          <LineChart data={timelineData}>

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="risk"
              stroke="#6366f1"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>

  );
};

export default Analytics;