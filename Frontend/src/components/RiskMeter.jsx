import { motion } from "framer-motion";

const RiskMeter = ({ score }) => {
  const percentage = Math.min(score, 100);

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-10">
      <h2 className="text-lg font-semibold mb-4">Overall Risk Meter</h2>

      <div className="w-full bg-gray-200 rounded-full h-4">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1 }}
          className="bg-blue-600 h-4 rounded-full"
        />
      </div>

      <p className="mt-3 text-blue-600 font-bold">
        {percentage}% Risk Score
      </p>
    </div>
  );
};

export default RiskMeter;