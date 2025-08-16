import React from 'react';
import { Link } from 'gatsby';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-medical-primary text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            <Link to="/">Dr. Sufficool's Medical Education</Link>
          </h1>
          <nav>
            <Link to="/about" className="px-4">About</Link>
            <Link to="/contact" className="px-4">Contact</Link>
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; {new Date().getFullYear()} Dr. Daniel Sufficool. All rights reserved.</p>
        <div className="mt-2">
          <Link to="/about" className="px-2">About</Link> |
          <Link to="/contact" className="px-2">Contact</Link>
        </div>
      </footer>
    </div>
  );
};

export default Layout;