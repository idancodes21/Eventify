"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Ticket,
  Star,
  CircleUserRound,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { data: session, status } = useSession();

  const isAuthenticated = status === "authenticated";

  return (
    <nav className="relative bg-[#29273e] text-white">
      <div className="mx-auto flex h-20 max-w-[1120] items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-yellow-400"
        >
          Eventify
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-7 md:flex">
          <Link
            href="/"
            className="transition-colors hover:text-yellow-400"
          >
            Home
          </Link>

          <Link
            href="/events"
            className="transition-colors hover:text-yellow-400"
          >
            Events
          </Link>

          <Link
            href="/about"
            className="transition-colors hover:text-yellow-400"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="transition-colors hover:text-yellow-400"
          >
            Contact
          </Link>
        </div>

        {/* Right side */}
        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/create-event"
            className="transition-colors hover:text-yellow-400"
          >
            Create Event
          </Link>

          {isAuthenticated ? (
            <>
              {/* Tickets */}
              <Link
                href="/tickets"
                className="flex flex-col items-center gap-0.5 transition-colors hover:text-yellow-400"
              >
                <Ticket className="h-6 w-6" strokeWidth={1.8} />

                <span className="text-[11px]">
                  Tickets
                </span>
              </Link>

              {/* Interested */}
              <Link
                href="/interested"
                className="flex flex-col items-center gap-0.5 transition-colors hover:text-yellow-400"
              >
                <Star className="h-6 w-6" strokeWidth={1.8} />

                <span className="text-[11px]">
                  Interested
                </span>
              </Link>

              {/* Profile */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setProfileOpen((current) => !current)
                  }
                  className="flex flex-col items-center gap-0.5 transition-colors hover:text-yellow-400"
                >
                  <div className="flex items-center gap-1">
                    <CircleUserRound
                      className="h-6 w-6"
                      strokeWidth={1.8}
                    />

                    <ChevronDown className="h-3 w-3" />
                  </div>

                  <span className="text-[11px]">
                    Profile
                  </span>
                </button>

                {/* Profile dropdown */}
                {profileOpen && (
                  <div className="absolute right-0 top-full z-50 mt-3 w-48 rounded-md bg-white py-2 text-black shadow-lg">
                    <div className="border-b px-4 py-3">
                      <p className="font-medium">
                        {session?.user?.name || "User"}
                      </p>

                      <p className="truncate text-xs text-gray-500">
                        {session?.user?.email}
                      </p>
                    </div>

                    <Link
                      href="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      My Profile
                    </Link>

                    <button
                      type="button"
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Logged-out state */}
              <Link
                href="/login"
                className="transition-colors hover:text-yellow-400"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="rounded-md bg-yellow-400 px-5 py-2 font-medium text-black transition-opacity hover:opacity-90"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className="p-2 md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="absolute left-0 top-full z-50 w-full border-t border-gray-700 bg-[#29273e] px-6 py-6 shadow-lg md:hidden">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>

            <Link
              href="/events"
              onClick={() => setIsOpen(false)}
            >
              Events
            </Link>

            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>

            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>

            <hr className="border-gray-700" />

            <Link
              href="/create-event"
              onClick={() => setIsOpen(false)}
            >
              Create Event
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  href="/tickets"
                  onClick={() => setIsOpen(false)}
                >
                  Tickets
                </Link>

                <Link
                  href="/interested"
                  onClick={() => setIsOpen(false)}
                >
                  Interested
                </Link>

                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>

                <button
                  type="button"
                  onClick={() =>
                    signOut({ callbackUrl: "/" })
                  }
                  className="text-left"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  onClick={() => setIsOpen(false)}
                  className="rounded-md bg-yellow-400 px-5 py-2 text-center font-medium text-black"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}