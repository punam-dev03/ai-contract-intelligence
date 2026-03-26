import { motion } from "framer-motion";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center py-20">

      <h1 className="text-4xl font-bold mb-4 text-gray-800">
        Simple Transparent Pricing
      </h1>

      <p className="text-gray-500 mb-16">
        Choose a plan that fits your legal intelligence needs.
      </p>

      <div className="grid md:grid-cols-3 gap-10">

        {/* FREE */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white p-8 rounded-2xl shadow-lg w-80 text-center"
        >
          <h2 className="text-xl font-bold mb-4">Free</h2>
          <p className="text-4xl font-bold mb-6">$0</p>

          <ul className="text-gray-500 mb-8 space-y-2">
            <li>✔ 5 Contracts</li>
            <li>✔ Basic Analytics</li>
            <li>✔ Risk Score</li>
          </ul>

          <button className="bg-gray-800 text-white px-6 py-2 rounded-lg">
            Get Started
          </button>
        </motion.div>

        {/* PRO (Highlighted) */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-blue-600 text-white p-10 rounded-2xl shadow-2xl w-80 text-center scale-105"
        >
          <h2 className="text-xl font-bold mb-4">Pro</h2>
          <p className="text-4xl font-bold mb-6">$29/mo</p>

          <ul className="mb-8 space-y-2">
            <li>✔ Unlimited Contracts</li>
            <li>✔ AI Clause Intelligence</li>
            <li>✔ Financial Simulation</li>
            <li>✔ Risk Comparison</li>
          </ul>

          <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold">
            Upgrade Now
          </button>
        </motion.div>

        {/* ENTERPRISE */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white p-8 rounded-2xl shadow-lg w-80 text-center"
        >
          <h2 className="text-xl font-bold mb-4">Enterprise</h2>
          <p className="text-4xl font-bold mb-6">Custom</p>

          <ul className="text-gray-500 mb-8 space-y-2">
            <li>✔ Team Access</li>
            <li>✔ API Access</li>
            <li>✔ Dedicated Support</li>
            <li>✔ Custom AI Models</li>
          </ul>

          <button className="bg-gray-800 text-white px-6 py-2 rounded-lg">
            Contact Sales
          </button>
        </motion.div>

      </div>
    </div>
  );
};

export default Pricing;