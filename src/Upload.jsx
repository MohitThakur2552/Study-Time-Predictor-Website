import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { UploadCloud, FileSpreadsheet, Info } from "lucide-react";

function Upload() {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setIsProcessing(true);
    try {
      const response = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ Server response:", response.data);
      navigate("/dashboard", { state: { results: response.data } });
    } catch (error) {
      console.error("❌ Upload error:", error);
      alert("Upload failed. Check console for details.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-500 to-gray-950 text-white px-6 py-16 flex flex-col justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12"
      >
        {/* LEFT SECTION - INFO */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="bg-white/10 backdrop-blur-lg border border-yellow-400/30 rounded-3xl p-10 shadow-[0_0_40px_rgba(255,255,0,0.1)]"
        >
          <h2 className="text-3xl font-extrabold text-yellow-400 mb-8 flex items-center gap-3">
            <FileSpreadsheet className="w-8 h-8 text-yellow-300" />
            Input Format & Notes
          </h2>

          <div className="space-y-8">
            {/* Sample Format */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-300 mb-3">
                CSV Format Example
              </h3>
              <div className="bg-zinc-900 border border-yellow-400/20 rounded-xl p-4 overflow-x-auto">
                <pre className="text-xs text-gray-200 font-mono leading-relaxed">
                  <code>
                    {`reads_books,book_genre_top1,screen_time_movies_series_hours_per_week,books_read_past_year
Yes,Fiction,12,20
No,Comics,25,5
Yes,Academic,8,35`}
                  </code>
                </pre>
              </div>
              <p className="mt-3 text-sm text-gray-400 italic">
                Each line represents a unique student record analyzed by our AI.
              </p>
            </div>

            {/* Notes */}
            <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 p-6 rounded-2xl border border-yellow-400/20">
              <h3 className="text-sm font-bold text-yellow-300 mb-4 uppercase tracking-wide flex items-center gap-2">
                <Info className="w-5 h-5 text-yellow-400" /> Important Notes
              </h3>
              <ul className="space-y-3 text-gray-300 text-sm">
                <li className="flex gap-2">
                  <span className="text-yellow-400 font-bold">•</span> Only upload files in <b>.csv</b> format.
                </li>
                <li className="flex gap-2">
                  <span className="text-yellow-400 font-bold">•</span> Header names must match the example above.
                </li>
                <li className="flex gap-2">
                  <span className="text-yellow-400 font-bold">•</span> Column <b>books_read_past_year</b> is essential.
                </li>
                <li className="flex gap-2">
                  <span className="text-yellow-400 font-bold">•</span> Avoid missing or invalid data for best predictions.
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* RIGHT SECTION - UPLOAD */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="bg-gradient-to-br from-zinc-950 via-black to-zinc-900 border border-yellow-500/30 rounded-3xl shadow-[0_0_50px_rgba(255,255,0,0.1)] p-10 flex flex-col justify-center"
        >
          <h2 className="text-3xl font-bold text-yellow-300 mb-6 flex items-center gap-3">
            <UploadCloud className="text-yellow-400 w-8 h-8" /> Upload Dataset
          </h2>

          <p className="text-gray-300 mb-8 leading-relaxed">
            Upload your CSV file to get a personalized <span className="text-yellow-400 font-semibold">study time prediction</span> based on AI analysis.
          </p>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-200 mb-3 uppercase tracking-wide">
              Select Your File
            </label>
            <input
              type="file"
              accept=".csv"
              onChange={(e) => setFile(e.target.files[0])}
              className="block w-full bg-zinc-800 border border-yellow-400/20 rounded-xl text-gray-100 p-3 file:mr-4 file:py-3 file:px-6 file:rounded-lg
                file:border-0 file:bg-yellow-400 file:text-black file:font-bold hover:file:bg-yellow-300 cursor-pointer transition-all duration-300"
            />
            {file && (
              <p className="mt-3 text-sm text-yellow-400 font-medium flex items-center gap-2">
                ✓ Selected: {file.name}
              </p>
            )}
          </div>

          <button
            onClick={handleUpload}
            disabled={isProcessing}
            className={`w-full flex items-center justify-center gap-3 py-4 rounded-xl font-semibold text-lg shadow-md transition-all duration-300 ${
              isProcessing
                ? "bg-yellow-500/50 text-gray-200 cursor-not-allowed"
                : "bg-yellow-400 text-black hover:bg-yellow-300 hover:scale-105 active:scale-95"
            }`}
          >
            {isProcessing ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0
                    c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <UploadCloud className="w-5 h-5" /> Upload & Predict
              </>
            )}
          </button>

          <p className="mt-6 text-center text-xs text-gray-500">
            🔒 Your data is processed locally and never stored or shared.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Upload;
