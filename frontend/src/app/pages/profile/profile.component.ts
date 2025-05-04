import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">My Account</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Sidebar -->
        <div class="bg-white rounded-lg shadow-md p-6 h-fit">
          <div class="space-y-2">
            <a 
              routerLink="/profile" 
              routerLinkActive="text-indigo-600 font-semibold" 
              [routerLinkActiveOptions]="{exact: true}"
              class="block py-2 px-3 hover:bg-gray-50 rounded-md transition"
            >
              My Profile
            </a>
            <a 
              routerLink="/profile/orders" 
              routerLinkActive="text-indigo-600 font-semibold"
              class="block py-2 px-3 hover:bg-gray-50 rounded-md transition"
            >
              My Orders
            </a>
            <a 
              routerLink="/profile/wishlist" 
              routerLinkActive="text-indigo-600 font-semibold"
              class="block py-2 px-3 hover:bg-gray-50 rounded-md transition"
            >
              My Wishlist
            </a>
            <div class="border-t border-gray-200 my-2"></div>
            <button 
              class="block w-full text-left py-2 px-3 hover:bg-gray-50 rounded-md text-red-600 transition"
              (click)="logout()"
            >
              Logout
            </button>
          </div>
        </div>
        
        <!-- Main Content -->
        <div class="md:col-span-3">
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-semibold mb-6">Personal Information</h2>
            
            <form (ngSubmit)="updateProfile()" #profileForm="ngForm">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label for="name" class="block text-gray-700 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    [(ngModel)]="user.name"
                    required
                    class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                </div>
                
                <div>
                  <label for="email" class="block text-gray-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    [(ngModel)]="user.email"
                    required
                    class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    readonly
                  >
                </div>
                
                <div>
                  <label for="phone" class="block text-gray-700 mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone"
                    [(ngModel)]="user.phone"
                    class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                </div>
              </div>
              
              <h3 class="text-lg font-semibold mb-4">Change Password</h3>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label for="currentPassword" class="block text-gray-700 mb-2">Current Password</label>
                  <input 
                    type="password" 
                    id="currentPassword" 
                    name="currentPassword"
                    [(ngModel)]="passwords.current"
                    class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                </div>
                
                <div>
                  <label for="newPassword" class="block text-gray-700 mb-2">New Password</label>
                  <input 
                    type="password" 
                    id="newPassword" 
                    name="newPassword"
                    [(ngModel)]="passwords.new"
                    class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                </div>
                
                <div>
                  <label for="confirmPassword" class="block text-gray-700 mb-2">Confirm Password</label>
                  <input 
                    type="password" 
                    id="confirmPassword" 
                    name="confirmPassword"
                    [(ngModel)]="passwords.confirm"
                    class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                </div>
              </div>
              
              <div class="flex justify-end">
                <button 
                  type="submit" 
                  class="bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 transition"
                  [disabled]="!profileForm.valid"
                  [class.opacity-50]="!profileForm.valid"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ProfileComponent {
  user = {
    name: 'John Doe',
    email: 'john.doe&#64;example.com',
    phone: '(123) 456-7890'
  };
  
  passwords = {
    current: '',
    new: '',
    confirm: ''
  };
  
  updateProfile() {
    console.log('Profile update:', this.user);
    // To be implemented with UserService
    
    if (this.passwords.new && this.passwords.current) {
      if (this.passwords.new !== this.passwords.confirm) {
        console.error('New passwords do not match');
        return;
      }
      
      console.log('Password change requested');
      // To be implemented with AuthService
    }
  }
  
  logout() {
    console.log('Logout requested');
    // To be implemented with AuthService
  }
} 