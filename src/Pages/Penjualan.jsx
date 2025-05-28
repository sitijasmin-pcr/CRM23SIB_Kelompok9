import React from "react";

const Penjualan = () => {
  const dataBulanan = [
    { bulan: "Januari", totalProdukTerjual: 1050, totalPendapatan: 21000000 },
    { bulan: "Februari", totalProdukTerjual: 980, totalPendapatan: 19600000 },
    { bulan: "Maret", totalProdukTerjual: 1230, totalPendapatan: 24600000 },
    { bulan: "April", totalProdukTerjual: 1100, totalPendapatan: 22000000 },
    { bulan: "Mei", totalProdukTerjual: 1150, totalPendapatan: 23000000 },
    { bulan: "Juni", totalProdukTerjual: 1000, totalPendapatan: 20000000 },
    { bulan: "Juli", totalProdukTerjual: 1250, totalPendapatan: 25000000 },
    { bulan: "Agustus", totalProdukTerjual: 1300, totalPendapatan: 26000000 },
    { bulan: "September", totalProdukTerjual: 1280, totalPendapatan: 25600000 },
    { bulan: "Oktober", totalProdukTerjual: 1400, totalPendapatan: 28000000 },
    { bulan: "November", totalProdukTerjual: 1500, totalPendapatan: 30000000 },
    { bulan: "Desember", totalProdukTerjual: 1700, totalPendapatan: 34000000 },
  ];

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl shadow-lg">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-indigo-700">
        Rangkuman Penjualan Bulanan
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-md">
          <thead className="bg-indigo-100 text-indigo-700 uppercase font-semibold tracking-wide">
            <tr>
              <th className="px-6 py-4 text-left">Bulan</th>
              <th className="px-6 py-4 text-right">Total Produk Terjual</th>
              <th className="px-6 py-4 text-right">Total Pendapatan (Rp)</th>
            </tr>
          </thead>
          <tbody>
            {dataBulanan.map(({ bulan, totalProdukTerjual, totalPendapatan }) => (
              <tr
                key={bulan}
                className="border-b border-gray-200 hover:bg-indigo-50 transition-colors duration-200"
              >
                <td className="px-6 py-4 font-medium text-gray-800">{bulan}</td>
                <td className="px-6 py-4 text-right text-gray-700 font-semibold">
                  {totalProdukTerjual.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-right text-indigo-600 font-bold">
                  Rp {totalPendapatan.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Card */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
          <span className="text-indigo-600 text-4xl font-extrabold">
            {dataBulanan.reduce((acc, cur) => acc + cur.totalProdukTerjual, 0).toLocaleString()}
          </span>
          <p className="mt-2 text-gray-600 font-semibold">Total Produk Terjual Tahun Ini</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
          <span className="text-indigo-600 text-4xl font-extrabold">
            Rp {dataBulanan.reduce((acc, cur) => acc + cur.totalPendapatan, 0).toLocaleString()}
          </span>
          <p className="mt-2 text-gray-600 font-semibold">Total Pendapatan Tahun Ini</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
          <span className="text-indigo-600 text-4xl font-extrabold">
            {(dataBulanan.reduce((acc, cur) => acc + cur.totalPendapatan, 0) / 12).toLocaleString(undefined, {maximumFractionDigits: 0})}
          </span>
          <p className="mt-2 text-gray-600 font-semibold">Rata-rata Pendapatan Bulanan</p>
        </div>
      </div>
    </div>
  );
};

export default Penjualan;
