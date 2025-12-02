import React, { useEffect, useState } from "react";
import { FiAlertTriangle, FiBarChart2, FiPackage } from "react-icons/fi";

export default function Dashboard() {
  const [categories, setCategories] = useState([]);
  const [lowStocks, setLowStocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const LOW_STOCK_LIMIT = 10;

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    setIsLoading(true);

    try {
      await new Promise((r) => setTimeout(r, 800)); // simulate API

      const dummyProducts = [
        { name: "Dolan Watch", category: "Watch", stock: 3 },
        { name: "Blue Watch", category: "Watch", stock: 25 },
        { name: "Sisy Bag", category: "Bag", stock: 40 },
        { name: "Hollan Bag", category: "Bag", stock: 8 },
        { name: "Prado Shoes", category: "Shoes", stock: 17 },
      ];

      // category quantity summary
      const categoryTotals = {};
      dummyProducts.forEach((p) => {
        if (!categoryTotals[p.category]) categoryTotals[p.category] = 0;
        categoryTotals[p.category] += p.stock;
      });

      setCategories(
        Object.entries(categoryTotals).map(([name, qty]) => ({ name, qty }))
      );

      setLowStocks(dummyProducts.filter((p) => p.stock <= LOW_STOCK_LIMIT));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* TITLE */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 flex items-center">
          <FiBarChart2 className="mr-3 text-blue-600" />
          Inventory Dashboard
        </h1>
        <p className="text-gray-500 mt-1 text-lg">
          Quick overview of stocks and categories
        </p>
      </div>

      {/* CATEGORY CARDS */}
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Category Summary</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mb-12">
        {isLoading ? (
          <>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md p-6 animate-pulse"
              >
                <div className="h-5 bg-gray-200 rounded w-32 mb-4"></div>
                <div className="h-10 bg-gray-300 rounded w-20"></div>
              </div>
            ))}
          </>
        ) : (
          categories.map((cat, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-blue-50 to-indigo-100 border border-indigo-200 shadow-lg rounded-2xl p-6 hover:shadow-xl transition duration-300"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-700">
                  {cat.name}
                </h3>
                <FiPackage className="text-indigo-600" size={26} />
              </div>
              <p className="text-5xl font-extrabold text-indigo-700 mt-2">
                {cat.qty}
              </p>
              <p className="text-sm text-indigo-500 font-medium mt-2">
                Total items in stock
              </p>
            </div>
          ))
        )}
      </div>

      {/* LOW STOCK ALERTS */}
      <div className="bg-white shadow-lg rounded-2xl p-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold text-gray-700 flex items-center">
            <FiAlertTriangle className="mr-2 text-red-600" /> Low Stock Alerts
          </h2>
        </div>

        {lowStocks.length === 0 && !isLoading ? (
          <p className="text-gray-500 italic text-lg text-center">
            ✔ All items have sufficient stock.
          </p>
        ) : isLoading ? (
          <p className="text-gray-400 animate-pulse">Loading...</p>
        ) : (
          <ul className="space-y-3">
            {lowStocks.map((item, i) => (
              <li
                key={i}
                className="flex justify-between items-center p-4 bg-red-50 border border-red-200 rounded-xl"
              >
                <span className="font-semibold text-gray-800 text-lg">
                  {item.name}
                </span>
                <span className="font-bold text-red-600 text-xl">
                  {item.stock} left
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
