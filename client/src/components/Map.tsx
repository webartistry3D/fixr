import { MapPin } from "lucide-react";
import type { Handyman } from "@/types";

interface MapProps {
  handymen: Handyman[];
}

export default function Map({ handymen }: MapProps) {
  return (
    <div 
      data-testid="map-container"
      className="relative w-full h-[400px] md:h-[500px] bg-card border border-border rounded-lg overflow-hidden"
      style={{
        backgroundImage: 'linear-gradient(to bottom, rgba(34,211,238,0.03), rgba(34,211,238,0.08))',
      }}
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
      
      <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm px-4 py-2 rounded-md border border-border">
        <p className="text-sm font-medium">
          Showing {handymen.length} handymen in your area
        </p>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        {handymen.slice(0, 6).map((handyman, index) => {
          const positions = [
            { top: '20%', left: '25%' },
            { top: '35%', left: '65%' },
            { top: '60%', left: '30%' },
            { top: '45%', left: '75%' },
            { top: '70%', left: '55%' },
            { top: '25%', left: '50%' },
          ];
          
          const pos = positions[index] || { top: '50%', left: '50%' };

          return (
            <div
              key={handyman.id}
              data-testid={`map-marker-${handyman.id}`}
              className="absolute group cursor-pointer transition-transform hover:scale-125"
              style={pos}
            >
              <MapPin 
                className="h-8 w-8 text-primary drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-pulse" 
                fill="currentColor"
              />
              
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                <div className="bg-card border border-primary/50 shadow-[0_0_15px_rgba(34,211,238,0.3)] rounded-lg p-3 whitespace-nowrap">
                  <p className="font-semibold text-sm">{handyman.name}</p>
                  <p className="text-xs text-muted-foreground">{handyman.category}</p>
                  <p className="text-xs text-primary">★ {handyman.rating}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
