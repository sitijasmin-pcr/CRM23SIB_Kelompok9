import { useState } from "react";

const faqData = [
  {
    question: "Apakah Tomoro Coffee menggunakan biji kopi lokal?",
    answer: "Ya, kami hanya menggunakan biji kopi terbaik dari petani lokal untuk menjaga kualitas dan rasa autentik.",
  },
  {
    question: "Apakah tersedia layanan pesan antar?",
    answer: "Tersedia! Kamu bisa memesan melalui aplikasi kami atau layanan delivery partner seperti Gojek dan Grab.",
  },
  {
    question: "Apakah ada promo untuk pelanggan baru?",
    answer: "Kami sering mengadakan promo menarik khusus untuk pelanggan baru dan pelanggan setia. Pantau terus media sosial kami ya!",
  },
  {
    question: "Bisakah saya memesan kopi secara custom?",
    answer: "Tentu saja! Kamu bisa memilih tingkat kekuatan kopi, ukuran, dan tambahan lainnya sesuai selera.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-orange-700">FAQ - Pertanyaan Umum</h2>

      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div key={index} className="border border-gray-300 rounded-xl">
            <button
              onClick={() => toggleIndex(index)}
              className="w-full flex justify-between items-center p-4 font-semibold text-left text-gray-800 hover:bg-orange-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
              id={`faq-question-${index}`}
            >
              {item.question}
              <span className={`transform transition-transform duration-300 ${openIndex === index ? "rotate-180" : "rotate-0"}`}>
                ▼
              </span>
            </button>

            {openIndex === index && (
            //   <div
            //     id={`faq-answer-${index}`}
            //     aria-labelledby={`faq-question-${index}`}
            //     className="p-4 text-gray-700 bg-orange-50 rounded-b-xl"
            //   >
            //     {item.answer}
            //   </div>

            <div
                id={`faq-answer-${index}`}
                aria-labelledby={`faq-question-${index}`}
                className="mt-2 p-4 text-gray-700 bg-orange-50 rounded-b-xl"
                >
                {item.answer}
            </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
