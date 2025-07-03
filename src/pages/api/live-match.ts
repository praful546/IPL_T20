import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const statusOptions = [
    "In Progress - Live",
    "WICKET! Big breakthrough",
    "SIX! Huge shot",
    "FIFTY for batter",
    "HUNDRED for batter",
  ];

  const dummyIPLMatches = {
    matches: [
      {
        series: "Indian Premier League 2025",
        matchLink: "https://www.iplt20.com/match-details/live-match-1",
        info: "Match 1, Wankhede Stadium, Mumbai",
        team1: {
          name: "Mumbai Indians",
          score: "198/4",
          overs: "(18.3 ov)",
          flag: "https://scores.iplt20.com/ipl/teamlogos/MI.png",
        },
        team2: {
          name: "Chennai Super Kings",
          score: "192/8",
          overs: "(20 ov)",
          flag: "https://scores.iplt20.com/ipl/teamlogos/CSK.png",
        },
        note: "MI need 7 runs in 9 balls to win.",
      },
      {
        series: "Indian Premier League 2025",
        matchLink: "https://www.iplt20.com/match-details/live-match-2",
        info: "Match 2, Eden Gardens, Kolkata",
        team1: {
          name: "Kolkata Knight Riders",
          score: "210/6",
          overs: "(19.4 ov)",
          flag: "https://scores.iplt20.com/ipl/teamlogos/KKR.png",
        },
        team2: {
          name: "Royal Challengers Bangalore",
          score: "208/7",
          overs: "(20 ov)",
          flag: "https://scores.iplt20.com/ipl/teamlogos/RCB.png",
        },
        note: "KKR need 3 runs in 2 balls to win.",
      },
    ].map((match) => ({
      ...match,
      status: statusOptions[Math.floor(Math.random() * statusOptions.length)],
    })),
  };

  res.status(200).json(dummyIPLMatches);
}
