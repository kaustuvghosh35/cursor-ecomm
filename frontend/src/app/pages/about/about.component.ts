import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto px-4 py-12 max-w-5xl">
      <h1 class="text-4xl font-bold mb-8 text-emerald-700">About ShopNest</h1>
      
      <div class="bg-white rounded-xl shadow-md overflow-hidden mb-10">
        <div class="md:flex">
          <div class="md:w-1/2">
            <img src="assets/about-us.jpg" alt="Our Team" class="h-full w-full object-cover">
          </div>
          <div class="p-8 md:w-1/2">
            <div class="uppercase tracking-wide text-sm text-emerald-700 font-semibold">Our Story</div>
            <p class="mt-4 text-slate-700">
              Founded in 2023, ShopNest emerged from a simple vision: to create an online shopping experience 
              that feels personal, intuitive, and enjoyable. We believe shopping should be more than just a transaction—it 
              should be an experience that brings joy and satisfaction.
            </p>
            <p class="mt-4 text-slate-700">
              Our team of passionate e-commerce experts work tirelessly to curate a selection of high-quality products 
              that meet the diverse needs of our customers. We partner with trusted brands and artisans who share our 
              commitment to quality, sustainability, and customer satisfaction.
            </p>
          </div>
        </div>
      </div>
      
      <div class="mb-10">
        <h2 class="text-2xl font-bold mb-6 text-emerald-700">Our Mission</h2>
        <div class="bg-white rounded-xl shadow-md p-8">
          <p class="text-slate-700">
            At ShopNest, our mission is to transform online shopping by offering a curated selection of exceptional products, 
            delivering them with speed and care, and providing a shopping experience that delights at every touchpoint. 
            We strive to make quality products accessible to everyone while supporting ethical business practices and 
            sustainable operations.
          </p>
        </div>
      </div>
      
      <div class="mb-10">
        <h2 class="text-2xl font-bold mb-6 text-emerald-700">Our Values</h2>
        <div class="grid md:grid-cols-3 gap-6">
          <div class="bg-white rounded-xl shadow-md p-6">
            <div class="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="font-bold mb-2">Quality</h3>
            <p class="text-slate-700">We rigorously select products that meet our high standards and will stand the test of time.</p>
          </div>
          
          <div class="bg-white rounded-xl shadow-md p-6">
            <div class="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="font-bold mb-2">Sustainability</h3>
            <p class="text-slate-700">We're committed to reducing our environmental impact and partnering with eco-conscious brands.</p>
          </div>
          
          <div class="bg-white rounded-xl shadow-md p-6">
            <div class="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="font-bold mb-2">Innovation</h3>
            <p class="text-slate-700">We continuously improve our platform to make shopping easier, faster, and more enjoyable.</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class AboutComponent {} 