// src/App.jsx
import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Contact from "./pages/Contact.jsx";

const base = import.meta.env.BASE_URL || "/";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">

        {/* Nav mobile (affichée seulement < md) */}
<nav className="md:hidden bg-white/95 backdrop-blur border-b border-gray-100">
  <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-3">
    <NavLink
      to="/"
      end
      className={({ isActive }) =>
        `flex-1 text-center px-4 py-2 rounded-full transition-all ${
          isActive ? "bg-blue-600 text-white font-semibold shadow"
                   : "text-gray-700 bg-gray-50 hover:bg-blue-50"
        }`
      }
    >
      🚗 Nos véhicules
    </NavLink>
    <NavLink
      to="/contact"
      className={({ isActive }) =>
        `flex-1 text-center px-4 py-2 rounded-full transition-all ${
          isActive ? "bg-blue-600 text-white font-semibold shadow"
                   : "text-gray-700 bg-gray-50 hover:bg-blue-50"
        }`
      }
    >
      📞 Contact
    </NavLink>
  </div>
</nav>

          {/* Gauche : logo + titre */}
          <div className="flex items-center gap-3">
            <img
              src={`${base}images/logo-sqr.jpg`}
              alt="SQR"
              className="w-16 h-16 rounded-full object-contain"
            />
            <div>
              <div className="text-lg font-semibold leading-tight">Sur Quatre Roues</div>
              <div className="text-xs text-gray-600">
                Vente de véhicules d'occasion
              </div>
            </div>
          </div>




       {/* Milieu : navigation */}
<nav className="hidden md:flex items-center gap-4 text-sm">
  <NavLink
    to="/"
    end
    className={({ isActive }) =>
      `px-5 py-2 rounded-full transition-all duration-200 transform ${
        isActive
          ? "bg-blue-600 text-white font-semibold shadow-md"
          : "text-gray-700 hover:bg-blue-50"
      } hover:scale-105`
    }
  >
    🚗 Nos véhicules
  </NavLink>

  <NavLink
    to="/contact"
    className={({ isActive }) =>
      `px-5 py-2 rounded-full transition-all duration-200 transform ${
        isActive
          ? "bg-blue-600 text-white font-semibold shadow-md"
          : "text-gray-700 hover:bg-blue-50"
      } hover:scale-105`
    }
  >
    📞 Contact
  </NavLink>
</nav>

          {/* Droite : adresse + téléphone */}
          <div className="hidden sm:flex flex-col text-right text-xs sm:text-sm text-gray-700">
            <span>📍 821 Rte de Pertuis, 84240 La Bastide-des-Jourdans</span>
            <span>
              📞 <a href="tel:0624715825" className="underline hover:no-underline">06 24 71 58 25</a>
            </span>
          </div>
        </div>
      </header>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<div className="p-8 text-center text-gray-600">Page introuvable.</div>} />
      </Routes>
    </div>
  );
}
