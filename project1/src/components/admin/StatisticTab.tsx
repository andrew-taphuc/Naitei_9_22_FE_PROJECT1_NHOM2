'use client';

import React from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import StatisticCard from './StatisticCard';
import dbData from '../../../db.json';
import MoneyIcon from '@/assets/icons/MoneyIcon';

interface OrderItem {
  id: string;
  quantity: number;
  variant: {
    price: number;
  };
}

const processOrderData = () => {
  const orderItems = dbData.products.slice(0, 10).map((product) => ({
    id: product.id,
    quantity: Math.floor(Math.random() * 5) + 1,
    variant: {
      price: product.oldPrice * (1 - product.discount / 100)
    }
  }));
  const products = dbData.products;
  
  // Tạo dữ liệu cho biểu đồ doanh thu theo sản phẩm

  interface ProductSale {
    name: string;
    revenue: number;
    quantity: number;
    price: number;
  }

  const productSales: ProductSale[] = orderItems.reduce<ProductSale[]>((acc: ProductSale[], item: OrderItem) => {
    const product = products.find((p: { id: string }) => p.id === item.id);
    if (product) {
      const totalRevenue = item.variant.price * item.quantity;
      const existingProduct = acc.find((p: ProductSale) => p.name === product.name);

      if (existingProduct) {
        existingProduct.revenue += totalRevenue;
        existingProduct.quantity += item.quantity;
      } else {
        acc.push({
          name: product.name,
          revenue: totalRevenue,
          quantity: item.quantity,
          price: item.variant.price
        });
      }
    }
    return acc;
  }, []);

  // Tạo dữ liệu cho biểu đồ doanh thu theo tháng (giả lập)
  const monthlyRevenue = [
    { month: 'T1', revenue: 15000000, orders: 45 },
    { month: 'T2', revenue: 18000000, orders: 52 },
    { month: 'T3', revenue: 22000000, orders: 68 },
    { month: 'T4', revenue: 19000000, orders: 55 },
    { month: 'T5', revenue: 25000000, orders: 78 },
    { month: 'T6', revenue: 28000000, orders: 85 },
    { month: 'T7', revenue: 32000000, orders: 92 },
    { month: 'T8', revenue: 35000000, orders: 98 },
    { month: 'T9', revenue: 38000000, orders: 105 },
    { month: 'T10', revenue: 42000000, orders: 115 },
    { month: 'T11', revenue: 45000000, orders: 125 },
    { month: 'T12', revenue: 50000000, orders: 135 }
  ];

  // Tạo dữ liệu cho pie chart
  interface CategoryDistribution {
    name: string;
    value: number;
  }

  const categoryDistribution = products.reduce<CategoryDistribution[]>((acc: CategoryDistribution[], product: { category: string }) => {
    const existingCategory = acc.find((c: CategoryDistribution) => c.name === product.category);
    if (existingCategory) {
      existingCategory.value += 1;
    } else {
      acc.push({
        name: product.category,
        value: 1
      });
    }
    return acc;
  }, []);

  // Tính tổng doanh thu
  const totalRevenue = orderItems.reduce((sum: number, item: OrderItem) => {
    return sum + (item.variant.price * item.quantity);
  }, 0);

  // Tính tổng số đơn hàng
  const totalOrders = orderItems.length;

  // Tính trung bình giá trị đơn hàng
  const averageOrderValue = totalRevenue / totalOrders;

  // Tính tổng số sản phẩm đã bán
  const totalProductsSold = orderItems.reduce((sum: number, item: OrderItem) => {
    return sum + item.quantity;
  }, 0);

  return {
    productSales: productSales
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10),
    monthlyRevenue,
    categoryDistribution,
    totalRevenue,
    totalOrders,
    averageOrderValue,
    totalProductsSold
  };
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

export default function StatisticTab() {
  const data = processOrderData();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Thống kê bán hàng
        </h1>
        <div className="text-sm text-gray-500">
          Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}
        </div>
      </div>

      {/* Thẻ thống kê */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatisticCard
          title="Tổng doanh thu"
          value={`${data.totalRevenue.toLocaleString('vi-VN')} VNĐ`}
          color="blue"
          icon={<MoneyIcon className="w-8 h-8" />}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatisticCard
          title="Tổng đơn hàng"
          value={data.totalOrders}
          color="green"
          icon={
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
          trend={{ value: 8.2, isPositive: true }}
        />
        <StatisticCard
          title="Giá trị TB/đơn"
          value={`${Math.round(data.averageOrderValue).toLocaleString('vi-VN')} VNĐ`}
          color="purple"
          icon={
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          }
          trend={{ value: 5.3, isPositive: true }}
        />
        <StatisticCard
          title="Sản phẩm đã bán"
          value={data.totalProductsSold}
          color="orange"
          icon={
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          }
          trend={{ value: 15.7, isPositive: true }}
        />
      </div>

      {/* Các biểu đồ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

        {/* Doanh thu theo tháng */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Doanh thu theo tháng</h3>
          <ResponsiveContainer width={"100%"} height={300} >
            <AreaChart data={data.monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#8884d8" 
                fill="#8884d8" 
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Phân bố danh mục */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Phân bố danh mục sản phẩm</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.categoryDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.categoryDistribution.map((entry, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Biểu đồ đường - Đơn hàng theo tháng */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Số lượng đơn hàng theo tháng</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.monthlyRevenue}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="orders" 
              stroke="#82ca9d" 
              strokeWidth={2}
              name="Số đơn hàng"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 
