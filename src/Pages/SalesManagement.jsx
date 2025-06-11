import React, { useState, useMemo } from "react";

const initialOrders = [
  {
    name: "Andi Wijaya",
    date: "2025-06-09 08:45",
    member: "Bronze",
    items: "1x Americano, 1x Croissant",
    status: "Completed",
    receipt: "INV-TM-0001",
  },

  {
    name: "Sinta Marlina",
    date: "2025-06-09 09:20",
    member: "Gold",
    items: "2x Caramel Macchiato, 1x Chocolate Muffin",
    status: "Completed",
    receipt: "INV-TM-0002",
  },
  {
    name: "Dimas Pratama",
    date: "2025-06-09 10:10",
    member: "Silver",
    items: "1x Cold Brew, 1x Tuna Sandwich",
    status: "Processing",
    receipt: "INV-TM-0003",
  },
  {
    name: "Clara Nathania",
    date: "2025-06-09 10:45",
    member: "Silver",
    items: "1x Vanilla Latte",
    status: "Pending",
    receipt: "INV-TM-0004",
  },
  {
    name: "Fajar Nugroho",
    date: "2025-06-09 11:00",
    member: "Gold",
    items: "1x Espresso",
    status: "Canceled",
    receipt: "INV-TM-0005",
  },
];

const statusColors = {
  Completed: "bg-green-500",
  Processing: "bg-gray-500",
  Pending: "bg-yellow-400 text-black",
  Canceled: "bg-red-500",
};


const memberColors = {
  Bronze: "bg-yellow-700",
  Silver: "bg-gray-400",
  Gold: "bg-yellow-400",
};

const parseItems = (itemsStr) =>
  itemsStr.split(",").map((item) => {
    const [qty, ...nameParts] = item.trim().split("x ");
    return {
      name: nameParts.join("x ").trim(),
      qty: parseInt(qty),
    };
  });

const prices = {
  Americano: 12000,
  Croissant: 20000,
  Espresso: 10000,
  "Caramel Macchiato": 25000,
  "Chocolate Muffin": 15000,
  "Cold Brew": 18000,
  "Tuna Sandwich": 22000,
  "Vanilla Latte": 19000,
};

