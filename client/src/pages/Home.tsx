import { useState, useEffect, useMemo } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Wrench, MapPin, Zap, Star, ArrowRight, Search as SearchIcon } from "lucide-react";
import CategoryGrid from "@/components/CategoryGrid";
import HandymanGrid from "@/components/HandymanGrid";
import Map from "@/components/Map";
import InstallPrompt from "@/components/InstallPrompt";
import type { Handyman, Category } from "@/types";
import logoImage from "@assets/generated_images/fixr-logo.png";

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
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
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

  // Load handymen JSON
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

  // Get user location
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
        () => setLocationPermission('denied')
      );
    }
  }, []);

  // Search input change
  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  // Explicit search submission
  const submitSearch = () => {
    if (searchTerm.trim() !== "" || selectedCategory) {
      setHasSearched(true);
    }
  };

  // Category selection
  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    if (category) {
      setHasSearched(true);
    }
  };

  const filteredHandymen = useMemo(() => {
    let filtered = handymen.filter(handyman => {
      const matchesSearch =
        searchTerm === "" ||
        handyman.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        handyman.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = !selectedCategory || handyman.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    if (userLocation) {
      filtered = filtered.map(h => ({
        ...h,
        distance: calculateDistance(userLocation.lat, userLocation.lng, h.latitude, h.longitude)
      })).sort((a, b) => (a.distance || 0) - (b.distance || 0));
    }

    return filtered;
  }, [handymen, searchTerm, selectedCategory, userLocation]);

  const shouldShowResults = hasSearched && (searchTerm.trim() !== "" || selectedCategory !== null);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-primary/20 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-center relative">
          {/* Logo + Title centered */}
          <div className="flex items-center gap-3">
            <img src={logoImage} alt="Fixr Logo" className="h-16 w-16 animate-spin-slow" />
            <h1 className="text-2xl font-bold font-orbitron bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              F⚡🛠️ R
            </h1>
          </div>

          {/* Optional: right/left buttons can be absolute if needed */}
          {/* Example: Add Professional button on the right */}
          {/* <div className="absolute right-4">
            <Link href="/add-handyman">
              <Button variant="outline" className="border-primary/50 hover:border-primary">
                <Wrench className="h-4 w-4 mr-2" /> Add Professional
              </Button>
            </Link>
          </div> */}
        </div>
      </header>


      <main>
        {!shouldShowResults ? (
          <>
            {/* Hero Section */}
            <section className="relative overflow-hidden">
              {/* Background effects */}
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
                  <h2 className="text-2xl md:text-4xl font-bold leading-tight">
                    <span className="tracking-wide">Find a</span>
                    <span className="ml-4 md:ml-6 font-orbitron text-2xl md:text-4xl 
                                bg-gradient-to-r from-primary via-cyan-400 to-primary 
                                bg-clip-text text-transparent animate-gradient mr-4 md:mr-6">
                      F⚡🛠️ R
                    </span>
                    {/*<span className="tracking-wide">Near &nbsp;You</span>*/}
                    <span className="tracking-wide">Near You</span>
                  </h2>


                  <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    Connect with verified ✅, top-rated ⭐⭐⭐ technicians for all your home repair and maintenance needs.
                  </p>

                  {/* Search Input */}
                  <div className="flex flex-col items-center gap-4 pt-8 w-full px-4">
                    <div className="w-full max-w-2xl flex flex-col sm:flex-row items-stretch">
                      {/* Input Container */}
                      <div className="relative flex-1">
                        {/* Search Icon */}
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <SearchIcon className="h-5 w-5 text-muted-foreground" />
                        </div>

                        {/* Input */}
                        <input
                          type="text"
                          value={searchTerm}
                          onChange={e => handleSearch(e.target.value)}
                          onKeyDown={e => e.key === "Enter" && submitSearch()}
                          placeholder="Search for a service (e.g., electrical, plumbing, HVAC)..."
                          className="
                            w-full
                            h-16
                            pl-12 pr-4
                            bg-card border-2 border-primary/30
                            rounded-t-xl sm:rounded-l-xl sm:rounded-r-none
                            text-lg
                            focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20
                            transition-all placeholder:text-muted-foreground/60
                            box-border
                          "
                        />
                      </div>

                      {/* Button */}
                      <Button
                        onClick={submitSearch}
                        className="
                          h-16
                          mt-2 sm:mt-0
                          sm:px-6
                          rounded-b-xl sm:rounded-r-xl sm:rounded-l-none
                          flex-shrink-0 whitespace-nowrap
                        "
                      >
                        Search
                      </Button>
                    </div>

                    {/* Location Info */}
                    <div className="flex flex-wrap items-center justify-center gap-4 text-center mt-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{locationPermission === 'granted' ? 'See location of nearby professionals' : 'Enable location for proximity-based results'}</span>
                      </div>
                    </div>
                  </div>




                </div>
              </div>
            </section>

            {/* Categories */}
            <section className="py-16 border-t border-primary/10">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <h3 className="text-3xl font-bold mb-4">Browse by Category</h3>
                  <p className="text-muted-foreground text-lg">Select a category to find specialized professionals</p>
                </div>
                <CategoryGrid categories={CATEGORIES} selectedCategory={selectedCategory} onCategorySelect={handleCategorySelect} />
              </div>
            </section>
          </>
        ) : (
          <div className="container mx-auto px-4 py-8 space-y-8">
            {/* Back button */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => { setSearchTerm(""); setSelectedCategory(null); setHasSearched(false); }}
                className="gap-2"
              >
                <ArrowRight className="h-4 w-4 rotate-180" /> New Search
              </Button>
            </div>

            {/* Categories */}
            <section>
              <h3 className="text-2xl font-semibold mb-6">Browse by Category</h3>
              <CategoryGrid categories={CATEGORIES} selectedCategory={selectedCategory} onCategorySelect={handleCategorySelect} />
            </section>

            {/* Handyman results */}
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
                <div className="text-center py-12">Loading professionals...</div>
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

            {/* Map */}
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
          © 2025 FIXR. Powered 💡 by WebArtistry Creations®
        </div>
      </footer>

      <InstallPrompt />
    </div>
  );
}
