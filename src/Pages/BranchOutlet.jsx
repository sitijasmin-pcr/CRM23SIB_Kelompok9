// src/Pages/BranchOutlet.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { HiLocationMarker } from 'react-icons/hi';

const branches = [
  { name: 'Tomoro Coffee - Sembilang', path: 'https://g.co/kgs/Zhk6wiy' },
  { name: 'Tomoro Coffee - Riau', path: 'https://g.co/kgs/Rp6imuu' },
  { name: 'Tomoro Coffee - Nangka', path: 'https://g.co/kgs/8cEwtVe' },
  { name: 'Tomoro Coffee - Gobah', path: 'https://g.co/kgs/aVKG3UT' },
  { name: 'Tomoro Coffee - ARIFIN AHMAD', path: 'https://g.co/kgs/bJ3uSXM' },
  { name: 'Tomoro Coffee - DURIAN', path: 'https://g.co/kgs/rgKhhbh' },
  { name: 'Tomoro Coffee - HANGTUAH', path: 'https://g.co/kgs/jwSsoQTa' },
  { name: 'Tomoro Coffee - Mal SKA', path: 'https://g.co/kgs/2LGb4yV' },

];

const BranchOutlet = () => {
  return (
    <section className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-900">
        Daftar Cabang Tomorrow Coffee Di Pekanbaru
      </h1>
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {branches.map(({ name, path }) => (
          <Link
            key={path}
            to={path}
            className="flex flex-col items-start p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 group"
            aria-label={`Kunjungi cabang ${name}`}
          >
            <HiLocationMarker className="text-4xl text-blue-600 mb-3 group-hover:text-blue-800 transition-colors" />
            <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
              {name}
            </h2>
            <p className="mt-2 text-gray-600 group-hover:text-blue-600 transition-colors">
              Klik untuk melihat detail dan lokasi cabang
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BranchOutlet;
