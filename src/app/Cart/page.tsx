// 'use client';

// import { useState, useEffect } from 'react';
// import CartItem from '../../components/CartItem';
// import products from '../../data/products.json';

// interface CartProduct extends Product {
//   quantity: number;
// }

// export default function Cart() {
//   const [cartItems, setCartItems] = useState<CartProduct[]>([]);
//   const [discount, setDiscount] = useState(0);

//   useEffect(() => {
//     // In a real app, you'd fetch the cart items from an API or local storage
//     const sampleCart = [
//       { ...products[0], quantity: 2 },
//       { ...products[1], quantity: 1 },
//     ];
//     setCartItems(sampleCart);
//   }, []);

//   const updateQuantity = (id: number, quantity: number) => {
//     setCartItems(prevItems =>
//       prevItems.map(item => (item.id === id ? { ...item, quantity } : item))
//     );
//   };

//   const removeItem = (id: number) => {
//     setCartItems(prevItems => prevItems.filter(item => item.id !== id));
//   };

//   const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
//   const total = subtotal - discount;

//   const applyDiscount = (code: string) => {
//     // Simple discount logic (in a real app, you'd validate the code server-side)
//     if (code === 'SAVE10') {
//       setDiscount(subtotal * 0.1);
//     } else {
//       alert('Invalid discount code');
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
//       {cartItems.map(item => (
//         <CartItem
//           key={item.id}
//           {...item}
//           updateQuantity={updateQuantity}
//           removeItem={removeItem}
//         />
//       ))}
//       <div className="mt-8">
//         <h2 className="text-2xl font-semibold mb-4">Cart Summary</h2>
//         <p>Subtotal: ${subtotal.toFixed(2)}</p>
//         <p>Discount: ${discount.toFixed(2)}</p>
//         <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
//         <div className="mt-4">
//           <input
//             type="text"
//             placeholder="Discount Code"
//             className="border p-2 mr-2"
//           />
//           <button
//             onClick={() => applyDiscount('SAVE10')}
//             className="bg-blue-500 text-white py-2 px-4 rounded"
//           >
//             Apply Discount
//           </button>
//         </div>
//         <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded w-full">
//           Proceed to Checkout
//         </button>
//       </div>
//     </div>
//   );
// }