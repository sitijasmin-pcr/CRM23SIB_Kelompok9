import React, { useState, useEffect } from 'react';
import { UserPlus, Repeat, Trash2, CheckCircle2 } from 'lucide-react';

const initialEmployees = [
  { id: 1, name: 'Budi', shift: 'Pagi' },
  { id: 2, name: 'Sari', shift: 'Siang' },
  { id: 3, name: 'Amin', shift: 'Malam' },
];

const shifts = ['Pagi', 'Siang', 'Malam'];

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timeout = setTimeout(onClose, 3000);
    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <div className="fixed bottom-5 right-5 bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-fade-in-up z-50">
      <CheckCircle2 size={24} />
      <p>{message}</p>
    </div>
  );
};

const ShiftPage = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [newName, setNewName] = useState('');
  const [newShift, setNewShift] = useState('Pagi');
  const [rotating, setRotating] = useState(false);
  const [toast, setToast] = useState(null);
  const [inputError, setInputError] = useState(false);

  const rotateShift = () => {
    if (employees.length === 0) return;
    setRotating(true);
    setTimeout(() => {
      const updated = employees.map(emp => {
        const nextShift = shifts[(shifts.indexOf(emp.shift) + 1) % shifts.length];
        return { ...emp, shift: nextShift };
      });
      setEmployees(updated);
      setRotating(false);
      setToast('Shift berhasil dirotasi!');
    }, 900);
  };

  const addEmployee = (e) => {
    e.preventDefault();
    if (!newName.trim()) {
      setInputError(true);
      return;
    }
    setInputError(false);
    setEmployees(prev => [
      ...prev,
      { id: prev.length ? prev[prev.length - 1].id + 1 : 1, name: newName.trim(), shift: newShift }
    ]);
    setNewName('');
    setNewShift('Pagi');
    setToast('Pegawai berhasil ditambahkan!');
  };

  const deleteEmployee = (id) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
    setToast('Pegawai berhasil dihapus!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 p-8 flex flex-col items-center">
      <h1 className="text-5xl font-extrabold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-700 flex items-center gap-3">
        👷‍♂️ Manajemen Shift Kerja
      </h1>

      <div className="w-full max-w-4xl">
        {/* Rotasi Shift */}
        <button
          onClick={rotateShift}
          disabled={rotating || employees.length === 0}
          className={`w-full mb-10 py-4 rounded-lg font-bold text-white shadow-lg flex justify-center items-center gap-3
            transition-all duration-300
            ${rotating || employees.length === 0 ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-700 hover:bg-indigo-800'}
          `}
          aria-label="Otomatiskan pergantian shift"
        >
          {rotating ? (
            <Repeat className="animate-spin" size={26} />
          ) : (
            <Repeat size={26} />
          )}
          Otomatiskan Pergantian Shift
        </button>

        {/* Form tambah pegawai */}
        <section className="bg-white rounded-xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-semibold mb-6 flex items-center gap-3 text-indigo-700">
            <UserPlus size={28} /> Tambah Pegawai Baru
          </h2>
          <form onSubmit={addEmployee} className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <input
              type="text"
              placeholder="Nama Pegawai"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              className={`flex-grow border rounded-lg px-5 py-3 focus:outline-none focus:ring-4
                transition duration-300
                ${inputError ? 'border-red-500 ring-red-400' : 'border-gray-300 ring-indigo-400'}
              `}
              aria-invalid={inputError}
              aria-describedby="name-error"
            />
            <select
              value={newShift}
              onChange={e => setNewShift(e.target.value)}
              className="border border-gray-300 rounded-lg px-5 py-3 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition duration-300"
              aria-label="Pilih shift pegawai"
            >
              {shifts.map(shift => (
                <option key={shift} value={shift}>{shift}</option>
              ))}
            </select>
            <button
              type="submit"
              disabled={!newName.trim()}
              className={`bg-green-600 text-white font-bold px-8 py-3 rounded-lg shadow-lg
                transition-colors duration-300
                ${!newName.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'}
              `}
              aria-label="Tambah pegawai baru"
            >
              Tambah
            </button>
          </form>
          {inputError && (
            <p id="name-error" className="mt-2 text-sm text-red-600 font-semibold">
              Nama pegawai tidak boleh kosong.
            </p>
          )}
        </section>

        {/* Tabel pegawai */}
        <section className="bg-white rounded-xl shadow-xl overflow-x-auto">
          <h2 className="text-3xl font-semibold text-indigo-700 p-6">📋 Daftar Pegawai</h2>
          <table className="w-full min-w-[480px] border-collapse text-left">
            <thead className="bg-indigo-100">
              <tr>
                <th className="py-4 px-6 border-b border-indigo-300">#</th>
                <th className="py-4 px-6 border-b border-indigo-300">Nama</th>
                <th className="py-4 px-6 border-b border-indigo-300">Shift</th>
                <th className="py-4 px-6 border-b border-indigo-300 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {employees.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-10 text-indigo-400 italic">
                    Belum ada data pegawai.
                  </td>
                </tr>
              ) : (
                employees.map((emp, idx) => (
                  <tr
                    key={emp.id}
                    className={`transition-colors duration-300 hover:bg-indigo-50
                      ${idx % 2 === 0 ? 'bg-indigo-50' : 'bg-white'}
                    `}
                  >
                    <td className="py-4 px-6 border-b border-indigo-200">{idx + 1}</td>
                    <td className="py-4 px-6 border-b border-indigo-200">{emp.name}</td>
                    <td className="py-4 px-6 border-b border-indigo-200">{emp.shift}</td>
                    <td className="py-4 px-6 border-b border-indigo-200 text-center">
                      <button
                        onClick={() => deleteEmployee(emp.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                        aria-label={`Hapus pegawai ${emp.name}`}
                        title={`Hapus pegawai ${emp.name}`}
                      >
                        <Trash2 size={22} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      {/* Animasi keyframes */}
      <style>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(12px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.4s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default ShiftPage;
