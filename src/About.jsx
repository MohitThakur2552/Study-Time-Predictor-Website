import React from "react";
import { motion } from "framer-motion";
import { Laptop, Brain, LineChart } from "lucide-react";

function About() {
  return (
    <section
      id="about"
      className="min-h-screen bg-gradient-to-b from-black via-neutral-100 to-black text-gray-100 flex flex-col items-center justify-center px-6 py-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto text-center"
      >
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
          About{" "}
          <span className="text-yellow-400 drop-shadow-md">
            Study Time Predictor
          </span>
        </h2>

        {/* Description */}
        <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-16">
          The{" "}
          <span className="font-semibold text-yellow-400">
            Study Time Predictor
          </span>{" "}
          harnesses the power of{" "}
          <span className="text-white font-semibold">Artificial Intelligence</span>{" "}
          and Machine Learning to estimate the most effective study durations for students.  
          Our goal is to help learners study smarter — not harder.
        </p>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Card 1 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 flex flex-col items-center text-center hover:border-yellow-400/70 shadow-lg hover:shadow-yellow-400/20 transition-all duration-300"
          >
            <div className="bg-yellow-400/10 p-4 rounded-full mb-5">
              <Laptop className="text-yellow-400 w-12 h-12" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Smart Technology
            </h3>
            <p className="text-gray-400">
              Driven by advanced algorithms that analyze behavior patterns to suggest optimal study hours.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 flex flex-col items-center text-center hover:border-yellow-400/70 shadow-lg hover:shadow-yellow-400/20 transition-all duration-300"
          >
            <div className="bg-yellow-400/10 p-4 rounded-full mb-5">
              <Brain className="text-yellow-400 w-12 h-12" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              AI-Powered Insights
            </h3>
            <p className="text-gray-400">
              The model learns continuously, delivering smarter, more accurate, and personalized study recommendations.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 flex flex-col items-center text-center hover:border-yellow-400/70 shadow-lg hover:shadow-yellow-400/20 transition-all duration-300"
          >
            <div className="bg-yellow-400/10 p-4 rounded-full mb-5">
              <LineChart className="text-yellow-400 w-12 h-12" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Continuous Growth
            </h3>
            <p className="text-gray-400">
              We evolve constantly, ensuring that each prediction becomes more precise with every iteration.
            </p>
          </motion.div>
        </div>

        {/* Decorative line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "60%" }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="mt-16 h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto rounded-full"
        ></motion.div>
      </motion.div>
    </section>
  );
}

export default About;
