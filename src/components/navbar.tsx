"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex h-20 max-w-[95%] items-center justify-between px-4">
        <Link href="/" passHref>
          <div className="w-[150px] cursor-pointer">
            <Image
              src="https://storage.googleapis.com/rsr_accounting/rsr_accounting_logo_live.png"
              alt="RSR Accounting Logo"
              width={1000} 
              height={240}
              layout="responsive"
            />
          </div>
        </Link>
        <div className="flex items-center space-x-6">
          <Link href="#about-us" passHref>
            <span className="text-xl hover:text-primary transition-colors cursor-pointer">About Us</span>
          </Link>
          <Link href="#contact" passHref>
            <span className="text-xl hover:text-primary transition-colors cursor-pointer">Contact</span>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
