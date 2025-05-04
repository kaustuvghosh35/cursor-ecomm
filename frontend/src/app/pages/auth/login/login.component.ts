import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="container mx-auto px-4 py-16 max-w-md">
      <div class="bg-white rounded-lg shadow-lg p-8">
        <h1 class="text-2xl font-bold mb-6 text-center">Login to Your Account</h1>
        
        <form (ngSubmit)="login()" #loginForm="ngForm">
          <div class="mb-4">
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
          
          <div class="mb-6">
            <label for="password" class="block text-gray-700 mb-2">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password"
              [(ngModel)]="password"
              required
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Your password"
            >
          </div>
          
          <button 
            type="submit" 
            class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
            [disabled]="!loginForm.valid"
            [class.opacity-50]="!loginForm.valid"
          >
            Login
          </button>
        </form>
        
        <div class="mt-4 text-center">
          <a routerLink="/auth/forgot-password" class="text-sm text-indigo-600 hover:text-indigo-800">
            Forgot your password?
          </a>
        </div>
        
        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
          
          <div class="mt-6">
            <button 
              type="button" 
              class="w-full flex justify-center items-center bg-white border border-gray-300 rounded-md py-2 px-4 hover:bg-gray-50 transition"
              (click)="loginWithGoogle()"
            >
              <img src="assets/google-logo.png" alt="Google" class="h-5 w-5 mr-2">
              Google
            </button>
          </div>
        </div>
        
        <div class="mt-6 text-center">
          <p class="text-gray-600">
            Don't have an account? 
            <a routerLink="/auth/register" class="text-indigo-600 hover:text-indigo-800 font-medium">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  
  login() {
    console.log('Login attempt with:', this.email);
    // To be implemented with AuthService
  }
  
  loginWithGoogle() {
    console.log('Login with Google');
    // To be implemented with AuthService
  }
} 