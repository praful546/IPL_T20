"use client";

import DashboardHero from "@/components/Dashboard";
import Link from "next/link";
import Header from "@/components/Header";
import News from "@/components/News";

export default function Home() {
  return (
    <div className="pt-0">
<DashboardHero/>
<News/>
     

    </div>
  );
}
