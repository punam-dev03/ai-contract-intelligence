import { useState } from "react";
import { motion } from "framer-motion";
import { uploadContract } from "../api/api";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a PDF file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      await uploadContract(formData);

      alert("Contract uploaded successfully!");

      navigate("/contracts");

    } catch (err) {
      console.log(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-8 dark:text-white">
        Upload Contract
      </h1>

      <motion.form
        onSubmit={handleUpload}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg max-w-md"
      >

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-6"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition w-full"
        >
          {loading ? "Uploading..." : "Upload Contract"}
        </button>

      </motion.form>

    </div>
  );
};

export default Upload;