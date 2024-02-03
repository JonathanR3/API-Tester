import React from 'react';
import "./App.css";
import { Route, Routes } from "react-router-dom"
import Navbar from "./navbar"
import Home from "./pages/home";
import Evolutions from "./pages/evolutions";
import Abilities from "./pages/abilities";
import Natures from "./pages/natures";
import Items from "./pages/items";

export default function App() {
  return (
    <div className = "main">
      <Navbar />
      <div className = "container">
        <Routes> {/* Different routes for subpages with paths and renders each page component */}
          <Route path = "/" element = {<Home />} />
          <Route path = "/evolutions" element = {<Evolutions />} />
          <Route path = "/abilities" element = {<Abilities />} />
          <Route path = "/natures" element = {<Natures />} />
          <Route path = "/items" element = {<Items />} />
        </Routes>
      </div>
    </div>
  );
};

