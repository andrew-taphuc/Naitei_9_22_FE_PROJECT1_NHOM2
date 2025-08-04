'use client';

import React from 'react';
import { IconButton } from '@/components/ui/icon-button';
import dbData from '../../../db.json';

// Generate dữ liệu test
const mockOrders = dbData.users.slice(0, 4).map((user, index) => {
  const randomProduct = dbData.products[Math.floor(Math.random() * dbData.products.length)];
  const statuses = ['pending', 'completed', 'shipped', 'cancelled'];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  const randomItems = Math.floor(Math.random() * 5) + 1;
  const randomAmount = randomProduct.oldPrice * randomItems;
  
  return {
    id: `ORD${String(index + 1).padStart(3, '0')}`,
    customerName: user.fullName,
    customerEmail: user.email,
    totalAmount: randomAmount,
    status: randomStatus,
    orderDate: '2025-02-02',
    items: randomItems,
    productName: randomProduct.name
  };
});

// Gán màu cho trạng thái đơn hàng
const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'shipped':
      return 'bg-blue-100 text-blue-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Tên hiển thị trạng thái
const getStatusText = (status: string) => {
  switch (status) {
    case 'pending':
      return 'Chờ xử lý';
    case 'completed':
      return 'Hoàn thành';
    case 'shipped':
      return 'Đã giao hàng';
    case 'cancelled':
      return 'Đã hủy';
    default:
      return status;
  }
};

export default function OrdersTab() {
  const totalOrders = mockOrders.length;
  const pendingOrders = mockOrders.filter(o => o.status === 'pending').length;
  const completedOrders = mockOrders.filter(o => o.status === 'completed').length;
  const shippedOrders = mockOrders.filter(o => o.status === 'shipped').length;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Quản lý đơn hàng
        </h1>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          + Tạo đơn hàng mới
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900">Tổng đơn hàng</h3>
          <p className="text-2xl font-bold text-blue-600">{totalOrders}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <h3 className="text-lg font-semibold text-yellow-900">Chờ xử lý</h3>
          <p className="text-2xl font-bold text-yellow-600">{pendingOrders}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h3 className="text-lg font-semibold text-green-900">Hoàn thành</h3>
          <p className="text-2xl font-bold text-green-600">{completedOrders}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <h3 className="text-lg font-semibold text-purple-900">Đã giao</h3>
          <p className="text-2xl font-bold text-purple-600">{shippedOrders}</p>
        </div>
      </div>

      {/* Tìm kiếm */}
      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Tìm kiếm đơn hàng..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Tất cả trạng thái</option>
          <option value="pending">Chờ xử lý</option>
          <option value="completed">Hoàn thành</option>
          <option value="shipped">Đã giao hàng</option>
          <option value="cancelled">Đã hủy</option>
        </select>
        <input
          type="date"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Mã đơn hàng</th>
              <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Khách hàng</th>
              <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Email</th>
              <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Sản phẩm</th>
              <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Số lượng</th>
              <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Tổng tiền</th>
              <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Trạng thái</th>
              <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Ngày đặt</th>
              <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="border border-gray-200 px-4 py-3 font-medium">{order.id}</td>
                <td className="border border-gray-200 px-4 py-3">{order.customerName}</td>
                <td className="border border-gray-200 px-4 py-3">{order.customerEmail}</td>
                <td className="border border-gray-200 px-4 py-3">{order.productName}</td>
                <td className="border border-gray-200 px-4 py-3">{order.items} sản phẩm</td>
                <td className="border border-gray-200 px-4 py-3">
                  {order.totalAmount.toLocaleString('vi-VN')} VNĐ
                </td>
                <td className="border border-gray-200 px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                </td>
                <td className="border border-gray-200 px-4 py-3">{order.orderDate}</td>
                <td className="border border-gray-200 px-4 py-3">
                  <div className="flex gap-2">
                    <IconButton
                      icon={
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      }
                      onClick={() => console.log('View order:', order.id)}
                      tooltip="Xem chi tiết"
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                    />
                    <IconButton
                      icon={
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      }
                      onClick={() => console.log('Update order:', order.id)}
                      tooltip="Cập nhật trạng thái"
                      variant="ghost"
                      size="sm"
                      className="text-green-600 hover:text-green-800 hover:bg-green-50"
                    />
                    <IconButton
                      icon={
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      }
                      onClick={() => console.log('Cancel order:', order.id)}
                      tooltip="Hủy đơn hàng"
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
        <p className="text-gray-600">Hiển thị 1-{mockOrders.length} của {mockOrders.length} đơn hàng</p>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">Trước</button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">Sau</button>
        </div>
      </div>
    </div>
  );
} 