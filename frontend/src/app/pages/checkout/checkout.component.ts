import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">Checkout</h1>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Side - Shipping Address & Payment -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 class="text-xl font-semibold mb-4">Shipping Address</h2>
            
            <form>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label for="firstName" class="block text-gray-700 mb-1">First Name</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                </div>
                
                <div>
                  <label for="lastName" class="block text-gray-700 mb-1">Last Name</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                </div>
              </div>
              
              <div class="mb-4">
                <label for="address" class="block text-gray-700 mb-1">Address</label>
                <input 
                  type="text" 
                  id="address" 
                  class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label for="city" class="block text-gray-700 mb-1">City</label>
                  <input 
                    type="text" 
                    id="city" 
                    class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                </div>
                
                <div>
                  <label for="state" class="block text-gray-700 mb-1">State</label>
                  <input 
                    type="text" 
                    id="state" 
                    class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                </div>
                
                <div>
                  <label for="zipCode" class="block text-gray-700 mb-1">ZIP Code</label>
                  <input 
                    type="text" 
                    id="zipCode" 
                    class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                </div>
              </div>
              
              <div>
                <label for="phone" class="block text-gray-700 mb-1">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
              </div>
            </form>
          </div>
          
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-semibold mb-4">Payment Method</h2>
            
            <div class="mb-4">
              <div class="flex items-center mb-2">
                <input 
                  type="radio" 
                  id="creditCard" 
                  name="paymentMethod" 
                  value="creditCard" 
                  checked 
                  class="mr-2 text-indigo-600"
                >
                <label for="creditCard">Credit Card</label>
              </div>
              
              <div class="mb-4 ml-6">
                <div class="mb-3">
                  <label for="cardNumber" class="block text-gray-700 mb-1">Card Number</label>
                  <input 
                    type="text" 
                    id="cardNumber" 
                    class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="XXXX XXXX XXXX XXXX"
                  >
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label for="expiryDate" class="block text-gray-700 mb-1">Expiry Date</label>
                    <input 
                      type="text" 
                      id="expiryDate" 
                      class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="MM/YY"
                    >
                  </div>
                  
                  <div>
                    <label for="cvv" class="block text-gray-700 mb-1">CVV</label>
                    <input 
                      type="text" 
                      id="cvv" 
                      class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="XXX"
                    >
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div class="flex items-center">
                <input 
                  type="radio" 
                  id="paypal" 
                  name="paymentMethod" 
                  value="paypal" 
                  class="mr-2 text-indigo-600"
                >
                <label for="paypal">PayPal</label>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Right Side - Order Summary -->
        <div>
          <div class="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 class="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div class="border-b border-gray-200 pb-4 mb-4">
              <div class="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>$129.99</span>
              </div>
              
              <div class="flex justify-between mb-2">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              
              <div class="flex justify-between mb-2">
                <span>Tax</span>
                <span>$10.40</span>
              </div>
            </div>
            
            <div class="flex justify-between font-semibold text-lg mb-6">
              <span>Total</span>
              <span>$140.39</span>
            </div>
            
            <button 
              class="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition"
            >
              Place Order
            </button>
            
            <div class="mt-4 text-center text-sm text-gray-500">
              By placing your order, you agree to our
              <a href="#" class="text-indigo-600 hover:underline">Terms & Conditions</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class CheckoutComponent {
  // This will be filled with actual data from cart and user services
} 