'use client';

import React, { useState } from 'react';
import AccountsTab from '@/components/admin/AccountsTab';
import OrdersTab from '@/components/admin/OrdersTab';
import ProductsTab from '@/components/admin/ProductsTab';
import StatisticTab from '@/components/admin/StatisticTab';

interface Tab {
  id: 'statistics' | 'accounts' | 'orders' | 'products';
  name: string;
  icon: React.ReactNode;
  color: string;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('statistics');

  const tabs: Tab[] = [
    {
      id: 'statistics',
      name: 'Thống kê',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      color: 'orange'
    },
    {
      id: 'accounts',
      name: 'Quản lý tài khoản',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      ),
      color: 'blue'
    },
    {
      id: 'orders',
      name: 'Quản lý đơn hàng',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: 'green'
    },
    {
      id: 'products',
      name: 'Quản lý sản phẩm',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      color: 'purple'
    }
  ];

  const getTabContent = () => {
    switch (activeTab) {
      case 'statistics':
        return <StatisticTab />;
      case 'accounts':
        return <AccountsTab />;
      case 'orders':
        return <OrdersTab />;
      case 'products':
        return <ProductsTab />;
      default:
        return <StatisticTab />;
    }
  };

  const getTabClasses = (tab: Tab) => {
    const isActive = activeTab === tab.id;
    const baseClasses = "flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors cursor-pointer";
    
    if (isActive) {
      return `${baseClasses} bg-${tab.color}-100 text-${tab.color}-700 border border-${tab.color}-200`;
    }
    
    return `${baseClasses} text-gray-600 hover:text-${tab.color}-700 hover:bg-${tab.color}-50`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Trang Quản Trị
          </h1>
          <p className="text-gray-600">
            Thống kê, quản lý tài khoản, đơn hàng và sản phẩm của hệ thống
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex space-x-1 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={getTabClasses(tab)}
              >
                {tab.icon}
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-md">
          {getTabContent()}
        </div>
      </div>
    </div>
  );
} 
