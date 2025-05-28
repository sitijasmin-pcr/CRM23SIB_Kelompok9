import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CheckCircle } from "lucide-react";

export default function FormFeedback() {
  const [form, setForm] = useState({ name: "", email: "", rating: "", feedback: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback terkirim:", form);
    setSubmitted(true);
    setForm({ name: "", email: "", rating: "", feedback: "" });
  };

  const handleReset = () => {
    setForm({ name: "", email: "", rating: "", feedback: "" });
    setSubmitted(false);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-orange-700 mb-6">
        Form Feedback Pelanggan
      </h1>

      <Card className="bg-gray-50">
        <CardContent>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="name">
                  Nama Lengkap
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Masukkan nama Anda"
                  className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="email">
                  Email (opsional)
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="nama@email.com"
                  className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Rating Pelayanan
                </label>
                <select
                  name="rating"
                  value={form.rating}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                >
                  <option value="" disabled>
                    Pilih rating Anda
                  </option>
                  <option value="1">⭐ Sangat Buruk</option>
                  <option value="2">⭐⭐ Buruk</option>
                  <option value="3">⭐⭐⭐ Cukup</option>
                  <option value="4">⭐⭐⭐⭐ Baik</option>
                  <option value="5">⭐⭐⭐⭐⭐ Sangat Baik</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="feedback">
                  Masukan atau Saran
                </label>
                <textarea
                  id="feedback"
                  name="feedback"
                  rows="4"
                  value={form.feedback}
                  onChange={handleChange}
                  placeholder="Tuliskan feedback Anda di sini..."
                  className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                ></textarea>
              </div>

              <div className="flex justify-between">
                <Button type="button" className="bg-orange-400 text-black hover:bg-orange-500" onClick={handleReset}>
                  Reset
                </Button>
                <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
                  Kirim Feedback
                </Button>
              </div>
            </form>
          ) : (
            <div className="flex flex-col items-center text-orange-700 font-medium space-y-3">
              <CheckCircle className="w-10 h-10" />
              <p>Terima kasih atas feedback Anda! 🙏</p>
              <Button onClick={handleReset} className="bg-orange-600 hover:bg-orange-700">
                Kirim Feedback Baru
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}