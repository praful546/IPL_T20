"use client";

import Image from "next/image";
import Image1 from "@/assests/ipl/ipl_image_1.webp";
import Image2 from "@/assests/ipl/ipl_image_2.webp";
import Image3 from "@/assests/ipl/ipl_image_3.webp";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function DashboardHero() {
  const slides = [
    {
      image: Image1,
      heading: "IPL T20 Live Dashboard",
      subheading: "Follow live scores, points tables, and match schedules!",
    },
    {
      image: Image2,
      heading: "Experience the Thrill",
      subheading: "Get real-time updates and stats on every IPL match.",
    },
    {
      image: Image3,
      heading: "Stay Ahead",
      subheading: "Never miss a moment with our live dashboard.",
    },
  ];

  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden shadow-lg mb-8">
      <Swiper
        modules={[Autoplay]}
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <Image
                src={slide.image}
                alt={slide.heading}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-center text-white p-4">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  {slide.heading}
                </h1>
                <p className="mb-6 text-lg max-w-xl">{slide.subheading}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
