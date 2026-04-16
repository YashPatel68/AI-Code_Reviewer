import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Feed from "./components/feedback";
import Home from "./components/app";

const App = () => {
  return (
    <div className="min-h-screen bg-[#04050a] text-zinc-100">
      <Navbar />
      <main className="min-h-[calc(100vh-88px)]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feedback" element={<Feed />} />
      </Routes>
      </main>
    </div>
  );
};

export default App;
