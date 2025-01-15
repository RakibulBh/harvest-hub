"use client";

import React, { useState } from 'react';

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

const ShoppingCartPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'Green Capsicum',
      price: 14.00,
      quantity: 5,
      image: 'picturesForCart/green-capsicum.jpg'
    },
    {
      id: 2,
      name: 'Red Capsicum',
      price: 14.00,
      quantity: 3,
      image: 'picturesForCart/Red-capsicum.jpg'
    }
  ]);
  
  const [couponCode, setCouponCode] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const updateQuantity = (id: number, change: number): void => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
      )
    );
  };
  
  const removeItem = (id: number): void => {
    setCartItems(items => items.filter(item => item.id !== id));
  };
  
  const calculateSubtotal = (): number => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();
  const cartTotal = subtotal;

  return (
    <div className="min-h-screen flex flex-col">
      
      <nav className="w-full bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <a href="/" className="text-xl md:text-2xl font-bold text-green-900">
                Harvest Hub
              </a>
            </div>

            
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pr-20 border border-gray-300 rounded-md focus:outline-none"
                />
                <button className="absolute right-0 top-0 h-full px-6 bg-green-900 text-white rounded-r-md hover:bg-green-800">
                  Search
                </button>
              </div>
            </div>

            
            <div className="flex items-center gap-4 md:gap-6">
              <button className="text-gray-600 hover:text-green-900 hidden md:block">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              <button className="text-gray-600 hover:text-green-900 hidden md:block">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              <div className="flex items-center gap-2">
                <button className="text-gray-600 hover:text-green-900">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </button>
                <div className="bg-green-600 text-white text-xs rounded-lg px-2 py-1">
                  <span>£{cartTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          
          <div className={`${isMenuOpen ? 'block' : 'hidden'} lg:hidden mt-4 pb-4 border-t border-gray-200`}>
            <div className="mt-4 space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pr-20 border border-gray-300 rounded-md focus:outline-none"
                />
                <button className="absolute right-0 top-0 h-full px-6 bg-green-900 text-white rounded-r-md hover:bg-green-800">
                  Search
                </button>
              </div>
              <div className="flex flex-col space-y-2">
                <a href="#" className="text-green-900 hover:text-green-700">Home</a>
                <a href="#" className="text-gray-600 hover:text-green-900">Shop</a>
                <a href="#" className="text-gray-600 hover:text-green-900">Locations</a>
                <a href="#" className="text-gray-600 hover:text-green-900">About Us</a>
                <a href="#" className="text-gray-600 hover:text-green-900">Contact Us</a>
              </div>
            </div>
          </div>

         
          <div className="hidden lg:flex items-center space-x-8 mt-4 pt-4 border-t border-gray-200">
            <a href="#" className="text-green-900 hover:text-green-700">Home</a>
            <a href="#" className="text-gray-600 hover:text-green-900">Shop</a>
            <a href="#" className="text-gray-600 hover:text-green-900">Locations</a>
            <a href="#" className="text-gray-600 hover:text-green-900">About Us</a>
            <a href="#" className="text-gray-600 hover:text-green-900">Contact Us</a>
          </div>
        </div>
      </nav>

      <main className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-2 mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <h1 className="text-xl font-bold">My Shopping Cart</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow">
                
                <div className="hidden md:grid grid-cols-12 gap-4 p-4 text-sm text-gray-600 border-b">
                  <div className="col-span-6">PRODUCT</div>
                  <div className="col-span-2">PRICE</div>
                  <div className="col-span-2">QUANTITY</div>
                  <div className="col-span-2">SUBTOTAL</div>
                </div>

                
                {cartItems.map(item => (
                  <div key={item.id} className="flex flex-col md:grid md:grid-cols-12 gap-4 p-4 items-center border-b">
                    <div className="w-full md:col-span-6 flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <div className="w-full md:col-span-2 flex justify-between md:block">
                      <span className="md:hidden">Price:</span>
                      <span>£{item.price.toFixed(2)}</span>
                    </div>
                    <div className="w-full md:col-span-2 flex justify-between md:block">
                      <span className="md:hidden">Quantity:</span>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="w-full md:col-span-2 flex justify-between items-center">
                      <span className="md:hidden">Subtotal:</span>
                      <span>£{(item.price * item.quantity).toFixed(2)}</span>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-gray-600 text-xl"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}

                
                <div className="flex flex-col md:flex-row justify-between p-4 border-t gap-4">
                  <button className="px-6 py-2 border border-gray-200 rounded hover:bg-gray-50 w-full md:w-auto">
                    Return to shop
                  </button>
                  <button className="px-6 py-2 border border-gray-200 rounded hover:bg-gray-50 w-full md:w-auto">
                    Update Cart
                  </button>
                </div>

               
                <div className="p-4 border-t">
                  <div className="flex flex-col md:flex-row items-center gap-4 p-3 border rounded">
                    <span className="text-sm text-gray-600">Coupon Code</span>
                    <input
                      type="text"
                      placeholder="Enter code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full md:flex-1 p-2 border rounded focus:outline-none focus:border-green-500"
                    />
                    <button className="w-full md:w-auto px-6 py-2 bg-green-900 text-white rounded hover:bg-green-800">
                      Apply Coupon
                    </button>
                  </div>
                </div>
              </div>
            </div>

            
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold mb-4">Cart Total</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b">
                    <span>Subtotal:</span>
                    <span>£{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span>Shipping:</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between py-2 font-bold">
                    <span>Total:</span>
                    <span>£{cartTotal.toFixed(2)}</span>
                  </div>
                </div>
                <button className="w-full mt-6 px-6 py-3 bg-green-900 text-white rounded hover:bg-green-800">
                  Proceed to checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      
      <footer className="bg-green-900 text-white py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-lg md:text-xl font-bold mb-4">Harvest Hub</h3>
              <p className="text-sm opacity-80 mb-4">
                Harvest Hub connects local farmers to communities, delivering fresh, farm-grown produce to your doorstep
              </p>
              <div className="text-sm">
                <div>(219) 555-0114</div>
                <div>Harvesthub@gmail.com</div>
              </div>
            </div>
            
            
            <div className="col-span-1">
              <h4 className="font-bold mb-4">My Account</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="/account" className="hover:text-gray-300">My Account</a></li>
                <li><a href="/orders" className="hover:text-gray-300">Order History</a></li>
                <li><a href="/cart" className="hover:text-gray-300">Shopping Cart</a></li>
                <li><a href="/wishlist" className="hover:text-gray-300">Wishlist</a></li>
              </ul>
            </div>

            
            <div className="col-span-1">
              <h4 className="font-bold mb-4">Helps</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="/contact" className="hover:text-gray-300">Contact</a></li>
                <li><a href="/faqs" className="hover:text-gray-300">FAQs</a></li>
                <li><a href="/terms" className="hover:text-gray-300">Terms & Condition</a></li>
                <li><a href="/privacy" className="hover:text-gray-300">Privacy Policy</a></li>
              </ul>
            </div>

            
            <div className="col-span-2 md:col-span-1">
              <h4 className="font-bold mb-4">Categories</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="/category/fruits-vegetables" className="hover:text-gray-300">Fruit & Vegetables</a></li>
                <li><a href="/category/meat-fish" className="hover:text-gray-300">Meat & Fish</a></li>
                <li><a href="/category/dairy-eggs" className="hover:text-gray-300">Dairy & Eggs</a></li>
                <li><a href="/category/seasonal" className="hover:text-gray-300">Seasonal Produce</a></li>
              </ul>
            </div>
          </div>

         
          <div className="mt-8 md:mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-xs text-gray-300 order-2 md:order-1">
                Harvest Hub © 2024. All Rights Reserved
              </div>
              
              
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ShoppingCartPage;