"use client";

import { useEffect, useState } from "react";

type Team = {
  name: string;
  score: string;
  overs: string;
  flag: string;
};

type Match = {
  stage: string;
  venue: string;
  date: string;
  summary: string;
  matchLink: string;
  team1?: Team;
  team2?: Team;
};

type ApiResponse = {
  matches: Match[];
};

export default function SchedulePage() {
  const [data, setData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    fetch("/api/scrape")
      .then((res) => res.json())
      .then((json: ApiResponse) => setData(json))
      .catch((err) => console.error("Failed to fetch schedule:", err));
  }, []);

  return (
    <div className="min-h-screen bg-[#f6f8fc] p-4 sm:p-6 text-black relative">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Match Schedule</h1>

      {!data || !data.matches || data.matches.length === 0 ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto space-y-8 relative">
          <div className="hidden sm:block absolute top-0 left-6 sm:left-14 h-full w-0.5 bg-gray-300"></div>

          {data.matches.map((match, idx) => (
            <div
              key={idx}
              className="relative flex flex-col sm:flex-row gap-4 sm:gap-6 pl-0 sm:pl-20"
            >
              <div className="hidden sm:block absolute left-12 top-6 w-4 h-4 bg-green-600 rounded-full z-10"></div>

              <div className="flex-1 bg-white rounded-xl shadow p-4 sm:p-5 border border-gray-200">
                <div className="inline-block bg-green-100 text-green-700 font-bold text-xs sm:text-sm px-3 py-1 rounded mb-3">
                  {match.stage || "MATCH"}
                </div>

                <p className="text-sm sm:text-base text-gray-600 mb-2">
                  {match.venue || "Unknown Venue"} • {match.date || "Unknown Date"}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start text-center sm:text-left">
                    {match.team1?.flag && (
                      <img
                        src={match.team1.flag}
                        alt={match.team1.name}
                        className="w-8 h-8 object-contain"
                      />
                    )}
                    <div>
                      <p className="font-bold">{match.team1?.name || "TBD"}</p>
                      <p className="text-sm text-gray-700">
                        {match.team1?.score || ""} {match.team1?.overs || ""}
                      </p>
                    </div>
                  </div>

                  <span className="hidden sm:block text-lg font-bold text-gray-500">vs</span>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-end text-center sm:text-right">
                    <div>
                      <p className="font-bold">{match.team2?.name || "TBD"}</p>
                      <p className="text-sm text-gray-700">
                        {match.team2?.score || ""} {match.team2?.overs || ""}
                      </p>
                    </div>
                    {match.team2?.flag && (
                      <img
                        src={match.team2.flag}
                        alt={match.team2.name}
                        className="w-8 h-8 object-contain"
                      />
                    )}
                  </div>
                </div>

                <p className="text-sm sm:text-base text-black font-semibold mb-3 text-center sm:text-left">
                  {match.summary || "Match summary not available."}
                </p>

                <div className="flex justify-center sm:justify-end">
                  {match.matchLink && (
                    <a
                      href={match.matchLink}
                      className="bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-4 py-2 rounded transition"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Match Centre
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
