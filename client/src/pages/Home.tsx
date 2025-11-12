import { useState, useEffect, useMemo } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Wrench } from "lucide-react";
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

export default function Home() {
  const [handymen, setHandymen] = useState<Handyman[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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

  const filteredHandymen = useMemo(() => {
    return handymen.filter((handyman) => {
      const matchesSearch = searchTerm === "" || 
        handyman.skills.some(skill => 
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        handyman.name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = !selectedCategory || handyman.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [handymen, searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={logoImage} alt="Fixr Logo" className="h-10 w-10" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Fixr
              </h1>
            </div>
            <Link href="/add-handyman">
              <Button 
                data-testid="button-add-handyman"
                variant="outline"
                className="border-primary/50 hover:border-primary hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]"
              >
                <Wrench className="h-4 w-4 mr-2" />
                Add Handyman
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-12">
        <section className="text-center py-12 space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold">
            Find Skilled{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Handymen
            </span>{" "}
            Near You
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Connect with verified professionals for all your home repair and maintenance needs
          </p>
          <div className="flex justify-center pt-4">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search by skill (e.g., electrical, plumbing)..."
            />
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-semibold mb-6">Browse by Category</h3>
          <CategoryGrid
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold">
              {selectedCategory ? `${selectedCategory} Professionals` : "Available Handymen"}
            </h3>
            <p className="text-muted-foreground">
              {filteredHandymen.length} {filteredHandymen.length === 1 ? 'professional' : 'professionals'} found
            </p>
          </div>
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading handymen...</p>
            </div>
          ) : (
            <HandymanGrid handymen={filteredHandymen} />
          )}
        </section>

        <section>
          <h3 className="text-2xl font-semibold mb-6">Handymen Locations</h3>
          <Map handymen={filteredHandymen} />
        </section>
      </main>

      <footer className="border-t border-border mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 Fixr. Connecting you with skilled professionals.</p>
        </div>
      </footer>

      <InstallPrompt />
    </div>
  );
}
