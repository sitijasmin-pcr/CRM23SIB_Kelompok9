import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { CheckCircle, X } from "lucide-react";
import { Dialog } from "@headlessui/react";

export default function FormFeedback() {
  const [form, setForm] = useState({ name: "", email: "", rating: "", feedback: "" });
  const [feedbackList, setFeedbackList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Ambil feedback dari localStorage saat halaman pertama kali dimuat
  useEffect(() => {
    const storedFeedback = localStorage.getItem("feedbackList");
    if (storedFeedback) {
      setFeedbackList(JSON.parse(storedFeedback));
    }
  }, []);

  // Simpan feedback ke localStorage setiap kali feedbackList berubah
  useEffect(() => {
    localStorage.setItem("feedbackList", JSON.stringify(feedbackList));
  }, [feedbackList]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFeedback = { ...form };
    setFeedbackList((prev) => [newFeedback, ...prev]);
    setForm({ name: "", email: "", rating: "", feedback: "" });
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto relative">
      {/* Tombol buka form */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-orange-700">Feedback Pelanggan</h1>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-orange-600 hover:bg-orange-700"
        >
          + Form
        </Button>
      </div>

      {/* Daftar Feedback */}
      {feedbackList.length > 0 ? (
        <div className="space-y-4">
          {feedbackList.map((item, index) => (
            <Card key={index} className="bg-white border border-orange-200">
              <CardContent className="p-6 space-y-3 text-gray-800">
                <div className="flex items-center space-x-2 text-orange-700">
                  <CheckCircle className="w-5 h-5" />
                  <h2 className="font-semibold">Feedback #{feedbackList.length - index}</h2>
                </div>
                <p><strong>Nama:</strong> {item.name}</p>
                {item.email && <p><strong>Email:</strong> {item.email}</p>}
                <p><strong>Rating:</strong> {item.rating} ⭐</p>
                <p><strong>Feedback:</strong><br />{item.feedback}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">Belum ada feedback yang dikirim.</p>
      )}

      {/* Modal Form */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-lg rounded-xl bg-white p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            <Dialog.Title className="text-lg font-bold mb-4 text-orange-700">
              Form Feedback
            </Dialog.Title>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Nama Lengkap</label>
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-orange-500"
                  placeholder="Masukkan nama Anda"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Email (opsional)</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-orange-500"
                  placeholder="nama@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Rating Pelayanan</label>
                <select
                  name="rating"
                  value={form.rating}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-orange-500"
                >
                  <option value="" disabled>Pilih rating Anda</option>
                  <option value="1">⭐ Sangat Buruk</option>
                  <option value="2">⭐⭐ Buruk</option>
                  <option value="3">⭐⭐⭐ Cukup</option>
                  <option value="4">⭐⭐⭐⭐ Baik</option>
                  <option value="5">⭐⭐⭐⭐⭐ Sangat Baik</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Masukan atau Saran</label>
                <textarea
                  name="feedback"
                  value={form.feedback}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-orange-500"
                  placeholder="Tuliskan feedback Anda..."
                ></textarea>
              </div>

              <div className="flex justify-end">
                <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
                  Kirim
                </Button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
