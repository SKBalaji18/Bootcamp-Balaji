'use client'

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 dark:from-blue-950/50 dark:to-purple-950/50" />
      <div className="relative px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Shop Smarter, Not Harder
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
          Discover trending products and manage your favorites all in one place.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Link href="/products">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Browse Products
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/favorites">
                <Heart className="mr-2 h-5 w-5" />
                View Favorites
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// const Footer = () => {
//   return (
//     <footer className="border-t mt-auto">
//       <div className="container mx-auto py-8">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div>
//             <h3 className="font-bold text-lg mb-4">Product Dashboard</h3>
//             <p className="text-gray-600 dark:text-gray-400">
//               Your one-stop shop for discovering and managing amazing products.
//             </p>
//           </div>
//           <div>
//             <h3 className="font-bold text-lg mb-4">Quick Links</h3>
//             <ul className="space-y-2">
//               <li>
//                 <Link href="/products" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
//                   Products
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/favorites" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
//                   Favorites
//                 </Link>
//               </li>
//             </ul>
//           </div>
//           <div>
//             <h3 className="font-bold text-lg mb-4">Contact</h3>
//             <p className="text-gray-600 dark:text-gray-400">
//               Email: support@productdashboard.com<br />
//               Phone: (555) 123-4567
//             </p>
//           </div>
//         </div>
//         <div className="mt-8 pt-8 border-t text-center text-gray-600 dark:text-gray-400">
//           <p>&copy; {new Date().getFullYear()} Product Dashboard. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

export default function Home() {
  return (
    <>
      <HeroSection />
    </>
  );
}