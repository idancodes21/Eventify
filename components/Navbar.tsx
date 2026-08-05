"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-foreground text-white w-full px-4 sm:px-7 py-3 relative">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center">
          <Image src="/ticket.png" width={40} height={40} alt="ticket"/>
          <h2 className="logo text-xl font-bold text-center">Eventify</h2>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <Link href="/events" className="hover:text-primary transition-colors">Events</Link>
          <Link href="/about" className="hover:text-primary transition-colors">About</Link>
          <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
        </div>

        <div className="hidden md:flex items-center gap-5">
          <Link href="/create-event" className="hover:text-primary transition-colors">Create Event</Link>
          <Link href="/login" className="hover:text-primary transition-colors">Login</Link>
          <Link
            href="/signup"
            className="rounded-md bg-primary px-5 py-2 text-black font-medium hover:opacity-90 transition-opacity"
          >
            Sign Up
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-white focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-foreground border-t border-gray-800 px-6 py-6 flex flex-col gap-4 shadow-lg z-50">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="hover:text-primary transition-colors py-1"
          >
            Home
          </Link>
          <Link
            href="/events"
            onClick={() => setIsOpen(false)}
            className="hover:text-primary transition-colors py-1"
          >
            Events
          </Link>
          <Link
            href="/about"
            onClick={() => setIsOpen(false)}
            className="hover:text-primary transition-colors py-1"
          >
            About
          </Link>
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="hover:text-primary transition-colors py-1"
          >
            Contact
          </Link>

          <hr className="border-gray-800 my-1" />

          <Link
            href="/create-event"
            onClick={() => setIsOpen(false)}
            className="hover:text-primary transition-colors py-1"
          >
            Create Event
          </Link>
          <Link
            href="/login"
            onClick={() => setIsOpen(false)}
            className="hover:text-primary transition-colors py-1"
          >
            Login
          </Link>
          <Link
            href="/signup"
            onClick={() => setIsOpen(false)}
            className="rounded-md bg-primary px-5 py-2 text-black font-medium text-center hover:opacity-90 transition-opacity mt-2"
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
}