import React, { useState } from "react";

const Produk = () => {
  const [filter, setFilter] = useState("All");

  const menus = [
    {
      id: 1,
      name: "Espresso",
      description: "Kopi hitam pekat dengan aroma kuat.",
      price: 20000,
      type: "Minuman",
      rating: 4.5,
      sold: 124,
      imageUrl: "https://kopikita.id/wp-content/uploads/2022/12/espresso-vs-expresso.jpg",
    },
    {
      id: 2,
      name: "Cappuccino",
      description: "Kopi susu dengan foam lembut.",
      price: 25000,
      type: "Minuman",
      rating: 4.8,
      sold: 198,
      imageUrl: "https://i.pinimg.com/736x/33/44/2e/33442e58a74503c7cef4fc437a4ebc8e.jpg",
    },
    {
      id: 3,
      name: "Matcha Latte",
      description: "Teh hijau Jepang dengan susu yang creamy.",
      price: 27000,
      type: "Minuman",
      rating: 4.6,
      sold: 143,
      imageUrl: "https://munchingwithmariyah.com/wp-content/uploads/2020/06/IMG_0748.jpg",
    },
    {
      id: 4,
      name: "Americano",
      description: "Kopi hitam dengan rasa lebih ringan.",
      price: 18000,
      type: "Minuman",
      rating: 4.2,
      sold: 115,
      imageUrl: "https://i.pinimg.com/736x/9a/07/f8/9a07f89dde60abe27cb4cdc46693755f.jpg",
    },
    {
      id: 5,
      name: "Caramel Macchiato",
      description: "Perpaduan espresso, susu, dan saus karamel.",
      price: 20000,
      type: "Minuman",
      rating: 4.7,
      sold: 174,
      imageUrl: "https://i.pinimg.com/736x/17/59/c9/1759c9d02a4c3edb398c986e42629148.jpg",
    },
    {
      id: 6,
      name: "Chocolate Frappe",
      description: "Minuman coklat dingin dengan es blended.",
      price: 28000,
      type: "Minuman",
      rating: 4.9,
      sold: 221,
      imageUrl: "https://i.pinimg.com/736x/b0/95/0c/b0950c22362a3a30e353bac00bc2ad31.jpg",
    },
    {
      id: 7,
      name: "Strawberry Smoothies",
      description: "Minuman my favorit kesukaan gwe.",
      price: 18000,
      type: "Minuman",
      rating: 4.4,
      sold: 132,
      imageUrl: "https://i.pinimg.com/736x/1e/17/5e/1e175e789f89bf654036b7d94d7db517.jpg",
    },
    {
      id: 8,
      name: "Roti Bakar",
      description: "Roti bakar dengan selai coklat dan keju.",
      price: 15000,
      type: "Makanan",
      rating: 4.3,
      sold: 96,
      imageUrl: "https://i.pinimg.com/736x/bf/93/b9/bf93b97bd481a1ecda95c814510998bf.jpg",
    },
    {
      id: 9,
      name: "Kentang Goreng",
      description: "Kentang goreng renyah cocok untuk teman ngopi.",
      price: 18000,
      type: "Makanan",
      rating: 4.6,
      sold: 109,
      imageUrl: "https://i.pinimg.com/736x/7f/be/ed/7fbeed479e435f8eebf25138e71bd0f3.jpg",
    },
  ];

  const filteredMenus = filter === "All" ? menus : menus.filter((menu) => menu.type === filter);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push("★");
    }
    if (hasHalf) {
      stars.push("☆");
    }
    while (stars.length < 5) {
      stars.push("✩");
    }
    return stars.join(" ");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Menu Cafe & Coffee Shop</h1>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 mb-8">
        {["All", "Minuman", "Makanan"].map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 rounded-full font-medium transition ${
              filter === category
                ? "bg-purple-600 text-white"
                : "bg-white border border-purple-600 text-purple-600 hover:bg-purple-100"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Menu Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredMenus.map((menu) => (
          <div
            key={menu.id}
            className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-2xl transition"
          >
            <img
              src={menu.imageUrl}
              alt={menu.name}
              className="h-48 w-full object-cover rounded-xl mb-4"
            />
            <h2 className="text-xl font-semibold">{menu.name}</h2>
            <p className="text-gray-600 mb-2">{menu.description}</p>
            <p className="text-sm text-yellow-500 mb-1">
              ⭐ {renderStars(menu.rating)} ({menu.rating})
            </p>
            <p className="text-sm text-gray-500 mb-2">{menu.sold} terjual</p>
            <p className="text-lg font-bold text-green-600">Rp {menu.price.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Produk;
