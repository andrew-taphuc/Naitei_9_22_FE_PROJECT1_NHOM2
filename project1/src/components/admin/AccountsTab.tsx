'use client';

import React from 'react';
import { IconButton } from '@/components/ui/icon-button';
import usersData from '../../../db.json';

// Thêm các trường bổ sung
const mockAccounts = usersData.users.map((user) => ({
  ...user,
  status: 'active',
  role: 'user',
  createdAt: '2025-27-07'
}));

export default function AccountsTab() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Quản lý tài khoản
        </h1>
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
          <option value="">Tất cả vai trò</option>
          <option value="user">Customer</option>
          <option value="admin">Admin</option>
        </select>
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Tất cả trạng thái</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 px-4 py-3 text-left font-semibold">ID</th>
              <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Email</th>
              <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Họ tên</th>
              <th className="border border-gray-200 px-4 py-3 text-left font-semibold">SĐT</th>
              <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Vai trò</th>
              <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Trạng thái</th>
              <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Ngày tạo</th>
              <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {mockAccounts.map((account) => (
              <tr key={account.id} className="hover:bg-gray-50">
                <td className="border border-gray-200 px-4 py-3">{account.id}</td>
                <td className="border border-gray-200 px-4 py-3">{account.email}</td>
                <td className="border border-gray-200 px-4 py-3">{account.fullName}</td>
                <td className="border border-gray-200 px-4 py-3">{account.phone}</td>
                <td className="border border-gray-200 px-4 py-3">
                  <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                    {account.role}
                  </span>
                </td>
                <td className="border border-gray-200 px-4 py-3">
                  <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                    {account.status}
                  </span>
                </td>
                <td className="border border-gray-200 px-4 py-3">{account.createdAt}</td>
                <td className="border border-gray-200 px-4 py-3">
                  <div className="flex gap-2">
                    <IconButton
                      icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      }
                      onClick={() => console.log('Edit account:', account.id)}
                      tooltip="Sửa tài khoản"
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                    />
                    <IconButton
                      icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      }
                      onClick={() => console.log('Delete account:', account.id)}
                      tooltip="Xóa tài khoản"
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-800 hover:bg-red-50"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-between items-center">
        <p className="text-gray-600">Hiển thị 1-{mockAccounts.length} của {mockAccounts.length} tài khoản</p>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">Trước</button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">Sau</button>
        </div>
      </div>
    </div>
  );
} 