const OrderPage = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleStatusChange = (index, newStatus) => {
    const updated = [...orders];
    updated[index].status = newStatus;
    setOrders(updated);
  };

  const summary = useMemo(() => {
    const activeOrders = orders.filter((o) => o.status !== "Canceled");
    const done = activeOrders.filter((o) => o.status === "Completed").length;
    const canceled = orders.filter((o) => o.status === "Canceled").length;
    const total = activeOrders.length;

    const totalProducts = activeOrders.reduce((sum, o) => {
      const count = o.items
        .split(",")
        .map((item) => {
          const match = item.trim().match(/^(\d+)x/);
          return match ? parseInt(match[1]) : 0;
        })
        .reduce((a, b) => a + b, 0);
      return sum + count;
    }, 0);

    return {
      done,
      total,
      canceled,
      totalProducts,
      percentTotal: 100,
      percentDone: total > 0 ? Math.round((done / total) * 100) : 0,
      percentCanceled:
        orders.length > 0 ? Math.round((canceled / orders.length) * 100) : 0,
      percentItems: total > 0 ? Math.round((totalProducts / total) * 100) : 0,
    };
  }, [orders]);

  const calculateTotal = (itemsStr) => {
    return parseItems(itemsStr).reduce((sum, item) => {
      const price = prices[item.name] || 0;
      return sum + price * item.qty;
    }, 0);
  };

  const handleDownload = () => {
    alert("Fitur download masih dalam pengembangan.");
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-orange-500 mb-6">
        Order Page
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl shadow text-center">
          <h3 className="text-sm font-semibold text-gray-500">Total Orders</h3>
          <p className="text-2xl font-bold text-orange-500">{summary.total}</p>
          <p className="text-xs text-gray-400">
            {summary.percentTotal}% of total
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow text-center">
          <h3 className="text-sm font-semibold text-gray-500">Completed</h3>
          <p className="text-2xl font-bold text-green-500">{summary.done}</p>
          <p className="text-xs text-gray-400">
            {summary.percentDone}% of total
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow text-center">
          <h3 className="text-sm font-semibold text-gray-500">Canceled</h3>
          <p className="text-2xl font-bold text-yellow-500">
            {summary.canceled}
          </p>
          <p className="text-xs text-gray-400">
            {summary.percentCanceled}% of total
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow text-center">
          <h3 className="text-sm font-semibold text-gray-500">Total Items</h3>
          <p className="text-2xl font-bold text-blue-500">
            {summary.totalProducts}
          </p>
          <p className="text-xs text-gray-400">
            {summary.percentItems}% of total
          </p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white p-6 rounded-2xl shadow-xl">
        <h2 className="text-xl font-bold text-orange-500 mb-4">
          Order Request List
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-left">
            <thead>
              <tr className="text-gray-600 bg-orange-100">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Order Date</th>
                <th className="py-3 px-4">Member Type</th>
                <th className="py-3 px-4">Items</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => (
                <tr
                  key={order.receipt || idx}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="py-3 px-4 font-medium">{order.name}</td>
                  <td className="py-3 px-4">{order.date}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-white px-3 py-1 rounded-full text-sm font-semibold ${
                        memberColors[order.member]
                      }`}
                    >
                      {order.member}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm">{order.items}</td>
                  <td className="py-3 px-4">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(idx, e.target.value)}
                      className={`text-white px-3 py-1 rounded-full text-sm font-semibold focus:outline-none ${
                        statusColors[order.status]
                      }`}
                    >
                      <option value="Completed">Completed</option>
                      <option value="Processing">Processing</option>
                      <option value="Pending">Pending</option>
                      <option value="Canceled">Canceled</option>
                    </select>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span>{order.receipt}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // mencegah trigger klik baris
                          setSelectedOrder(order); // buka modal
                        }}
                        className="text-blue-500 hover:text-blue-700"
                        title="View Receipt"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M7 10l5 5m0 0l5-5m-5 5V4"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Receipt Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-10 w-[700px] relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              onClick={() => setSelectedOrder(null)}
            >
              ✕
            </button>

            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-orange-500">
                TOMORO COFFEE
              </h1>
              <p className="text-orange-500 font-semibold">
                THANKS FOR YOUR ORDER
              </p>
            </div>

            <div className="mb-4">
              <div className="grid grid-cols-3 gap-2 text-sm font-semibold text-gray-500 mb-1">
                <span>ORDER RECEIPT:</span>
                <span className="col-span-2 text-black">
                  {selectedOrder.receipt}
                </span>
                <span>NAME:</span>
                <span className="col-span-2 text-black">
                  {selectedOrder.name}
                </span>
                <span>ORDER DATE:</span>
                <span className="col-span-2 text-black">
                  {selectedOrder.date}
                </span>
              </div>
            </div>

            <table className="w-full text-sm mb-6">
              <thead className="border-b border-gray-300 text-left text-gray-500">
                <tr>
                  <th className="py-2">PRODUCT</th>
                  <th className="py-2">QTY</th>
                  <th className="py-2">PRICE</th>
                  <th className="py-2">TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {parseItems(selectedOrder.items).map((item, i) => (
                  <tr key={i} className="font-medium text-black">
                    <td className="py-2">{item.name}</td>
                    <td className="py-2">{item.qty}</td>
                    <td className="py-2">
                      Rp.{prices[item.name]?.toLocaleString()}
                    </td>
                    <td className="py-2">
                      Rp.{(prices[item.name] * item.qty)?.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-end text-sm text-gray-600 font-semibold space-y-1 flex-col items-end mb-4">
              <div className="flex w-1/2 justify-between">
                <span>SUBTOTAL</span>
                <span>
                  Rp.{calculateTotal(selectedOrder.items).toLocaleString()}
                </span>
              </div>
              <div className="flex w-1/2 justify-between">
                <span>DISCOUNT</span>
                <span>0%</span>
              </div>
              <div className="flex w-1/2 justify-between border-t pt-1">
                <span>TOTAL</span>
                <span>
                  Rp.{calculateTotal(selectedOrder.items).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={handleDownload}
                className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold text-sm shadow hover:bg-blue-600"
              >
                DOWNLOAD RECEIPT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
