import type { Handyman } from "@/types";
import HandymanCard from "./HandymanCard";

interface UserLocation {
  lat: number;
  lng: number;
}

interface HandymanGridProps {
  handymen: Handyman[];
  userLocation?: UserLocation | null;
}

export default function HandymanGrid({ handymen, userLocation }: HandymanGridProps) {
  if (handymen.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No handymen found matching your criteria.</p>
        <p className="text-muted-foreground text-sm mt-2">Try adjusting your search or category filter.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {handymen.map((handyman) => (
        <HandymanCard 
          key={handyman.id} 
          handyman={handyman} 
          showDistance={!!userLocation}
        />
      ))}
    </div>
  );
}
