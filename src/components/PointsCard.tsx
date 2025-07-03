"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

interface TeamPoints {
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
  rank: number;
  recentForm?: string[]; 
}

export default function PointsTableSwiper() {
  const [points, setPoints] = useState<TeamPoints[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const res = await fetch("/api/points");
        const data = await res.json();
        setPoints(
          data.points.map((p: TeamPoints, idx: number) => ({
            ...p,
            rank: idx + 1,
            recentForm: ["W", "L", "W", "L", "L"], 
          }))
        );
      } catch (err) {
        console.error("Failed to fetch points table:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPoints();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <section className="py-6  overflow-hidden">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-white">Points Table</h2>

      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1.2 },
          768: { slidesPerView: 2.5 },
          1024: { slidesPerView: 4.5 }, 
        }}
        navigation
        className="px-4"
      >
        {points.map((team) => (
          <SwiperSlide key={team.teamName}>
            <div className="bg-white rounded-2xl border shadow hover:shadow-lg transition p-4 min-h-[350px] flex flex-col justify-between">
              <div>
                <div className="flex items-center mb-4">
                  <span className="text-5xl sm:text-6xl font-extrabold text-black leading-none drop-shadow-md mr-3">
                    {team.rank}
                  </span>
                  <h3 className="text-base font-bold uppercase">{team.teamName}</h3>
                </div>

                <img
                  src={team.teamLogo}
                  alt={team.teamName}
                  className="w-20 h-20 object-contain mb-4 mx-auto"
                />

                <div className="flex justify-around w-full text-xs text-gray-700 mb-2 border-t pt-2">
                  <div className="text-center">
                    <p className="font-bold">{team.points}</p>
                    <p>Points</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold">{team.played}</p>
                    <p>Played</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold">{team.wins}</p>
                    <p>Won</p>
                  </div>
                  <div className="text-center">
                    <p className={`font-bold ${parseFloat(team.nrr) >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {team.nrr}
                    </p>
                    <p>NRR</p>
                  </div>
                </div>

                <div className="w-full">
                  <h4 className="text-sm font-bold text-left mb-2">Recent form</h4>
                  <div className="flex gap-1">
                    {team.recentForm?.map((result, idx) => (
                      <span
                        key={idx}
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border ${
                          result === "W"
                            ? "border-green-600 text-green-600"
                            : "border-red-600 text-red-600"
                        }`}
                      >
                        {result}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-6 flex justify-center">
  <div className="relative inline-block group">
    <div className="absolute inset-0 border-2 border-white transform skew-x-[-12deg] translate-x-1 translate-y-1 rounded z-0 pointer-events-none"></div>

    <a
      href="/points-table"
      className="relative inline-flex items-center justify-center text-white font-bold text-lg bg-blue-900 px-8 py-3 rounded transform skew-x-[-12deg] overflow-hidden"
    >
      <span className="inline-flex items-center gap-2 transform skew-x-[12deg] relative z-10 ">
        Full Points Table
        <span className="ml-2 flex items-center opacity-0 translate-x-4 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="white"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </span>
    </a>
  </div>
</div>

    </section>
  );
}
