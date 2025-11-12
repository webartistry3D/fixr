import HandymanCard from "../HandymanCard";

export default function HandymanCardExample() {
  const handyman = {
    id: "1",
    name: "Mike Johnson",
    skills: ["Electrical", "Lighting", "Wiring"],
    rating: 4.8,
    reviews: 127,
    whatsapp: "+1234567890",
    profilePicture: "electrician",
    latitude: 40.7589,
    longitude: -73.9851,
    category: "Electrical"
  };

  return (
    <div className="p-8 bg-background max-w-md">
      <HandymanCard handyman={handyman} />
    </div>
  );
}
