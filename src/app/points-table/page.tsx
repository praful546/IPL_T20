"use client";

import { useEffect, useState } from "react";

type Team = {
  teamLogo: string;
  teamName: string;
  played: string;
  wins: string;
  losses: string;
  nr: string;
  nrr: string;
  forRuns: string;
  againstRuns: string;
  points: string;
};

type ApiResponse = {
  points: Team[];
};

export default function PointsTable() {
  const [points, setPoints] = useState<Team[]>([]);

  useEffect(() => {
    fetch("/api/points")
      .then((res) => res.json())
      .then((data: ApiResponse) => setPoints(data.points))
      .catch((err) => console.error("Failed to fetch points table:", err));
  }, []);

  return (
    <div className="min-h-screen bg-[#f6f8fc] p-4 sm:p-6 text-black relative">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">IPL Points Table</h1>

      {!points || points.length === 0 ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="bg-white shadow rounded-xl overflow-hidden min-w-[800px]">
            <table className="w-full text-sm">
              <thead className="bg-[#f1f5f9] text-gray-700 text-left">
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 font-bold">POS</th>
                  <th className="px-4 py-3 font-bold">TEAM</th>
                  <th className="px-2 py-3 text-center font-bold">P</th>
                  <th className="px-2 py-3 text-center font-bold">W</th>
                  <th className="px-2 py-3 text-center font-bold">L</th>
                  <th className="px-2 py-3 text-center font-bold">NR</th>
                  <th className="px-4 py-3 text-center font-bold">NRR</th>
                  <th className="px-4 py-3 text-center font-bold">FOR</th>
                  <th className="px-4 py-3 text-center font-bold">AGAINST</th>
                  <th className="px-2 py-3 text-center font-bold">PTS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-gray-800">
                {points.map((team, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold">{idx + 1}</td>
                    <td className="px-4 py-3 flex items-center gap-3">
                      <img
                        src={team.teamLogo}
                        alt={team.teamName}
                        className="w-6 h-6 object-contain"
                      />
                      <span className="font-medium">{team.teamName}</span>
                    </td>
                    <td className="px-2 py-3 text-center">{team.played}</td>
                    <td className="px-2 py-3 text-center">{team.wins}</td>
                    <td className="px-2 py-3 text-center">{team.losses}</td>
                    <td className="px-2 py-3 text-center">{team.nr}</td>
                    <td className="px-4 py-3 text-center">{team.nrr}</td>
                    <td className="px-4 py-3 text-center">{team.forRuns}</td>
                    <td className="px-4 py-3 text-center">{team.againstRuns}</td>
                    <td className="px-2 py-3 text-center font-bold">{team.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
