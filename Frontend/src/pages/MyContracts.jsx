import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../api/api";

const MyContracts = () => {
  const [contracts, setContracts] = useState([]);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  // 🔄 Fetch contracts
  const fetchContracts = async () => {
    try {
      const res = await API.get("/contracts/my");
      setContracts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchContracts();
  }, []);

  // 📤 Upload handler
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      await API.post("/contracts/upload", formData);
      await fetchContracts();
    } catch (err) {
      console.log(err);
      alert("Upload Failed");
    } finally {
      setUploading(false);
    }
  };

  const getRiskColor = (score) => {
    if (score >= 70) return "text-red-500";
    if (score >= 40) return "text-yellow-500";
    return "text-green-500";
  };

  return (
    <div className="p-8">

      {/* Hidden File Input */}
      <input
        type="file"
        accept=".pdf"
        id="contractUploadInput"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <h1 className="text-3xl font-bold mb-10 dark:text-white">
        My Contracts
      </h1>

      {/* EMPTY STATE */}
      {contracts.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 text-center">

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-slate-800 p-10 rounded-2xl shadow-xl"
          >
            <h2 className="text-xl font-semibold mb-4 dark:text-white">
              No Contracts Yet 📄
            </h2>

            <p className="text-gray-500 mb-6">
              Upload your first contract to start AI analysis.
            </p>

            <button
              onClick={() =>
                document
                  .getElementById("contractUploadInput")
                  .click()
              }
              disabled={uploading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              {uploading ? "Uploading..." : "Upload Contract"}
            </button>
          </motion.div>

        </div>
      ) : (

        /* CONTRACT GRID */
        <div className="grid md:grid-cols-3 gap-8">

          {contracts.map((contract) => (
            <motion.div
              key={contract._id}
              whileHover={{ scale: 1.05 }}
              onClick={() =>
                navigate(`/dashboard/contracts/${contract._id}`)
              }
              className="bg-gradient-to-br from-white to-blue-50 
                        dark:from-slate-800 dark:to-slate-700 
                        p-6 rounded-2xl shadow-lg cursor-pointer 
                        border dark:border-slate-700 transition"
            >
              <h2 className="text-lg font-semibold dark:text-white">
                {contract.fileName}
              </h2>

              <p className="text-sm text-gray-500 mt-2">
                {contract.industry}
              </p>

              <div className="mt-6 flex items-center justify-between">

                <span className={`font-bold ${getRiskColor(contract.overallRiskScore)}`}>
                  {contract.overallRiskScore}% Risk
                </span>

                <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                  View →
                </span>

              </div>
            </motion.div>
          ))}

        </div>
      )}

    </div>
  );
};

export default MyContracts;