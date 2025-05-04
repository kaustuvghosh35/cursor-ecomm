import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Dashboard Cards -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-indigo-100 text-indigo-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-gray-500 text-sm">Total Orders</p>
              <h3 class="text-2xl font-semibold text-gray-900">128</h3>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-green-100 text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-gray-500 text-sm">Total Revenue</p>
              <h3 class="text-2xl font-semibold text-gray-900">$12,480</h3>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-gray-500 text-sm">Total Products</p>
              <h3 class="text-2xl font-semibold text-gray-900">56</h3>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-red-100 text-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-gray-500 text-sm">Total Users</p>
              <h3 class="text-2xl font-semibold text-gray-900">243</h3>
            </div>
          </div>
        </div>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Recent Orders -->
        <div class="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-semibold">Recent Orders</h2>
            <a routerLink="/admin/orders" class="text-indigo-600 hover:text-indigo-800">View All</a>
          </div>
          
          <div class="overflow-x-auto">
            <table class="min-w-full table-auto">
              <thead>
                <tr class="bg-gray-50">
                  <th class="py-3 px-4 text-left text-gray-500 font-medium">Order ID</th>
                  <th class="py-3 px-4 text-left text-gray-500 font-medium">Customer</th>
                  <th class="py-3 px-4 text-left text-gray-500 font-medium">Date</th>
                  <th class="py-3 px-4 text-left text-gray-500 font-medium">Status</th>
                  <th class="py-3 px-4 text-right text-gray-500 font-medium">Amount</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr>
                  <td class="py-3 px-4">#ORD-171</td>
                  <td class="py-3 px-4">John Doe</td>
                  <td class="py-3 px-4">Jul 23, 2023</td>
                  <td class="py-3 px-4"><span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Completed</span></td>
                  <td class="py-3 px-4 text-right">$128.00</td>
                </tr>
                <tr>
                  <td class="py-3 px-4">#ORD-170</td>
                  <td class="py-3 px-4">Jane Smith</td>
                  <td class="py-3 px-4">Jul 22, 2023</td>
                  <td class="py-3 px-4"><span class="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Processing</span></td>
                  <td class="py-3 px-4 text-right">$89.50</td>
                </tr>
                <tr>
                  <td class="py-3 px-4">#ORD-169</td>
                  <td class="py-3 px-4">Michael Brown</td>
                  <td class="py-3 px-4">Jul 21, 2023</td>
                  <td class="py-3 px-4"><span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Completed</span></td>
                  <td class="py-3 px-4 text-right">$212.30</td>
                </tr>
                <tr>
                  <td class="py-3 px-4">#ORD-168</td>
                  <td class="py-3 px-4">Robert Johnson</td>
                  <td class="py-3 px-4">Jul 20, 2023</td>
                  <td class="py-3 px-4"><span class="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Cancelled</span></td>
                  <td class="py-3 px-4 text-right">$45.99</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <!-- Quick Links -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold mb-6">Quick Links</h2>
          
          <div class="space-y-4">
            <a routerLink="/admin/products" class="block p-4 bg-gray-50 hover:bg-gray-100 rounded-md transition">
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Add New Product</span>
              </div>
            </a>
            
            <a routerLink="/admin/orders" class="block p-4 bg-gray-50 hover:bg-gray-100 rounded-md transition">
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span>View Pending Orders</span>
              </div>
            </a>
            
            <a routerLink="/admin/users" class="block p-4 bg-gray-50 hover:bg-gray-100 rounded-md transition">
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Manage Users</span>
              </div>
            </a>
            
            <a href="#" class="block p-4 bg-gray-50 hover:bg-gray-100 rounded-md transition">
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
                <span>View Sales Reports</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class DashboardComponent { } 