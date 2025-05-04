import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="container mx-auto px-4 py-16 max-w-md">
      <div class="bg-white rounded-lg shadow-lg p-8">
        <h1 class="text-2xl font-bold mb-6 text-center">Create an Account</h1>
        
        <form (ngSubmit)="register()" #registerForm="ngForm">
          <div class="mb-4">
            <label for="name" class="block text-gray-700 mb-2">Full Name</label>
            <input 
              type="text" 
              id="name" 
              name="name"
              [(ngModel)]="name"
              required
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Your name"
            >
          </div>
          
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
          
          <div class="mb-4">
            <label for="password" class="block text-gray-700 mb-2">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password"
              [(ngModel)]="password"
              required
              minlength="6"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Choose a password"
            >
          </div>
          
          <div class="mb-6">
            <label for="confirmPassword" class="block text-gray-700 mb-2">Confirm Password</label>
            <input 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword"
              [(ngModel)]="confirmPassword"
              required
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Confirm password"
            >
          </div>
          
          <button 
            type="submit" 
            class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
            [disabled]="!registerForm.valid || password !== confirmPassword"
            [class.opacity-50]="!registerForm.valid || password !== confirmPassword"
          >
            Create Account
          </button>
        </form>
        
        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">Or register with</span>
            </div>
          </div>
          
          <div class="mt-6">
            <button 
              type="button" 
              class="w-full flex justify-center items-center bg-white border border-gray-300 rounded-md py-2 px-4 hover:bg-gray-50 transition"
              (click)="registerWithGoogle()"
            >
              <img src="assets/google-logo.png" alt="Google" class="h-5 w-5 mr-2">
              Google
            </button>
          </div>
        </div>
        
        <div class="mt-6 text-center">
          <p class="text-gray-600">
            Already have an account? 
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
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  
  register() {
    if (this.password !== this.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }
    
    console.log('Register attempt with:', this.name, this.email);
    // To be implemented with AuthService
  }
  
  registerWithGoogle() {
    console.log('Register with Google');
    // To be implemented with AuthService
  }
} 