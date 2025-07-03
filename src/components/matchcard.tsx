export default function MatchCard({
    teamA,
    teamB,
    date,
    venue,
  }: {
    teamA: string;
    teamB: string;
    date: string;
    venue: string;
  }) {
    return (
      <div className="border p-4 rounded shadow mb-4">
        <h2 className="text-xl font-bold mb-2">{teamA} vs {teamB}</h2>
        <p className="text-gray-600 mb-1">Date: {date}</p>
        <p className="text-gray-600">Venue: {venue}</p>
      </div>
    );
  }
  