import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="container mx-auto px-4 py-16 max-w-md">
      <div class="bg-white rounded-lg shadow-lg p-8">
        <h1 class="text-2xl font-bold mb-6 text-center">Reset Your Password</h1>
        
        <p class="text-gray-600 mb-6 text-center">
          Enter your email address and we'll send you a link to reset your password.
        </p>
        
        <form (ngSubmit)="resetPassword()" #resetForm="ngForm">
          <div class="mb-6">
            <label for="email" class="block text-gray-700 mb-2">Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              [(ngModel)]="email"
              required
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="your&#64;email.com"
            >
          </div>
          
          <button 
            type="submit" 
            class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
            [disabled]="!resetForm.valid"
            [class.opacity-50]="!resetForm.valid"
          >
            Send Reset Link
          </button>
        </form>
        
        <div class="mt-6 text-center">
          <p class="text-gray-600">
            Remember your password? 
            <a routerLink="/auth/login" class="text-indigo-600 hover:text-indigo-800 font-medium">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ForgotPasswordComponent {
  email: string = '';
  
  resetPassword() {
    console.log('Password reset requested for:', this.email);
    // To be implemented with AuthService
  }
} 