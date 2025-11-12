import { MapPin, Navigation } from "lucide-react";
import type { Handyman } from "@/types";

interface UserLocation {
  lat: number;
  lng: number;
}

interface MapProps {
  handymen: Handyman[];
  userLocation?: UserLocation | null;
}

export default function Map({ handymen, userLocation }: MapProps) {
  return (
    <div 
      data-testid="map-container"
      className="relative w-full h-[400px] md:h-[500px] bg-gradient-to-br from-card/50 to-primary/5 border border-primary/30 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(34,211,238,0.1)]"
    >
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34,211,238,0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,0.2) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      
      <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-primary/30 shadow-lg">
        <p className="text-sm font-medium flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          Showing {handymen.length} {handymen.length === 1 ? 'professional' : 'professionals'}
        </p>
      </div>

      {userLocation && (
        <div className="absolute top-4 right-4 bg-primary/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-primary/50">
          <p className="text-sm font-medium flex items-center gap-2 text-primary">
            <Navigation className="h-4 w-4" />
            Your Location
          </p>
        </div>
      )}

      <div className="absolute inset-0 flex items-center justify-center">
        {userLocation && (
          <div
            className="absolute z-10"
            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          >
            <div className="relative">
              <Navigation 
                className="h-10 w-10 text-primary drop-shadow-[0_0_12px_rgba(34,211,238,1)]" 
                fill="currentColor"
              />
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 whitespace-nowrap">
                <div className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-xs font-semibold">
                  You are here
                </div>
              </div>
            </div>
          </div>
        )}

        {handymen.slice(0, 8).map((handyman, index) => {
          const positions = [
            { top: '25%', left: '30%' },
            { top: '30%', left: '70%' },
            { top: '55%', left: '25%' },
            { top: '45%', left: '80%' },
            { top: '70%', left: '60%' },
            { top: '20%', left: '55%' },
            { top: '65%', left: '40%' },
            { top: '35%', left: '45%' },
          ];
          
          const pos = positions[index] || { top: '50%', left: '50%' };

          return (
            <div
              key={handyman.id}
              data-testid={`map-marker-${handyman.id}`}
              className="absolute group cursor-pointer transition-all hover:scale-125 hover:z-20"
              style={pos}
            >
              <MapPin 
                className="h-8 w-8 text-primary/80 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)] animate-pulse" 
                fill="currentColor"
              />
              
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-20">
                <div className="bg-card border border-primary/50 shadow-[0_0_20px_rgba(34,211,238,0.4)] rounded-lg p-3 whitespace-nowrap">
                  <p className="font-semibold text-sm">{handyman.name}</p>
                  <p className="text-xs text-muted-foreground">{handyman.category}</p>
                  <p className="text-xs text-primary">★ {handyman.rating}</p>
                  {handyman.distance && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {handyman.distance.toFixed(1)} km away
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
