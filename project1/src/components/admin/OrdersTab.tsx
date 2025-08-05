"use client";

import React from "react";
import dbData from "../../../db.json";
import OrdersTable from "./OrdersTable";

// Generate dữ liệu test
const mockOrders = dbData.users.slice(0, 4).map((user, index) => {
  const randomProduct =
    dbData.products[Math.floor(Math.random() * dbData.products.length)];
  const statuses = ["pending", "completed", "shipped", "cancelled"];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  const randomItems = Math.floor(Math.random() * 5) + 1;
  const randomAmount = randomProduct.oldPrice * randomItems;

  return {
    id: `ORD${String(index + 1).padStart(3, "0")}`,
    customerName: user.fullName,
    customerEmail: user.email,
    totalAmount: randomAmount,
    status: randomStatus,
    orderDate: "2025-02-02",
    items: randomItems,
    productName: randomProduct.name,
  };
});

export default function OrdersTab() {
  const totalOrders = mockOrders.length;
  const pendingOrders = mockOrders.filter((o) => o.status === "pending").length;
  const completedOrders = mockOrders.filter(
    (o) => o.status === "completed"
  ).length;
  const shippedOrders = mockOrders.filter((o) => o.status === "shipped").length;

  const statusOptions = [
    { value: "", label: "Tất cả trạng thái" },
    { value: "pending", label: "Chờ xử lý" },
    { value: "completed", label: "Hoàn thành" },
    { value: "shipped", label: "Đã giao hàng" },
    { value: "cancelled", label: "Đã hủy" },
  ];

  const stats = [
    { title: "Tổng đơn hàng", value: totalOrders, color: "blue" },
    { title: "Chờ xử lý", value: pendingOrders, color: "yellow" },
    { title: "Hoàn thành", value: completedOrders, color: "green" },
    { title: "Đã giao", value: shippedOrders, color: "purple" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Quản lý đơn hàng</h1>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          + Tạo đơn hàng mới
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {stats.map(({ title, value, color }) => (
          <div
            key={title}
            className={`bg-${color}-50 p-4 rounded-lg border border-${color}-200`}
          >
            <h3 className={`text-lg font-semibold text-${color}-900`}>
              {title}
            </h3>
            <p className={`text-2xl font-bold text-${color}-600`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Tìm kiếm */}
      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Tìm kiếm đơn hàng..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <input
          type="date"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <OrdersTable />
    </div>
  );
}
