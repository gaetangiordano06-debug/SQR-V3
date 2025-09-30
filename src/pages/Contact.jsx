import React from "react";

export default function Contact() {
  const mapsUrl =
    "https://www.google.com/maps/place/Sur+Quatre+Roues/@43.783569,5.622334,17z/data=!3m1!4b1!4m6!3m5!1s0x12ca2f5b27c0ecdd:0x5780c5804e91cce4!8m2!3d43.783569!4d5.622334!16s%2Fg%2F11xrm3ljzh?entry=ttu";
  const itineraireUrl =
    "https://www.google.com/maps/dir/?api=1&destination=43.783569,5.622334";

  const tel = "0624715825";
  const telDisplay = "06 24 71 58 25";
  const email = "contact@surquatreroues.fr";

  return (
    <section id="contact" className="border-t border-gray-100 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Contact</h1>
        <p className="text-gray-600 mt-2">
          Retrouvez toutes nos coordonnées et laissez-nous un message.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Infos contact */}
          <div className="rounded-2xl bg-white border border-gray-100 p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Sur Quatre Roues</h2>
            <p className="text-gray-600 mt-2">
              📍 821 Route de Pertuis, 84240 La Bastide-des-Jourdans, France
            </p>
            <p className="text-gray-600">
              🚗 Vente de véhicules d'occasion
            </p>
            <p className="text-gray-600 mt-1">
              📞{" "}
              <a href={`tel:${tel}`} className="underline hover:no-underline">
                {telDisplay}
              </a>
            </p>
            <p className="text-gray-600 mt-1">
              ✉️{" "}
              <a
                href={`mailto:${email}`}
                className="underline hover:no-underline"
              >
                {email}
              </a>
            </p>

            <div className="flex flex-wrap gap-3 mt-5">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full px-5 py-2 bg-black text-white hover:opacity-90 transition"
              >
                Voir sur Google Maps
              </a>

              <a
                href={itineraireUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full px-5 py-2 bg-white border border-gray-200 hover:bg-gray-50 transition"
              >
                Itinéraire
              </a>

              <a
                href={`tel:${tel}`}
                className="rounded-full px-5 py-2 bg-green-600 text-white hover:bg-green-700 transition"
              >
                Appeler
              </a>
            </div>
          </div>

          {/* Formulaire de contact */}
          <div className="rounded-2xl bg-white border border-gray-100 p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Envoyez-nous un message</h2>
            <form
              action="https://formspree.io/f/yourFormId" 
              method="POST"
              className="mt-4 space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nom
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full rounded-full border border-gray-200 px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full rounded-full border border-gray-200 px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  name="message"
                  rows="4"
                  required
                  className="w-full rounded-2xl border border-gray-200 px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-blue-600 text-white py-2 px-4 hover:bg-blue-700 transition font-medium"
              >
                Envoyer
              </button>
            </form>
          </div>
        </div>

        {/* Carte Google Maps */}
        <div className="mt-8 rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2887.857072153458!2d5.622334!3d43.783569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12ca2f5b27c0ecdd%3A0x5780c5804e91cce4!2sSur%20Quatre%20Roues!5e0!3m2!1sfr!2sfr!4v1694790000000!5m2!1sfr!2sfr"
            width="100%"
            height="320"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Sur Quatre Roues - Google Maps"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
