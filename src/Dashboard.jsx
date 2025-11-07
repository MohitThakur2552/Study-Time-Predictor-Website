import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BarChart3, RefreshCw, FileWarning } from "lucide-react";

function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state?.results;

  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-neutral-950 flex flex-col items-center justify-center px-6 py-16 text-white">
      {results && results.status === "success" ? (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-7xl bg-white/10 backdrop-blur-md border border-yellow-400/30 rounded-3xl shadow-2xl p-10"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
            <h1 className="text-4xl font-extrabold text-yellow-400 flex items-center gap-3">
              <BarChart3 size={36} className="text-yellow-300" />
              Study Time Predictions
            </h1>
            <button
              onClick={() => navigate("/upload")}
              className="flex items-center gap-2 bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-300 transition-all duration-300 shadow-md hover:shadow-yellow-400/30"
            >
              <RefreshCw size={18} /> Upload Another Dataset
            </button>
          </div>

          {/* Description */}
          <p className="text-gray-300 text-lg mb-10 text-center md:text-left">
            Below is the predicted <span className="text-yellow-300 font-medium">daily study time</span> (in hours) for each student, analyzed using the machine learning model.
          </p>

          {/* Table */}
          <div className="overflow-x-auto rounded-2xl border border-yellow-400/20 shadow-inner">
            <table className="w-full border-collapse text-center text-white">
              <thead className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-lg">
                <tr>
                  <th className="py-4 px-6">ID</th>
                  <th className="py-4 px-6">Name</th>
                  <th className="py-4 px-6">Reads Books</th>
                  <th className="py-4 px-6">Genre</th>
                  <th className="py-4 px-6">Screen Time (hrs/week)</th>
                  <th className="py-4 px-6">Books Read (past year)</th>
                  <th className="py-4 px-6">Predicted Study Time (hrs/day)</th>
                </tr>
              </thead>
              <tbody>
                {results.predictions.map((student, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`border-b border-yellow-400/10 hover:bg-yellow-400/10 transition duration-300 ${
                      index % 2 === 0 ? "bg-white/5" : "bg-transparent"
                    }`}
                  >
                    <td className="py-4 px-6 text-yellow-300 font-semibold">{student.student_id}</td>
                    <td className="py-4 px-6">{student.name || "-"}</td>
                    <td className="py-4 px-6">{student.reads_books || "-"}</td>
                    <td className="py-4 px-6">{student.book_genre_top1 || "-"}</td>
                    <td className="py-4 px-6 text-gray-200">{student.screen_time}</td>
                    <td className="py-4 px-6 text-gray-200">{student.books_read}</td>
                    <td className="py-4 px-6 text-yellow-400 font-bold text-lg">
                      {student.predicted_study_time}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-lg border border-yellow-400/30 rounded-3xl p-10 text-center shadow-2xl w-full max-w-lg"
        >
          <FileWarning size={48} className="mx-auto text-yellow-400 mb-4" />
          <h1 className="text-3xl font-bold text-yellow-300 mb-3">
            No Prediction Found
          </h1>
          <p className="text-gray-300 mb-8 text-lg">
            Please upload a dataset to view predicted study times.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-yellow-400 text-black font-semibold px-8 py-3 rounded-xl hover:bg-yellow-300 transition-all duration-300 shadow-lg hover:shadow-yellow-400/40"
          >
            Upload Dataset
          </button>
        </motion.div>
      )}
    </section>
  );
}

export default Dashboard;
