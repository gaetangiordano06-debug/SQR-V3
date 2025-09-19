// src/App.jsx
import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Contact from "./pages/Contact.jsx";

const base = import.meta.env.BASE_URL || "/";
const TEL = "0624715825";
const TEL_DISPLAY = "06 24 71 58 25";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}

  <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-gray-100">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 relative">
    {/* LIGNE PRINCIPALE : gauche (logo) | droite (infos) */}
    <div className="flex items-center justify-between">
      {/* Gauche : logo + titre */}
      <div className="flex items-center gap-3">
        <img
          src={`${base}images/logo-sqr.jpg`}
          alt="SQR"
          className="w-16 h-16 rounded-full object-contain"
        />
        <div>
          <div className="text-lg font-semibold leading-tight">Sur Quatre Roues</div>
          <div className="text-xs text-gray-600"> 🚘Vente de véhicules d'occasion</div>
        </div>
      </div>

      {/* Droite : adresse + téléphone (inchangé) */}
      <div className="hidden sm:flex flex-col text-right text-xs sm:text-sm text-gray-700">
        <span>📍 821 Rte de Pertuis, 84240 La Bastide-des-Jourdans</span>
        <span>
          📞 <a href="tel:0624715825" className="underline hover:no-underline">06 24 71 58 25</a>
        </span>
      </div>
    </div>

    {/* NAV CENTRÉE, NE BOUGE PAS LES CÔTÉS */}
    <nav className="hidden md:flex absolute inset-x-0 top-1/2 -translate-y-1/2 justify-center gap-4">
      <a
        href="/#parc" className="px-5 py-2 rounded-full bg-gray-100 text-gray-800 font-medium shadow hover:bg-gray-200 transition">🚗 Nos véhicules
      </a>
      <a
        href="/contact"
        className="px-5 py-2 rounded-full bg-gray-100 text-gray-800 font-medium shadow hover:bg-gray-200 transition"
      >
        📞 Contact
      </a>
    </nav>

    {/* Sur mobile : boutons visibles sous la ligne */}
    <div className="md:hidden mt-3 flex justify-center gap-2">
      <a
        href="#parc"
        className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-medium shadow hover:bg-blue-700 transition"
      >
        🚗 Nos véhicules
      </a>
      <a
        href="/contact"
        className="px-4 py-2 rounded-full border border-gray-200 text-sm font-medium hover:bg-blue-50 transition"
      >
        📞 Contact
      </a>
    </div>
  </div>
</header>




      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="*"
          element={<div className="p-8 text-center text-gray-600">Page introuvable.</div>}
        />
      </Routes>
    </div>
  );
}
