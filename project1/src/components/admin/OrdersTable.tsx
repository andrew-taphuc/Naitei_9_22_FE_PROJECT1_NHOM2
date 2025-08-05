"use client";

import React, { useState } from "react";
import { IconButton } from "@/components/ui/icon-button";
import dbData from "../../../db.json";
import { ViewIcon, UpdateIcon, CancelIcon } from "@/assets/icons";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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

export default function OrdersTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(mockOrders.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Tính toán dữ liệu cho trang hiện tại
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, mockOrders.length);
  const currentOrders = mockOrders.slice(startIndex, endIndex);

  return (
    <div>
      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="min-w-[100px]">Mã đơn hàng</TableHead>
              <TableHead>Khách hàng</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Sản phẩm</TableHead>
              <TableHead>Số lượng</TableHead>
              <TableHead>Tổng tiền</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Ngày đặt</TableHead>
              <TableHead>Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentOrders.map((order) => (
              <TableRow key={order.id} className="hover:bg-gray-50">
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
                      icon={<ViewIcon className="w-5 h-5" />}
                      onClick={() => console.log("View order:", order.id)}
                      tooltip="Xem chi tiết"
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                    />
                    <IconButton
                      icon={<UpdateIcon className="w-5 h-5" />}
                      onClick={() => console.log("Update order:", order.id)}
                      tooltip="Cập nhật trạng thái"
                      variant="ghost"
                      size="sm"
                      className="text-green-600 hover:text-green-800 hover:bg-green-50"
                    />
                    <IconButton
                      icon={<CancelIcon className="w-5 h-5" />}
                      onClick={() => console.log("Cancel order:", order.id)}
                      tooltip="Hủy đơn hàng"
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-800 hover:bg-red-50"
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-between items-center">
        <p className="text-gray-600">
          Hiển thị {startIndex + 1}-{endIndex} của {mockOrders.length} đơn hàng
        </p>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => handlePageChange(page)}
                  isActive={currentPage === page}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  handlePageChange(Math.min(totalPages, currentPage + 1))
                }
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
