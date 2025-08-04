"use client";

import React from "react";
import { ReactNode } from "react";
import { IconButton } from "@/components/ui/icon-button";
import dbData from "../../../db.json";
import ViewIcon from "@/assets/icons/ViewIcon";
import UpdateIcon from "@/assets/icons/UpdateIcon";
import CancelIcon from "@/assets/icons/CancelIcon";

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

// Gán màu cho trạng thái đơn hàng
const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "completed":
      return "bg-green-100 text-green-800";
    case "shipped":
      return "bg-blue-100 text-blue-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Tên hiển thị trạng thái
const getStatusText = (status: string) => {
  switch (status) {
    case "pending":
      return "Chờ xử lý";
    case "completed":
      return "Hoàn thành";
    case "shipped":
      return "Đã giao hàng";
    case "cancelled":
      return "Đã hủy";
    default:
      return status;
  }
};

export default function OrdersTab() {
  const totalOrders = mockOrders.length;
  const pendingOrders = mockOrders.filter((o) => o.status === "pending").length;
  const completedOrders = mockOrders.filter(
    (o) => o.status === "completed"
  ).length;
  const shippedOrders = mockOrders.filter((o) => o.status === "shipped").length;

  interface TableCellProps {
    children: ReactNode;
    className?: string;
  }

  const TableCell = ({ children, className = "" }: TableCellProps) => (
    <td className={`border border-gray-200 px-4 py-3 ${className}`}>
      {children}
    </td>
  );

  const TBHeader = ({ children, className = "" }: TableCellProps) => (
    <td
      className={`border border-gray-200 px-4 py-3 text-left font-semibold ${className}`}
    >
      {children}
    </td>
  );

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

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <TBHeader>Mã đơn hàng</TBHeader>
              <TBHeader>Khách hàng</TBHeader>
              <TBHeader>Email</TBHeader>
              <TBHeader>Sản phẩm</TBHeader>
              <TBHeader>Số lượng</TBHeader>
              <TBHeader>Tổng tiền</TBHeader>
              <TBHeader>Trạng thái</TBHeader>
              <TBHeader>Ngày đặt</TBHeader>
              <TBHeader>Thao tác</TBHeader>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.customerEmail}</TableCell>
                <TableCell>{order.productName}</TableCell>
                <TableCell>{order.items} sản phẩm</TableCell>
                <TableCell>
                  {order.totalAmount.toLocaleString("vi-VN")} VNĐ
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {getStatusText(order.status)}
                  </span>
                </TableCell>
                <TableCell>{order.orderDate}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <IconButton
                      icon={<ViewIcon className="w-6 h-6" />}
                      onClick={() => console.log("View order:", order.id)}
                      tooltip="Xem chi tiết"
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                    />
                    <IconButton
                      icon={<UpdateIcon className="w-6 h-6" />}
                      onClick={() => console.log("Update order:", order.id)}
                      tooltip="Cập nhật trạng thái"
                      variant="ghost"
                      size="sm"
                      className="text-green-600 hover:text-green-800 hover:bg-green-50"
                    />
                    <IconButton
                      icon={<CancelIcon className="w-6 h-6" />}
                      onClick={() => console.log("Cancel order:", order.id)}
                      tooltip="Hủy đơn hàng"
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-800 hover:bg-red-50"
                    />
                  </div>
                </TableCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-between items-center">
        <p className="text-gray-600">
          Hiển thị 1-{mockOrders.length} của {mockOrders.length} đơn hàng
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
