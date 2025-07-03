"use client";

import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";

type Team = {
  name: string;
  score: string;
  overs: string;
  flag: string;
};

type Match = {
  series: string;
  matchLink: string;
  status: string;
  info: string;
  team1: Team;
  team2: Team;
  note: string;
};

type ApiResponse = {
  matches: Match[];
};

export default function LiveMatchPage() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const prevStatusRef = useRef<Map<string, string>>(new Map());
  const initialLoadRef = useRef<boolean>(true);

  const fetchLiveMatches = async () => {
    try {
      const res = await fetch("/api/live-match");
      const json: ApiResponse = await res.json();

      if (!initialLoadRef.current) {
        json.matches?.forEach((match) => {
          const key = match.series + match.info; // unique key per match
          const prevStatus = prevStatusRef.current.get(key);

          if (
            prevStatus &&
            match.status !== prevStatus &&
            match.status !== "In Progress - Live"
          ) {
            toast.info(`Update: ${match.series} - ${match.status}`, {
              position: "top-right",
              autoClose: 5000,
            });
          }
        });
      } else {
        initialLoadRef.current = false;
      }

      json.matches?.forEach((match) => {
        const key = match.series + match.info;
        prevStatusRef.current.set(key, match.status);
      });

      setData(json);
    } catch (err) {
      console.error("Failed to fetch live matches:", err);
    }
  };

  useEffect(() => {
    fetchLiveMatches(); // initial fetch
    const interval = setInterval(fetchLiveMatches, 10000); // Poll every 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-[#f6f8fc] text-black">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        Live Cricket Matches
      </h1>

      {!data || !data.matches || data.matches.length === 0 ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="space-y-6 w-full max-w-4xl mx-auto">
          {data.matches.map((match, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow p-4 sm:p-5 hover:shadow-lg transition border border-gray-200"
            >
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1 sm:gap-4 mb-3">
                <h2 className="text-lg sm:text-xl font-bold">{match.series}</h2>
                <span className="text-sm sm:text-base text-blue-600 font-medium">
                  {match.info}
                </span>
              </div>

              <p className="text-sm sm:text-base text-yellow-600 font-bold mb-3">
                {match.status}
              </p>

              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex flex-1 items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
                  <img
                    src={match.team1.flag}
                    alt={match.team1.name}
                    className="w-6 h-6 object-contain"
                  />
                  <div className="text-center sm:text-left">
                    <h3 className="text-base sm:text-lg font-bold">
                      {match.team1.name}
                    </h3>
                    <p className="text-sm text-gray-700">
                      {match.team1.score} {match.team1.overs}
                    </p>
                  </div>
                </div>

                <span className="hidden sm:block text-xl font-bold text-gray-600">vs</span>

                <div className="flex flex-1 items-center gap-2 w-full sm:w-auto justify-center sm:justify-end text-center sm:text-right">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold">
                      {match.team2.name}
                    </h3>
                    <p className="text-sm text-gray-700">
                      {match.team2.score} {match.team2.overs}
                    </p>
                  </div>
                  <img
                    src={match.team2.flag}
                    alt={match.team2.name}
                    className="w-6 h-6 object-contain"
                  />
                </div>
              </div>

              <p className="text-sm sm:text-base mt-4 text-gray-800 text-center sm:text-left">
                {match.note}
              </p>

              <a
                href={match.matchLink}
                className="block mt-4 text-blue-600 font-semibold underline hover:text-blue-800 transition text-center sm:text-left"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Live Score
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
