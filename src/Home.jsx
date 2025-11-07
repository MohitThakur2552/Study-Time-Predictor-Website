import React from "react";
import { motion } from "framer-motion";
import { Brain, Upload, BarChart3, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-neutral-950 text-white flex flex-col items-center justify-center px-8 py-20 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-1/2 w-[600px] h-[600px] bg-yellow-400/10 rounded-full blur-[120px] animate-pulse"></div>
      </div>

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-6xl mx-auto text-center relative z-10"
      >
        {/* Heading */}
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Master Your <span className="text-yellow-400">Study Time</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Harness the power of <span className="text-yellow-400 font-semibold">AI</span> to analyze your
          study habits, predict optimal study hours, and help you achieve peak productivity effortlessly.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <button
            onClick={() => navigate("/upload")}
            className="bg-yellow-400 text-black font-semibold text-lg px-8 py-4 rounded-xl hover:bg-yellow-300 transition-all duration-300 shadow-lg hover:shadow-yellow-400/40 flex items-center justify-center gap-2"
          >
            <Upload size={20} /> Upload Dataset
          </button>

          <button
            onClick={() => navigate("/about")}
            className="border border-yellow-400 text-yellow-300 font-semibold text-lg px-8 py-4 rounded-xl hover:bg-yellow-400/10 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Brain size={20} /> Learn More
          </button>
        </motion.div>
      </motion.div>

      {/* Feature Section */}
      <motion.div
        className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full px-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        {/* Feature 1 */}
        <div className="bg-white/10 border border-yellow-400/30 rounded-2xl p-8 backdrop-blur-md shadow-xl hover:scale-105 hover:shadow-yellow-400/30 transition-all duration-300 text-center">
          <Brain className="text-yellow-400 w-12 h-12 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-3">AI-Powered Analysis</h3>
          <p className="text-gray-300">
            Our intelligent ML engine learns from your data and delivers accurate, real-time study predictions.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-white/10 border border-yellow-400/30 rounded-2xl p-8 backdrop-blur-md shadow-xl hover:scale-105 hover:shadow-yellow-400/30 transition-all duration-300 text-center">
          <BarChart3 className="text-yellow-400 w-12 h-12 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-3">Smart Insights</h3>
          <p className="text-gray-300">
            Get detailed breakdowns of your learning behavior to optimize your schedule for maximum performance.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-white/10 border border-yellow-400/30 rounded-2xl p-8 backdrop-blur-md shadow-xl hover:scale-105 hover:shadow-yellow-400/30 transition-all duration-300 text-center">
          <Sparkles className="text-yellow-400 w-12 h-12 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-3">User-Friendly Design</h3>
          <p className="text-gray-300">
            A clean, intuitive interface that makes it easy to upload data, view predictions, and take action.
          </p>
        </div>
      </motion.div>

      {/* Bottom Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="mt-24 text-gray-400 text-sm text-center"
      >
        © {new Date().getFullYear()} <span className="text-yellow-400 font-semibold">Study Predictor</span> — 
        Predict Smarter. Learn Faster. Perform Better.
      </motion.p>
    </section>
  );
}

export default Home;
