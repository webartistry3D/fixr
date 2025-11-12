import Map from "../Map";

export default function MapExample() {
  const handymen = [
    {
      id: "1",
      name: "Mike Johnson",
      skills: ["Electrical"],
      rating: 4.8,
      reviews: 127,
      whatsapp: "+1234567890",
      profilePicture: "electrician",
      latitude: 40.7589,
      longitude: -73.9851,
      category: "Electrical"
    },
    {
      id: "2",
      name: "Sarah Martinez",
      skills: ["Plumbing"],
      rating: 4.9,
      reviews: 203,
      whatsapp: "+1234567891",
      profilePicture: "plumber",
      latitude: 40.7614,
      longitude: -73.9776,
      category: "Plumbing"
    },
    {
      id: "3",
      name: "David Chen",
      skills: ["Carpentry"],
      rating: 4.7,
      reviews: 89,
      whatsapp: "+1234567892",
      profilePicture: "carpenter",
      latitude: 40.7489,
      longitude: -73.9680,
      category: "Carpentry"
    }
  ];

  return (
    <div className="p-8 bg-background">
      <Map handymen={handymen} />
    </div>
  );
}
