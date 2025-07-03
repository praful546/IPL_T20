"use client";

import { useState } from "react";
import Image from "next/image";
import Image1 from "@/assests/ipl/Videos/Videos_1.jpeg";
import Image2 from "@/assests/ipl/Videos/Videos_2.jpeg";
import Image3 from "@/assests/ipl/Videos/Videos_3.jpeg";
import Image4 from "@/assests/ipl/Videos/Videos_4.jpeg";
import Image5 from "@/assests/ipl/Videos/Videos_5.jpeg";

export default function MatchCoverage() {
  const tabs = [
    "Eng vs Ind 2nd Men's Test",
    "Eng vs Ind 2nd Women’s T20I",
    "SL vs Ban 1st Men’s ODI",
    "Eng vs Ind 3rd Youth ODI",
    "TNPL 2025",
    "WI vs Aus 2nd Men’s Test",
    "SFU vs SO MLC 2025",
  ];

  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="bg-white rounded-xl shadow p-4 max-w-6xl mx-auto mt-3 mb-6">
      <h2 className="text-xl font-semibold mb-4">Match Coverage</h2>

      <div className="flex flex-wrap gap-4 mb-6 border-b border-gray-300 pb-2">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            className={`text-sm whitespace-nowrap pb-1 ${
              idx === activeTab
                ? "font-bold border-b-2 border-blue-600 text-black"
                : "text-gray-500 hover:text-black"
            }`}
            onClick={() => setActiveTab(idx)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 relative overflow-hidden rounded-lg">
          <Image
            src={Image1}
            alt="Main video"
            className="w-full h-[260px] object-cover rounded-lg"
          />
          <div className="absolute top-2 left-2 bg-blue-600 rounded-full p-2">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.5 5.5v9l7-4.5-7-4.5z" />
            </svg>
          </div>
          <div className="absolute bottom-0 left-0 w-full bg-black/70 text-white p-3">
            <div className="flex justify-between text-xs">
              <p className="font-bold truncate">Watch - Pant clears mid-on, but caught at long-on</p>
              <span className="ml-2">0:28</span>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2">
            Gill holds India together with second hundred as captain
          </h3>

          <div className="bg-gray-100 text-sm text-gray-700 px-3 py-2 mb-4 rounded">
            <p className="font-semibold">
              <span className="bg-blue-100 text-blue-800 px-1 rounded text-xs mr-2">1st Inn</span>
              IND 310/5 (85 ov) vs ENG
            </p>
          </div>

          <ul className="space-y-2 text-sm">
            <li className="hover:underline cursor-pointer">
              Monga: Gill walks the talk amid India&apos;s unforced errors
            </li>
            <li className="hover:underline cursor-pointer">
              How Stokes waited and baited Jaiswal
            </li>
            <li className="hover:underline cursor-pointer">
              No more Mr Nice Guy for Woakes
            </li>
            <li className="hover:underline cursor-pointer">
              <span className="font-bold">As it happened -</span> It&apos;s in the balance
            </li>
            <li className="hover:underline cursor-pointer">
              Most wickets for England - Stokes level with Flintoff
            </li>
          </ul>
        </div>
      </div>

      <div className="flex overflow-x-auto gap-4 mt-6 hide-scrollbar">
        {[Image1, Image2, Image3, Image4, Image5].map((img, idx) => (
          <div key={idx} className="flex-shrink-0 w-[180px] rounded-lg overflow-hidden relative">
            <Image
              src={img}
              alt={`Video thumbnail ${idx + 1}`}
              className="w-full h-[100px] object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full bg-black/70 text-white text-xs p-2">
              Watch - Highlight {idx + 1}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
