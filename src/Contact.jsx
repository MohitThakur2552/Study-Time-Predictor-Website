import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lightbulb, Handshake } from "lucide-react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus("");

    try {
      const response = await fetch("https://formspree.io/f/mqagwlyr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ name: "", email: "", message: "" });
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-gray-950 text-white flex items-center justify-center px-6 py-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12"
      >
        {/* LEFT SECTION - INFO */}
        <div className="space-y-8">
          <h2 className="text-5xl font-extrabold text-yellow-400">
            Get in Touch ✉️
          </h2>
          <p className="text-gray-300 leading-relaxed text-lg max-w-md">
            Have questions, ideas, or collaboration requests?  
            We’d love to hear from you! Drop your message and our team will respond soon.
          </p>

          {/* Info Cards */}
          <div className="space-y-4 pt-6">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white/5 border border-yellow-400/30 rounded-2xl p-5 flex items-start gap-4 hover:shadow-[0_0_25px_rgba(255,255,0,0.2)] transition-all duration-300"
            >
              <Mail className="w-7 h-7 text-yellow-400" />
              <div>
                <h3 className="font-semibold text-yellow-300 mb-1">
                  Email Us
                </h3>
                <p className="text-gray-400 text-sm">
                  We usually respond within 24 hours.
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white/5 border border-yellow-400/30 rounded-2xl p-5 flex items-start gap-4 hover:shadow-[0_0_25px_rgba(255,255,0,0.2)] transition-all duration-300"
            >
              <Lightbulb className="w-7 h-7 text-yellow-400" />
              <div>
                <h3 className="font-semibold text-yellow-300 mb-1">
                  Feedback & Ideas
                </h3>
                <p className="text-gray-400 text-sm">
                  Help us improve with your creative suggestions.
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white/5 border border-yellow-400/30 rounded-2xl p-5 flex items-start gap-4 hover:shadow-[0_0_25px_rgba(255,255,0,0.2)] transition-all duration-300"
            >
              <Handshake className="w-7 h-7 text-yellow-400" />
              <div>
                <h3 className="font-semibold text-yellow-300 mb-1">
                  Collaborate
                </h3>
                <p className="text-gray-400 text-sm">
                  Let’s build something amazing together!
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* RIGHT SECTION - CONTACT FORM */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 150 }}
          className="bg-zinc-900/80 backdrop-blur-md border border-yellow-400/30 rounded-3xl p-10 shadow-[0_0_50px_rgba(255,255,0,0.1)]"
        >
          <h3 className="text-3xl font-bold text-yellow-300 mb-6 text-center">
            Send a Message
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wide"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-black/40 border border-yellow-400/20 rounded-xl p-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wide"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-black/40 border border-yellow-400/20 rounded-xl p-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wide"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Type your message..."
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full bg-black/40 border border-yellow-400/20 rounded-xl p-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 rounded-xl font-semibold text-lg shadow-md transition-all duration-300 ${
                isLoading
                  ? "bg-yellow-500/50 text-gray-200 cursor-not-allowed"
                  : "bg-yellow-400 text-black hover:bg-yellow-300 hover:scale-105 active:scale-95"
              }`}
            >
              {isLoading ? "Sending..." : "Send Message"}
            </button>
          </form>

          {/* Status Messages */}
          {status === "success" && (
            <div className="mt-6 bg-green-500/10 border border-green-400/30 rounded-xl p-4 text-center">
              <p className="text-green-400 font-semibold">
                ✅ Message sent successfully!
              </p>
              <p className="text-sm text-green-300">
                We’ll reply to your email soon.
              </p>
            </div>
          )}

          {status === "error" && (
            <div className="mt-6 bg-red-500/10 border border-red-400/30 rounded-xl p-4 text-center">
              <p className="text-red-400 font-semibold">❌ Something went wrong</p>
              <p className="text-sm text-red-300">Please try again later.</p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Contact;
