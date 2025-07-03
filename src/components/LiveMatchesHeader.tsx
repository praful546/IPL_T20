"use client";

import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Match {
  series: string;
  matchLink: string;
  status: string;
  info: string;
  team1: { name: string; score: string; overs: string; flag: string };
  team2: { name: string; score: string; overs: string; flag: string };
  note: string;
}

export default function LiveMatchesTicker() {
  const [matches, setMatches] = useState<Match[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/live-match")
      .then((res) => res.json())
      .then((data) => setMatches(data.matches || []))
      .catch((err) => console.error("Failed to fetch live matches:", err));
  }, []);

  const scroll = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full bg-[#0a2540] py-3 overflow-hidden">
      <button
        onClick={() => scroll(-300)}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-[#19398a] hover:bg-[#142e6e] text-white rounded-full p-2 z-50"
      >
        <ChevronLeft size={20} />
      </button>

      <div className="relative w-full overflow-hidden">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 w-full px-2 scroll-smooth hide-scrollbar"
        >
          {matches.map((match, idx) => (
            <a
              key={idx}
              href="/live-match"
              className="
                flex-shrink-0
                bg-white text-black rounded-xl shadow
                w-[90%] sm:w-[300px] md:w-[400px] lg:w-[500px]
                p-4 hover:shadow-lg transition
              "
            >
              <p className="text-xs text-gray-600 mb-1 font-medium truncate">{match.series}</p>
              <div className="text-xs font-semibold text-yellow-500 mb-1">{match.status}</div>
              <p className="text-xs text-gray-700 mb-2 truncate">{match.info}</p>

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-1">
                  <img src={match.team1.flag} alt={match.team1.name} className="w-5 h-5" />
                  <p className="font-bold text-sm">{match.team1.name}</p>
                </div>
                <p className="text-sm font-semibold whitespace-nowrap">
                  {match.team1.score} {match.team1.overs}
                </p>
              </div>

              <div className="flex justify-between items-center mt-1">
                <div className="flex items-center space-x-1">
                  <img src={match.team2.flag} alt={match.team2.name} className="w-5 h-5" />
                  <p className="font-bold text-sm">{match.team2.name}</p>
                </div>
                <p className="text-sm font-semibold whitespace-nowrap">
                  {match.team2.score} {match.team2.overs}
                </p>
              </div>

              <p className="text-xs text-gray-600 mt-1 truncate">{match.note}</p>
            </a>
          ))}
        </div>
      </div>

      <button
        onClick={() => scroll(300)}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-[#19398a] hover:bg-[#142e6e] text-white rounded-full p-2 z-50"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
