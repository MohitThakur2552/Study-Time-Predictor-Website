import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import About from "./About";
import Upload from "./Upload";
import Contact from "./Contact";
import Footer from "./Footer";
import Dashboard from "./Dashboard";
import Home from "./Home";
import "./App.css";
function App() {
  const [uploadedData, setUploadedData] = useState([]);

  return (
    <>
      <Navbar />
      <Routes>
        {/* Home page */}
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/about" element={<About />} />
        {/* Dashboard Page */}
        <Route path="/dashboard" element={<Dashboard data={uploadedData} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
