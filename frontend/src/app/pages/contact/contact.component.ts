import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mx-auto px-4 py-12 max-w-5xl">
      <h1 class="text-4xl font-bold mb-8 text-emerald-700">Contact Us</h1>
      
      <div class="bg-white rounded-xl shadow-md overflow-hidden mb-10">
        <div class="md:flex">
          <div class="md:w-1/2 p-8">
            <h2 class="text-2xl font-bold mb-6">Get in Touch</h2>
            <p class="text-slate-700 mb-6">
              We'd love to hear from you! Whether you have a question about our products, 
              need help with an order, or want to share your feedback, our team is here to assist you.
            </p>
            
            <div class="mb-6">
              <h3 class="font-semibold text-lg mb-2">Customer Support</h3>
              <div class="flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-700 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:support&#64;shopnest.com" class="text-emerald-700 hover:text-emerald-900">support&#64;shopnest.com</a>
              </div>
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-700 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>1-800-SHOPNEST (1-800-746-7637)</span>
              </div>
            </div>
            
            <div>
              <h3 class="font-semibold text-lg mb-2">Headquarters</h3>
              <address class="not-italic text-slate-700">
                123 Commerce Street<br>
                Suite 500<br>
                New York, NY 10001<br>
                United States
              </address>
            </div>
          </div>
          
          <div class="md:w-1/2 p-8 bg-emerald-50">
            <h2 class="text-2xl font-bold mb-6">Send Us a Message</h2>
            <form>
              <div class="mb-4">
                <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" id="name" name="name" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500">
              </div>
              
              <div class="mb-4">
                <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" id="email" name="email" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500">
              </div>
              
              <div class="mb-4">
                <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input type="text" id="subject" name="subject" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500">
              </div>
              
              <div class="mb-6">
                <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea id="message" name="message" rows="4" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"></textarea>
              </div>
              
              <button type="submit" class="w-full bg-emerald-700 text-white py-2 px-4 rounded-md hover:bg-emerald-800 transition">Send Message</button>
            </form>
          </div>
        </div>
      </div>
      
      <div>
        <h2 class="text-2xl font-bold mb-6 text-emerald-700">Frequently Asked Questions</h2>
        <div class="bg-white rounded-xl shadow-md p-8">
          <div class="mb-6">
            <h3 class="font-bold mb-2">How can I track my order?</h3>
            <p class="text-slate-700">
              Once your order ships, you'll receive a tracking number via email. You can also track your order 
              by logging into your account and viewing your order history.
            </p>
          </div>
          
          <div class="mb-6">
            <h3 class="font-bold mb-2">What is your return policy?</h3>
            <p class="text-slate-700">
              We offer a 30-day return policy for most items. Products must be returned in their original condition 
              and packaging. Please visit our Returns page for more details.
            </p>
          </div>
          
          <div>
            <h3 class="font-bold mb-2">Do you ship internationally?</h3>
            <p class="text-slate-700">
              Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. 
              International orders may be subject to import duties and taxes.
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ContactComponent {} 