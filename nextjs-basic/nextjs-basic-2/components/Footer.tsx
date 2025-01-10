import React from 'react';
import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Main Footer Content */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Kaminari</h3>
            <p className="text-sm text-muted-foreground">
              Building the future of web applications with modern tools and technologies.
            </p>
            <div className="flex space-x-4">
              <Link href="https://github.com/lucky-chap/kaminari" target='_blank' className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="https://twitter.com" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="https://linkedin.com" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Our Story */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Our Story</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-muted-foreground hover:text-foreground transition-colors">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-foreground transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Why Choose Us */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Why Choose Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">
                ✨ Modern Tech Stack
              </li>
              <li className="text-muted-foreground">
                🚀 High Performance
              </li>
              <li className="text-muted-foreground">
                🎨 Beautiful Design
              </li>
              <li className="text-muted-foreground">
                🛡️ Enterprise Security
              </li>
            </ul>
          </div>

          {/* Achievements */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Achievements</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">
                🏆 Best Web App 2024
              </li>
              <li className="text-muted-foreground">
                ⭐ 10K+ Happy Users
              </li>
              <li className="text-muted-foreground">
                📈 99.9% Uptime
              </li>
              <li className="text-muted-foreground">
                💚 Carbon Neutral
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t">
        <div className="container h-14 flex items-center justify-between text-sm">
          <p className="text-muted-foreground">
            © 2024 Kaminari. All rights reserved.
          </p>
          <nav>
            <ul className="flex items-center space-x-4">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;