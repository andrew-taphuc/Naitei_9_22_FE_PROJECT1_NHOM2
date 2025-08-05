"use client";

import React from "react";
import usersData from "../../../db.json";
import AccountsTable from "./AccountsTable";

// Thêm các trường bổ sung
const mockAccounts = usersData.users.map((user) => ({
  ...user,
  status: "active",
  role: "user",
  createdAt: "2025-27-07",
}));

// Danh sách option cho vai trò
const roleOptions = [
  { value: "", label: "Tất cả vai trò" },
  { value: "user", label: "Customer" },
  { value: "admin", label: "Admin" },
];

// Danh sách option cho trạng thái
const statusOptions = [
  { value: "", label: "Tất cả trạng thái" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

export default function AccountsTab() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Quản lý tài khoản</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          + Thêm tài khoản
        </button>
      </div>

      {/* Tìm kiếm */}
      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Tìm kiếm tài khoản..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          {roleOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <AccountsTable />
    </div>
  );
}
