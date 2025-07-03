"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import IPLLogo from "@/assests/ipl/ipl-logo-new-old.avif";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[#0a2540] text-white shadow w-full relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-3 md:p-4">
        <Link href="/" className="block">
          <Image
            src={IPLLogo}
            alt="IPL Logo"
            className="w-20 h-auto cursor-pointer"
            priority
          />
        </Link>

        <nav className="hidden md:flex space-x-6 font-semibold text-sm md:text-base">
          <Link href="/live-match" className="hover:text-yellow-400 transition">
            Live Matches
          </Link>
          <Link href="/points-table" className="hover:text-yellow-400 transition">
            Points Table
          </Link>
          <Link href="/match-details" className="hover:text-yellow-400 transition">
            Schedule
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Link href="#" className="hover:text-yellow-400 transition">
            Fan Poll
          </Link>
          <Link href="#" className="hover:text-yellow-400 transition">
            Choice
          </Link>
          <button className="hover:text-yellow-400 transition" aria-label="Search">
            🔍
          </button>
        </div>

        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <svg
            className="w-7 h-7 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#0a2540] shadow-lg py-4 px-6 space-y-4 font-semibold text-sm z-40">
          <Link
            href="/live-match"
            className="block hover:text-yellow-400 transition"
            onClick={() => setMenuOpen(false)}
          >
            Live Matches
          </Link>
          <Link
            href="/points-table"
            className="block hover:text-yellow-400 transition"
            onClick={() => setMenuOpen(false)}
          >
            Points Table
          </Link>
          <Link
            href="/match-details"
            className="block hover:text-yellow-400 transition"
            onClick={() => setMenuOpen(false)}
          >
            Schedule
          </Link>
          <Link
            href="#"
            className="block hover:text-yellow-400 transition"
            onClick={() => setMenuOpen(false)}
          >
            Fan Poll
          </Link>
          <Link
            href="#"
            className="block hover:text-yellow-400 transition"
            onClick={() => setMenuOpen(false)}
          >
            Choice
          </Link>
        </div>
      )}
    </header>
  );
}
