import { useState, useEffect, useMemo } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Wrench, MapPin, Zap, Star, ArrowRight, Search as SearchIcon } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import CategoryGrid from "@/components/CategoryGrid";
import HandymanGrid from "@/components/HandymanGrid";
import Map from "@/components/Map";
import InstallPrompt from "@/components/InstallPrompt";
import type { Handyman, Category } from "@/types";
import logoImage from "@assets/generated_images/Fixr_neon_logo_7d91c012.png";

const CATEGORIES: Category[] = [
  { name: "Electrical", icon: "⚡" },
  { name: "Plumbing", icon: "🔧" },
  { name: "Carpentry", icon: "🪚" },
  { name: "HVAC", icon: "❄️" },
  { name: "Painting", icon: "🎨" },
  { name: "Locksmith", icon: "🔑" },
];

interface UserLocation {
  lat: number;
  lng: number;
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export default function Home() {
  const [handymen, setHandymen] = useState<Handyman[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const loadHandymen = async () => {
      try {
        const localData = localStorage.getItem('handymen');
        
        if (localData) {
          setHandymen(JSON.parse(localData));
        } else {
          const response = await fetch('/handymen.json');
          const data = await response.json();
          setHandymen(data);
          localStorage.setItem('handymen', JSON.stringify(data));
        }
      } catch (error) {
        console.error('Error loading handymen:', error);
      } finally {
        setLoading(false);
      }
    };

    loadHandymen();
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLocationPermission('granted');
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocationPermission('denied');
        }
      );
    }
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (value.trim() !== "" || selectedCategory) {
      setHasSearched(true);
    }
  };

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    if (category) {
      setHasSearched(true);
    }
  };

  const filteredHandymen = useMemo(() => {
    let filtered = handymen.filter((handyman) => {
      const matchesSearch = searchTerm === "" || 
        handyman.skills.some(skill => 
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        handyman.name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = !selectedCategory || handyman.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    if (userLocation) {
      filtered = filtered.map(handyman => ({
        ...handyman,
        distance: calculateDistance(
          userLocation.lat,
          userLocation.lng,
          handyman.latitude,
          handyman.longitude
        )
      })).sort((a, b) => (a.distance || 0) - (b.distance || 0));
    }

    return filtered;
  }, [handymen, searchTerm, selectedCategory, userLocation]);

  const shouldShowResults = hasSearched && (searchTerm.trim() !== "" || selectedCategory !== null);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-primary/20 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={logoImage} alt="Fixr Logo" className="h-10 w-10" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Fixr
              </h1>
            </div>
            <Link href="/add-handyman">
              <Button 
                data-testid="button-add-handyman"
                variant="outline"
                className="border-primary/50 hover:border-primary"
              >
                <Wrench className="h-4 w-4 mr-2" />
                Add Professional
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        {!shouldShowResults ? (
          <>
            <section className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(34,211,238,0.1),transparent_50%)]" />
              <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
              <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
              
              <div className="relative container mx-auto px-4 py-24 md:py-32">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-4">
                    <Zap className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-primary">Instant Professional Matching</span>
                  </div>
                  
                  <h2 className="text-5xl md:text-7xl font-bold leading-tight">
                    Find Expert{" "}
                    <span className="bg-gradient-to-r from-primary via-cyan-400 to-primary bg-clip-text text-transparent animate-gradient">
                      Handymen
                    </span>{" "}
                    <br />Near You
                  </h2>
                  
                  <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    Connect with verified, skilled professionals for all your home repair and maintenance needs. 
                    Search by service and discover top-rated experts based on your location.
                  </p>

                  <div className="flex flex-col items-center gap-6 pt-8">
                    <div className="w-full max-w-2xl">
                      <div className="relative">
                        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <input
                          data-testid="input-search-service"
                          type="text"
                          value={searchTerm}
                          onChange={(e) => handleSearch(e.target.value)}
                          placeholder="Search for a service (e.g., electrical, plumbing, HVAC)..."
                          className="w-full h-14 pl-12 pr-4 bg-card border-2 border-primary/30 rounded-xl text-lg focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/60"
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>
                          {locationPermission === 'granted' 
                            ? 'Location detected - showing nearby professionals'
                            : 'Enable location for proximity-based results'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 max-w-4xl mx-auto">
                    <div className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-primary/20 hover-elevate">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Location-Based</h3>
                      <p className="text-sm text-muted-foreground">
                        Find professionals sorted by proximity to your location
                      </p>
                    </div>

                    <div className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-primary/20 hover-elevate">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <Star className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Verified Experts</h3>
                      <p className="text-sm text-muted-foreground">
                        All professionals are vetted and rated by the community
                      </p>
                    </div>

                    <div className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-primary/20 hover-elevate">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <Zap className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Instant Connect</h3>
                      <p className="text-sm text-muted-foreground">
                        Contact professionals directly with one click
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="py-16 border-t border-primary/10">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <h3 className="text-3xl font-bold mb-4">Browse by Category</h3>
                  <p className="text-muted-foreground text-lg">Select a category to find specialized professionals</p>
                </div>
                <CategoryGrid
                  categories={CATEGORIES}
                  selectedCategory={selectedCategory}
                  onCategorySelect={handleCategorySelect}
                />
              </div>
            </section>
          </>
        ) : (
          <div className="container mx-auto px-4 py-8 space-y-8">
            <div className="flex items-center gap-4">
              <Button
                data-testid="button-back-to-search"
                variant="ghost"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory(null);
                  setHasSearched(false);
                }}
                className="gap-2"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
                New Search
              </Button>
            </div>

            <section>
              <h3 className="text-2xl font-semibold mb-6">Browse by Category</h3>
              <CategoryGrid
                categories={CATEGORIES}
                selectedCategory={selectedCategory}
                onCategorySelect={handleCategorySelect}
              />
            </section>

            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold">
                  {selectedCategory ? `${selectedCategory} Professionals` : "Search Results"}
                  {userLocation && <span className="text-base font-normal text-muted-foreground ml-2">(sorted by distance)</span>}
                </h3>
                <p className="text-muted-foreground">
                  {filteredHandymen.length} {filteredHandymen.length === 1 ? 'professional' : 'professionals'} found
                </p>
              </div>
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Loading professionals...</p>
                </div>
              ) : filteredHandymen.length === 0 ? (
                <div className="text-center py-12 bg-card/30 rounded-xl border border-dashed border-primary/30">
                  <SearchIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium mb-2">No professionals found</p>
                  <p className="text-muted-foreground">Try adjusting your search or selecting a different category</p>
                </div>
              ) : (
                <HandymanGrid handymen={filteredHandymen} userLocation={userLocation} />
              )}
            </section>

            {filteredHandymen.length > 0 && (
              <section>
                <h3 className="text-2xl font-semibold mb-6">Location Map</h3>
                <Map handymen={filteredHandymen} userLocation={userLocation} />
              </section>
            )}
          </div>
        )}
      </main>

      <footer className="border-t border-primary/10 mt-16 py-8 bg-card/30">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 Fixr. Connecting you with skilled professionals.</p>
        </div>
      </footer>

      <InstallPrompt />
    </div>
  );
}
