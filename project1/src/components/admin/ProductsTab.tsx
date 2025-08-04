'use client';

import React from 'react';
import { ReactNode } from 'react';
import Image from 'next/image';
import { IconButton } from '@/components/ui/icon-button';
import productsData from '../../../db.json';
import EditIcon from '@/assets/icons/EditIcon';
import ViewIcon from '@/assets/icons/ViewIcon';
import DeleteIcon from '@/assets/icons/DeleteIcon';

interface TableCellProps {
  children: ReactNode;
  className?: string;
}

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

  const TBHeader = ({ children, className = "" }: TableCellProps) => (
    <td
      className={`border border-gray-200 px-4 py-3 text-left font-semibold ${className}`}
    >
      {children}
    </td>
  );

  const TBDetail = ({ children, className = "" }: TableCellProps) => (
    <td
      className={`border border-gray-200 px-4 py-3 ${className}`}
    >
      {children}
    </td>
  );

  // Danh sách option cho trạng thái
const statusOptions = [
  { value: "", label: "Tất cả trạng thái" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

const stats = [
  { title: "Tổng sản phẩm", value: totalProducts, color: "purple" },
  { title: "Còn hàng", value: activeProducts, color: "green" },
  { title: "Hết hàng", value: outOfStock, color: "yellow" },
  { title: "Danh mục", value: categories, color: "blue" },
];

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
              <TBHeader>Hình ảnh</TBHeader>
              <TBHeader>Tên sản phẩm</TBHeader>
              <TBHeader>Danh mục</TBHeader>
              <TBHeader>Giá</TBHeader>
              <TBHeader>Tồn kho</TBHeader>
              <TBHeader>Trạng thái</TBHeader>
              <TBHeader>Ngày tạo</TBHeader>
              <TBHeader>Thao tác</TBHeader>
            </tr>
          </thead>
          <tbody>
            {mockProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td>{product.id}</td>
                <TBDetail>
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
                </TBDetail>
                <TBDetail className= "font-medium">{product.name}</TBDetail>
                <TBDetail>{product.category}</TBDetail>
                <TBDetail>
                  {product.oldPrice.toLocaleString('vi-VN')} VNĐ
                </TBDetail>
                <TBDetail>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    product.stock > 10 
                      ? 'bg-green-100 text-green-800' 
                      : product.stock > 0 
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.stock}
                  </span>
                </TBDetail>
                <TBDetail>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(product.status)}`}>
                    {getStatusText(product.status)}
                  </span>
                </TBDetail>
                <TBDetail>{product.createdAt}</TBDetail>
                <TBDetail>
                  <div className="flex gap-2">
                    <IconButton
                      icon={
                        <EditIcon className="w-6 h-6" />
                      }
                      onClick={() => console.log('Edit product:', product.id)}
                      tooltip="Sửa sản phẩm"
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                    />
                    <IconButton
                      icon={
                        <ViewIcon className="w-6 h-6" />
                      }
                      onClick={() => console.log('View product:', product.id)}
                      tooltip="Xem chi tiết"
                      variant="ghost"
                      size="sm"
                      className="text-green-600 hover:text-green-800 hover:bg-green-50"
                    />
                    <IconButton
                      icon={
                        <DeleteIcon className="w-6 h-6" />
                      }
                      onClick={() => console.log('Delete product:', product.id)}
                      tooltip="Xóa sản phẩm"
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-800 hover:bg-red-50"
                    />
                  </div>
                </TBDetail>
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
