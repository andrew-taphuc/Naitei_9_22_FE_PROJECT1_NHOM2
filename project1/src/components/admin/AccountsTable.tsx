"use client";

import React, { useState } from "react";
import { IconButton } from "@/components/ui/icon-button";
import { EditIcon, DeleteIcon } from "@/assets/icons";
import usersData from "../../../db.json";
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

// Thêm các trường bổ sung
const mockAccounts = usersData.users.map((user) => ({
  ...user,
  status: "active",
  role: "user",
  createdAt: "2025-27-07",
}));

export default function AccountsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(mockAccounts.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Tính toán dữ liệu cho trang hiện tại
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, mockAccounts.length);
  const currentAccounts = mockAccounts.slice(startIndex, endIndex);

  return (
    <div>
      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="min-w-[60px]">ID</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Họ tên</TableHead>
              <TableHead>SĐT</TableHead>
              <TableHead>Vai trò</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Ngày tạo</TableHead>
              <TableHead>Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentAccounts.map((account) => (
              <TableRow key={account.id} className="hover:bg-gray-50">
                <TableCell>{account.id}</TableCell>
                <TableCell>{account.email}</TableCell>
                <TableCell>{account.fullName}</TableCell>
                <TableCell>{account.phone}</TableCell>
                <TableCell>
                  <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                    {account.role}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                    {account.status}
                  </span>
                </TableCell>
                <TableCell>{account.createdAt}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <IconButton
                      icon={<EditIcon className="w-5 h-5" />}
                      tooltip="Sửa tài khoản"
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                    />
                    <IconButton
                      icon={<DeleteIcon className="w-5 h-5" />}
                      tooltip="Xóa tài khoản"
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
          Hiển thị {startIndex + 1}-{endIndex} của {mockAccounts.length} tài
          khoản
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
