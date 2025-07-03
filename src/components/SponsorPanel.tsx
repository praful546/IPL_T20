"use client";

import Image from "next/image";

export default function SponsorPanel() {
  const sponsors = [
    {
      label: "TITLE SPONSOR",
      link: "https://www.tata.com/",
      logo: "https://documents.iplt20.com//ipl/assets/images/new-sponsor-tata-logo.webp",
    },
    {
      label: "ASSOCIATE PARTNER",
      sponsors: [
        {
          link: "https://www.my11circle.com/",
          logo: "https://documents.iplt20.com//ipl/assets/images/new-sponsor-my11circle-logo.webp",
        },
        {
          link: "https://www.angelone.in/",
          logo: "https://documents.iplt20.com//ipl/assets/images/new-sponsor-angelone-logo.webp",
        },
        {
          link: "https://www.rupay.co.in/",
          logo: "https://documents.iplt20.com//ipl/assets/images/new-sponsor-rupay-logo.webp",
        },
      ],
    },
    {
      label: "OFFICIAL UMPIRE PARTNER",
      link: "https://www.wondercement.com/",
      logo: "https://documents.iplt20.com//ipl/assets/images/new-partner-wonder-cement.webp",
    },
    {
      label: "OFFICIAL STRATEGIC TIMEOUT PARTNER",
      link: "https://www.ceat.com/",
      logo: "https://documents.iplt20.com//ipl/assets/images/new-sponsor-ceat-logo.webp",
    },
    {
      label: "OFFICIAL BROADCASTER",
      link: "https://www.hotstar.com",
      logo: "https://documents.iplt20.com//ipl/assets/images/new-sponsor-start-sports-logo.webp",
    },
    {
      label: "OFFICIAL DIGITAL STREAMING PARTNER",
      link: "https://www.jiocinema.com/",
      logo: "https://documents.iplt20.com//ipl/assets/images/JioHotstar.webp",
    },
  ];

  return (
    <section className="bg-[#0e1639] w-full overflow-x-auto">
      <div className="flex">
        {sponsors.map((sponsor, idx) => (
          <div
            key={idx}
            className={`flex flex-col justify-start items-center text-center text-white py-4 px-4 border-r border-gray-600 last:border-none
              ${idx === 0 ? "w-[220px]" : idx === 1 ? "w-[500px]" : "w-[200px]"}
              flex-shrink-0`}
          >
            <div className="min-h-[40px] flex items-start justify-center mb-4">
              <p className="uppercase text-[12px] font-bold text-yellow-200 leading-tight">
                {sponsor.label}
              </p>
            </div>

            {sponsor.sponsors ? (
              <div className="flex flex-row flex-nowrap gap-6 justify-center">
                {sponsor.sponsors.map((sub, i) => (
                  <a key={i} href={sub.link} target="_blank" rel="noopener noreferrer">
                    <Image
                      src={sub.logo}
                      alt={`Sponsor logo ${i + 1}`}
                      width={100}
                      height={60}
                      className="object-contain h-[60px] mx-auto"
                    />
                  </a>
                ))}
              </div>
            ) : (
              <a href={sponsor.link} target="_blank" rel="noopener noreferrer">
                <Image
                  src={sponsor.logo}
                  alt="Sponsor logo"
                  width={150}
                  height={80}
                  className="object-contain h-[80px] mx-auto"
                />
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
