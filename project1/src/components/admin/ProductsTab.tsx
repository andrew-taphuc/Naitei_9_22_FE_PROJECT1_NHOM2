'use client';

import React from 'react';
import Image from 'next/image';
import { IconButton } from '@/components/ui/icon-button';
import productsData from '../../../db.json';

const mockProducts = productsData.products.map((product) => ({
  ...product,
  stock: 50,
  status: product.inStock ? 'active' : 'inactive',
  createdAt: '2025-01-01'
}));

const getStatusColor = (status: string) => {
  return status === 'active' 
    ? 'bg-green-100 text-green-800' 
    : 'bg-red-100 text-red-800';
};

const getStatusText = (status: string) => {
  return status === 'active' ? 'Còn hàng' : 'Hết hàng';
};

export default function ProductsTab() {
  const totalProducts = mockProducts.length;
  const activeProducts = mockProducts.filter(p => p.status === 'active').length;
  const outOfStock = mockProducts.filter(p => p.stock === 0).length;
  const categories = [...new Set(mockProducts.map(p => p.category))].length;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Quản lý sản phẩm
        </h1>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
          + Thêm sản phẩm mới
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <h3 className="text-lg font-semibold text-purple-900">Tổng sản phẩm</h3>
          <p className="text-2xl font-bold text-purple-600">{totalProducts}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h3 className="text-lg font-semibold text-green-900">Còn hàng</h3>
          <p className="text-2xl font-bold text-green-600">{activeProducts}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <h3 className="text-lg font-semibold text-yellow-900">Hết hàng</h3>
          <p className="text-2xl font-bold text-yellow-600">{outOfStock}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900">Danh mục</h3>
          <p className="text-2xl font-bold text-blue-600">{categories}</p>
        </div>
      </div>

      {/* Tìm kiếm */}
      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Tất cả danh mục</option>
          {[...new Set(mockProducts.map(p => p.category))].map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Tất cả trạng thái</option>
          <option value="active">Hoạt động</option>
          <option value="inactive">Không hoạt động</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 px-4 py-3 text-left font-semibold">ID</th>
              <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Hình ảnh</th>
              <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Tên sản phẩm</th>
              <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Danh mục</th>
              <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Giá</th>
              <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Tồn kho</th>
              <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Trạng thái</th>
              <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Ngày tạo</th>
              <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {mockProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="border border-gray-200 px-4 py-3">{product.id}</td>
                <td className="border border-gray-200 px-4 py-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                      <Image 
                        src={product.images[0]} 
                        alt={product.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    <span className={`text-gray-500 text-xs ${product.images && product.images[0] ? 'hidden' : 'flex'}`}>IMG</span>
                  </div>
                </td>
                <td className="border border-gray-200 px-4 py-3 font-medium">{product.name}</td>
                <td className="border border-gray-200 px-4 py-3">{product.category}</td>
                <td className="border border-gray-200 px-4 py-3">
                  {product.oldPrice.toLocaleString('vi-VN')} VNĐ
                </td>
                <td className="border border-gray-200 px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    product.stock > 10 
                      ? 'bg-green-100 text-green-800' 
                      : product.stock > 0 
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.stock}
                  </span>
                </td>
                <td className="border border-gray-200 px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(product.status)}`}>
                    {getStatusText(product.status)}
                  </span>
                </td>
                <td className="border border-gray-200 px-4 py-3">{product.createdAt}</td>
                <td className="border border-gray-200 px-4 py-3">
                  <div className="flex gap-2">
                    <IconButton
                      icon={
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      }
                      onClick={() => console.log('Edit product:', product.id)}
                      tooltip="Sửa sản phẩm"
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                    />
                    <IconButton
                      icon={
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      }
                      onClick={() => console.log('View product:', product.id)}
                      tooltip="Xem chi tiết"
                      variant="ghost"
                      size="sm"
                      className="text-green-600 hover:text-green-800 hover:bg-green-50"
                    />
                    <IconButton
                      icon={
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      }
                      onClick={() => console.log('Delete product:', product.id)}
                      tooltip="Xóa sản phẩm"
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
        <p className="text-gray-600">Hiển thị 1-{mockProducts.length} của {mockProducts.length} sản phẩm</p>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">Trước</button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">Sau</button>
        </div>
      </div>
    </div>
  );
} 