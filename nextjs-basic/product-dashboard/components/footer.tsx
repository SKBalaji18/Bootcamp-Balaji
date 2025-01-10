import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t mt-auto bg-background">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Product Dashboard</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Your one-stop shop for discovering and managing amazing products.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
                  Favorites
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Email: skbalajiskb@gmail.com<br />
              Phone: 123-4567
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-gray-600 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} Product Dashboard. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}