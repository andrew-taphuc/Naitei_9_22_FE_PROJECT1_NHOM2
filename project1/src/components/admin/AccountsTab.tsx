"use client";

import React from "react";
import { ReactNode } from "react";
import { IconButton } from "@/components/ui/icon-button";
import EditIcon from '@/assets/icons/EditIcon';
import DeleteIcon from '@/assets/icons/DeleteIcon';
import usersData from "../../../db.json";

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
  interface TableCellProps {
    children: ReactNode;
    className?: string;
  }

  const TBHeader = ({ children, className = "" }: TableCellProps) => (
    <td className={`border border-gray-200 px-4 py-3 ${className}`}>
      {children}
    </td>
  );

  const TRow = ({ children, className = "" }: TableCellProps) => (
    <td className={`border border-gray-200 px-4 py-3 ${className}`}>
      {children}
    </td>
  );

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

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <TBHeader>ID</TBHeader>
              <TBHeader>Email</TBHeader>
              <TBHeader>Họ tên</TBHeader>
              <TBHeader>SĐT</TBHeader>
              <TBHeader>Vai trò</TBHeader>
              <TBHeader>Trạng thái</TBHeader>
              <TBHeader>Ngày tạo</TBHeader>
              <TBHeader>Thao tác</TBHeader>
            </tr>
          </thead>
          <tbody>
            {mockAccounts.map((account) => (
              <tr key={account.id} className="hover:bg-gray-50">
                <TRow>{account.id}</TRow>
                <TRow>{account.email}</TRow>
                <TRow>{account.fullName}</TRow>
                <TRow>{account.phone}</TRow>
                <TRow>
                  <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                    {account.role}
                  </span>
                </TRow>
                <TRow className="border border-gray-200 px-4 py-3">
                  <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                    {account.status}
                  </span>
                </TRow>
                <TRow className="border border-gray-200 px-4 py-3">
                  {account.createdAt}
                </TRow>
                <TRow className="border border-gray-200 px-4 py-3">
                  <div className="flex gap-2">
                    <IconButton
                      icon={<EditIcon className="w-6 h-6" />}
                      tooltip="Sửa tài khoản"
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                    />
                    <IconButton
                      icon={<DeleteIcon className="w-6 h-6" />}
                      tooltip="Xóa tài khoản"
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-800 hover:bg-red-50"
                    />
                  </div>
                </TRow>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-between items-center">
        <p className="text-gray-600">
          Hiển thị 1-{mockAccounts.length} của {mockAccounts.length} tài khoản
        </p>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
            Trước
          </button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded">
            1
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
            Sau
          </button>
        </div>
      </div>
    </div>
  );
}
