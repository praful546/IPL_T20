"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import IPLLogo from "@/assests/ipl/ipl-logo-new-old.avif";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[#052c65] text-white shadow w-full relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-3 md:p-4">
        <Link href="/">
          <Image
            src={IPLLogo}
            alt="IPL Logo"
            className="w-20 h-auto cursor-pointer"
            priority
          />
        </Link>

        <nav className="hidden md:flex space-x-6 font-semibold text-sm md:text-base">
  {[
    { href: "/live-match", label: "Live Matches" },
    { href: "/points-table", label: "Points Table" },
    { href: "/match-details", label: "Schedule" },
  ].map(({ href, label }) => (
    <Link key={href} href={href}>
      <span className="relative pb-1 after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 hover:after:w-full">
        {label}
      </span>
    </Link>
  ))}
</nav>
<div className="hidden md:flex items-center space-x-4">
  {[
    { href: "#", label: "Fan Poll" },
    { href: "#fanpoll", label: "Choice" },
  ].map(({ href, label }) => (
    <Link key={href} href={href}>
      <span className="relative pb-1 after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 hover:after:w-full">
        {label}
      </span>
    </Link>
  ))}

</div>


        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close Menu" : "Open Menu"}
        >
          <svg
            className="w-7 h-7 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
  <div className="md:hidden absolute top-full left-0 w-full bg-[#0a2540] shadow-lg py-4 px-6 space-y-4 font-semibold text-sm z-40">
    {[
      { href: "/live-match", label: "Live Matches" },
      { href: "/points-table", label: "Points Table" },
      { href: "/match-details", label: "Schedule" },
      { href: "/fan-poll", label: "Fan Poll" },    
      { href: "/choice", label: "Choice" },         
    ].map(({ href, label }) => (
      <Link key={href} href={href} onClick={() => setMenuOpen(false)}>
        <span className="block py-2 hover:text-yellow-400 transition">{label}</span> 
      </Link>
    ))}
  </div>
)}

    </header>
  );
}
