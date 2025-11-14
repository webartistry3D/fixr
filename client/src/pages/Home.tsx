import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Wrench,
  MapPin,
  Zap,
  ArrowRight,
  Search as SearchIcon,
  Sun,
  Moon,
} from "lucide-react";
import CategoryGrid from "@/components/CategoryGrid";
import HandymanGrid from "@/components/HandymanGrid";
import Map from "@/components/Map";
import InstallPrompt from "@/components/InstallPrompt";
import type { Handyman } from "@/types";
import logoImage from "@assets/generated_images/fixr-logo.png";
import { CATEGORY_SECTIONS } from "@/data/categories";

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
    Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function Home() {
  // --- Theme State ---
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);


  const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"));

  // --- App State ---
  const [handymen, setHandymen] = useState<Handyman[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [locationPermission, setLocationPermission] = useState<"granted" | "denied" | "prompt">("prompt");
  const [hasSearched, setHasSearched] = useState(false);

  // --- Track expanded category sections ---
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (title: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  // --- Load Handymen ---
  useEffect(() => {
    const loadHandymen = async () => {
      try {
        const localData = localStorage.getItem("handymen");
        if (localData) {
          setHandymen(JSON.parse(localData));
        } else {
          const response = await fetch("/handymen.json");
          const data = await response.json();
          setHandymen(data);
          localStorage.setItem("handymen", JSON.stringify(data));
        }
      } catch (error) {
        console.error("Error loading handymen:", error);
      } finally {
        setLoading(false);
      }
    };
    loadHandymen();
  }, []);

  // --- Geolocation ---
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLocationPermission("granted");
        },
        () => setLocationPermission("denied")
      );
    }
  }, []);

  // --- Handlers ---
  const handleSearch = (value: string) => setSearchTerm(value);
  const submitSearch = () => {
    if (searchTerm.trim() !== "" || selectedCategory) setHasSearched(true);
  };
  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    if (category) setHasSearched(true);
  };

  // --- Filter Handymen ---
  const filteredHandymen = useMemo(() => {
    let filtered = handymen.filter(handyman => {
      const matchesSearch =
        searchTerm === "" ||
        handyman.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        handyman.skills.some(skill =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesCategory = !selectedCategory || handyman.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    if (userLocation) {
      filtered = filtered
        .map(h => ({
          ...h,
          distance: calculateDistance(userLocation.lat, userLocation.lng, h.latitude, h.longitude),
        }))
        .sort((a, b) => (a.distance || 0) - (b.distance || 0));
    }

    return filtered;
  }, [handymen, searchTerm, selectedCategory, userLocation]);

  const shouldShowResults = hasSearched && (searchTerm.trim() !== "" || selectedCategory !== null);

  // --- Render ---
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      {/* Header */}
      <header className="border-b border-border bg-card/70 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-center relative">
          <div className="flex items-center gap-3">
            <img src={logoImage} alt="Fixr Logo" className="h-16 w-16 animate-spin-slow" />
            <h1 className="text-2xl font-bold font-orbitron bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              F📍🛠️ R
            </h1>
          </div>

          {/* Theme Toggle 
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-border hover:bg-accent transition absolute right-4"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5 text-foreground" />
            ) : (
              <Sun className="h-5 w-5 text-yellow-400" />
            )}
          </button>*/}
        </div>
      </header>

      {/* Main */}
      <main>
        {!shouldShowResults ? (
          <>
            {/* Hero Section */}
            <section className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-accent/5" />
              <div className="relative container mx-auto px-4 py-24 md:py-32">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-border mb-4">
                    <Zap className="h-4 w-4 text-accent" />
                    <span className="text-sm font-medium text-foreground/80">
                      Instant Professional Matching
                    </span>
                  </div>

                  <h2 className="text-2xl md:text-5xl font-bold leading-tight">
                    Find a{" "}
                    <span className="text-3xl md:text-5xl font-bold font-orbitron bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                      F📍🛠️ R
                    </span>{" "}
                    near you
                  </h2>

                  <ul className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed space-y-2">
                    <li>✅ Connect with Verified professionals</li>
                    <li>⭐ Top-rated experts for any task</li>
                    <li>🏠 Home repairs & maintenance</li>
                    <li>🏭 Industrial & facility services</li>
                  </ul>

                  {/* Search Input */}
                  <div className="flex flex-col items-center gap-4 pt-8 w-full px-4">
                    <div className="w-full max-w-2xl flex flex-col sm:flex-row items-stretch">
                      <div className="relative flex-1">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <SearchIcon className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <input
                          type="text"
                          value={searchTerm}
                          onChange={e => handleSearch(e.target.value)}
                          onKeyDown={e => e.key === "Enter" && submitSearch()}
                          placeholder="Search for a service (e.g., electrical, plumbing, HVAC)..."
                          className="w-full h-16 pl-12 pr-4 bg-card border-2 border-border rounded-t-xl sm:rounded-l-xl sm:rounded-r-none text-lg focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 placeholder:text-muted-foreground/70 transition-all box-border"
                        />
                      </div>

                      <Button
                        onClick={submitSearch}
                        className="h-16 mt-2 sm:mt-0 sm:px-6 rounded-b-xl sm:rounded-r-xl sm:rounded-l-none flex-shrink-0 whitespace-nowrap"
                      >
                        Search
                      </Button>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-4 text-center mt-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 text-accent" />
                        <span>
                          {locationPermission === "granted"
                            ? "See location of nearby professionals"
                            : "Enable location for proximity-based results"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Categories */}
            <section className="py-16 border-t border-border">
              <div className="container mx-auto px-4 space-y-12">
                <div className="text-center mb-4">
                  <h3 className="text-3xl font-bold mb-2">Browse by Category</h3>
                  <p className="text-muted-foreground text-lg">Select a category to find specialized professionals</p>
                </div>

                {CATEGORY_SECTIONS.map(section => (
                  // --- Inside your CATEGORY_SECTIONS.map(...) render ---
                  <div key={section.title} className="space-y-6">
                    <div className="flex items-center justify-between gap-4 ">
                      <div className="flex items-center gap-3">
                        <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 border border-border text-2xl">
                          <span aria-hidden>{section.icon}</span>
                        </div>
                        <div>
                          <h4 className="text-xl font-semibold">{section.title}</h4>
                          {section.subtitle && <p className="text-xs text-muted-foreground">{section.subtitle}</p>}
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        onClick={() => toggleSection(section.title)}
                        className="inline-flex border border-white-100"
                      >
                        {expandedSections[section.title] ? "Close 🔒" : "Open 🔑"}
                      </Button>
                    </div>

                    {/* Animated Section */}
                    <div
                      className="overflow-hidden transition-all duration-500 ease-in-out"
                      style={{
                        maxHeight: expandedSections[section.title] ? "1000px" : "0",
                      }}
                    >
                      <CategoryGrid
                        categories={section.categories}
                        selectedCategory={selectedCategory}
                        onCategorySelect={handleCategorySelect}
                      />
                    </div>
                  </div>

                ))}
              </div>
            </section>
          </>
        ) : (
          <div className="container mx-auto px-4 py-8 space-y-8">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory(null);
                  setHasSearched(false);
                }}
                className="gap-2"
              >
                <ArrowRight className="h-4 w-4 rotate-180" /> New Search
              </Button>
            </div>

            {/* Results */}
            <section>
              <h3 className="text-2xl font-semibold mb-6">
                {selectedCategory ? `${selectedCategory} Professionals` : "Search Results"}
                {userLocation && <span className="text-base font-normal text-muted-foreground ml-2">(sorted by distance)</span>}
              </h3>

              {loading ? (
                <div className="text-center py-12 text-muted-foreground">Loading professionals...</div>
              ) : filteredHandymen.length === 0 ? (
                <div className="text-center py-12 bg-card/30 rounded-xl border border-dashed border-border">
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

      <footer className="border-t border-border mt-16 py-8 bg-card/30">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          ©2025 Fixr - Find Skilled Professionals Near You. Powered 💡 by WebArtistry Creations®
        </div>
      </footer>

      <InstallPrompt />
    </div>
  );
}
