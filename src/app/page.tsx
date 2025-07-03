"use client";

import DashboardHero from "@/components/Dashboard";

import News from "@/components/News";
import PointsCard from "@/components/PointsCard"
export default function Home() {
  return (
    <div className="pt-0">
<DashboardHero/>
<PointsCard/>
<News/>
     

    </div>
  );
}
