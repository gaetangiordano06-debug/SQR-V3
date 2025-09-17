import React from "react";

const base = import.meta.env.BASE_URL || "/";

export default function Contact({ googleUrl = "https://share.google/36IUwaK1jd9wl8U5y" }) {
  return (
    <section id="contact" className="border-t border-gray-100 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Contact</h1>
        <p className="text-gray-600 mt-2">Nous sommes à votre écoute.</p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Carte contact */}
          <div className="rounded-2xl bg-white border border-gray-100 p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Sur 4 Roues</h2>
            <p className="text-gray-600 mt-2">📍 821 Rte de Pertuis, 84240 La Bastide-des-Jourdans</p>
            <p className="text-gray-600">⚙️ Services disponibles : Services de réparation</p>
            <p className="text-gray-600 mt-1">
              📞 <a className="underline hover:no-underline" href="tel:+33600000000">06 00 00 00 00</a>
            </p>

            <div className="flex flex-wrap gap-3 mt-5">
              <a href={googleUrl} target="_blank" rel="noopener noreferrer"
                 className="rounded-xl px-4 py-2 bg-black text-white hover:opacity-90">
                Voir la page Google
              </a>
              <a href={googleUrl} target="_blank" rel="noopener noreferrer"
                 className="rounded-xl px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50">
                Itinéraire
              </a>
              <a href={googleUrl} target="_blank" rel="noopener noreferrer"
                 className="rounded-xl px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50">
                Avis Google
              </a>
            </div>
          </div>

          {/* Visuel */}
          <div className="rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm">
            <img
              src={`${base}images/placeholder.jpg`}
              alt="Localisation Sur 4 Roues"
              className="w-full h-full object-cover min-h-[280px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
