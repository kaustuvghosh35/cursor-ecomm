import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-help-center',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container mx-auto px-4 py-12 max-w-5xl">
      <h1 class="text-4xl font-bold mb-8 text-emerald-700">Help Center</h1>
      
      <div class="bg-emerald-50 rounded-xl p-8 mb-10">
        <div class="flex flex-col md:flex-row items-center">
          <div class="md:w-2/3">
            <h2 class="text-2xl font-bold mb-4">How can we help you today?</h2>
            <p class="text-slate-700 mb-6">Browse our help resources or contact our support team for assistance.</p>
            <div class="flex flex-wrap gap-4">
              <a href="#orders" class="bg-white text-emerald-700 px-5 py-2 rounded-lg shadow hover:shadow-md transition">Orders & Shipping</a>
              <a href="#returns" class="bg-white text-emerald-700 px-5 py-2 rounded-lg shadow hover:shadow-md transition">Returns & Refunds</a>
              <a href="#account" class="bg-white text-emerald-700 px-5 py-2 rounded-lg shadow hover:shadow-md transition">Account & Payment</a>
            </div>
          </div>
          <div class="md:w-1/3 mt-6 md:mt-0 flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-48 w-48 text-emerald-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      <section id="orders" class="mb-10">
        <h2 class="text-2xl font-bold mb-6 text-emerald-700">Orders & Shipping</h2>
        <div class="bg-white rounded-xl shadow-md p-8">
          <div class="mb-6">
            <h3 class="font-bold text-lg mb-2">How do I track my order?</h3>
            <p class="text-slate-700">
              Once your order ships, you'll receive a tracking number via email. You can also track your order by 
              logging into your account and viewing your order history. Order tracking information typically updates 
              within 24 hours after shipping.
            </p>
          </div>
          
          <div class="mb-6">
            <h3 class="font-bold text-lg mb-2">What are the shipping options and costs?</h3>
            <p class="text-slate-700">
              We offer several shipping options:
            </p>
            <ul class="list-disc ml-5 mt-2 text-slate-700">
              <li>Standard Shipping (3-5 business days): $5.99 or FREE with orders over $50</li>
              <li>Express Shipping (2-3 business days): $12.99</li>
              <li>Next-Day Shipping (1 business day): $19.99</li>
            </ul>
          </div>
          
          <div>
            <h3 class="font-bold text-lg mb-2">When will my order arrive?</h3>
            <p class="text-slate-700">
              Delivery times depend on your location and chosen shipping method. After an order is placed, 
              it typically takes 1-2 business days to process before shipping. You can find the estimated 
              delivery date in your order confirmation email.
            </p>
          </div>
        </div>
      </section>
      
      <section id="returns" class="mb-10">
        <h2 class="text-2xl font-bold mb-6 text-emerald-700">Returns & Refunds</h2>
        <div class="bg-white rounded-xl shadow-md p-8">
          <div class="mb-6">
            <h3 class="font-bold text-lg mb-2">What is your return policy?</h3>
            <p class="text-slate-700">
              We offer a 30-day return policy for most items. Products must be returned in their original condition 
              and packaging. Some items, such as personalized products or intimate goods, may not be eligible for return.
            </p>
          </div>
          
          <div class="mb-6">
            <h3 class="font-bold text-lg mb-2">How do I start a return?</h3>
            <p class="text-slate-700">
              To initiate a return:
            </p>
            <ol class="list-decimal ml-5 mt-2 text-slate-700">
              <li>Log into your account</li>
              <li>Go to your order history</li>
              <li>Select the order containing the item(s) you wish to return</li>
              <li>Click "Return Items" and follow the instructions</li>
            </ol>
          </div>
          
          <div>
            <h3 class="font-bold text-lg mb-2">When will I receive my refund?</h3>
            <p class="text-slate-700">
              Once we receive and process your return, refunds typically take 3-5 business days to appear on your 
              original payment method. E-gift cards and store credit are processed immediately after your return is approved.
            </p>
          </div>
        </div>
      </section>
      
      <section id="account" class="mb-10">
        <h2 class="text-2xl font-bold mb-6 text-emerald-700">Account & Payment</h2>
        <div class="bg-white rounded-xl shadow-md p-8">
          <div class="mb-6">
            <h3 class="font-bold text-lg mb-2">How do I reset my password?</h3>
            <p class="text-slate-700">
              To reset your password, click on the "Forgot Password" link on the login page. Enter the email associated 
              with your account and follow the instructions sent to your email to create a new password.
            </p>
          </div>
          
          <div class="mb-6">
            <h3 class="font-bold text-lg mb-2">What payment methods do you accept?</h3>
            <p class="text-slate-700">
              We accept the following payment methods:
            </p>
            <ul class="list-disc ml-5 mt-2 text-slate-700">
              <li>Credit/debit cards (Visa, Mastercard, American Express, Discover)</li>
              <li>PayPal</li>
              <li>Apple Pay</li>
              <li>Google Pay</li>
              <li>Shop Pay</li>
              <li>ShopNest Gift Cards</li>
            </ul>
          </div>
          
          <div>
            <h3 class="font-bold text-lg mb-2">Is my payment information secure?</h3>
            <p class="text-slate-700">
              Yes, we use industry-standard encryption and security measures to protect your payment information. 
              We do not store complete credit card numbers on our servers. All transactions are processed through 
              secure payment gateways that comply with PCI DSS requirements.
            </p>
          </div>
        </div>
      </section>
      
      <div class="bg-emerald-50 rounded-xl p-8">
        <h2 class="text-2xl font-bold mb-4">Still need help?</h2>
        <p class="text-slate-700 mb-6">Our customer support team is available to assist you.</p>
        <div class="flex flex-wrap gap-4">
          <a routerLink="/info/contact" class="bg-emerald-700 text-white px-5 py-2 rounded-lg hover:bg-emerald-800 transition">Contact Us</a>
          <a href="mailto:support&#64;shopnest.com" class="bg-white text-emerald-700 px-5 py-2 rounded-lg shadow hover:shadow-md transition">
            support&#64;shopnest.com
          </a>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class HelpCenterComponent {} 