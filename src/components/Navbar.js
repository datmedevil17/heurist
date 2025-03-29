"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white fixed w-full z-10 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / Brand */}
          <Link href="/">
            <span className="text-xl font-bold cursor-pointer">MyApp</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <NavItem href="/chat" label="Chat" />
            <NavItem href="/heuristMesh" label="Heurist Mesh" />
            <NavItem href="/hMeshDemo" label="HMesh Demo" />
            <NavItem href="/image" label="Image" />
            <NavItem href="/smartgen" label="SmartGen" />
            <NavItem href="/text2video" label="Text2Video" />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gray-800">
          <NavItemMobile href="/chat" label="Chat" />
          <NavItemMobile href="/heuristMesh" label="Heurist Mesh" />
          <NavItemMobile href="/hMeshDemo" label="HMesh Demo" />
          <NavItemMobile href="/image" label="Image" />
          <NavItemMobile href="/smartgen" label="SmartGen" />
          <NavItemMobile href="/text2video" label="Text2Video" />
        </div>
      )}
    </nav>
  );
};

// Desktop Nav Item
const NavItem = ({ href, label }) => (
  <Link href={href} className="hover:text-gray-400 transition duration-200">
    {label}
  </Link>
);

// Mobile Nav Item
const NavItemMobile = ({ href, label }) => (
  <Link
    href={href}
    className="block px-4 py-2 text-center text-gray-200 hover:bg-gray-700"
  >
    {label}
  </Link>
);

export default Navbar;
