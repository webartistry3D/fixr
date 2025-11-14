import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Handyman } from "@/types";

import DynamicMap from "@/components/HandymanMap"; // <-- NEW map component

export default function AddHandyman() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    skills: "",
    rating: "5.0",
    whatsapp: "",
    category: "",
    address: "",
    profilePicture: ""
  });

  // Automatically updated when address gets coordinates
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null
  );

  const [isGeocoding, setIsGeocoding] = useState(false);

  // -------------------------------------------------------------------------
  // Convert Address → Latitude/Longitude using OpenStreetMap Nominatim
  // -------------------------------------------------------------------------
  const geocodeAddress = async (address: string) => {
    if (!address.trim()) return null;

    try {
      setIsGeocoding(true);

      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          address
        )}`
      );

      const data = await res.json();

      if (data && data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon)
        };
      }
      return null;
    } catch (err) {
      console.error("Geocoding error:", err);
      return null;
    } finally {
      setIsGeocoding(false);
    }
  };

  // Auto-geocode whenever user changes the address field
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (formData.address.length < 5) return;

      const c = await geocodeAddress(formData.address);
      if (c) setCoords(c);
    }, 700); // debounce typing

    return () => clearTimeout(timer);
  }, [formData.address]);

  // -------------------------------------------------------------------------
  // Form Submit
  // -------------------------------------------------------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure coordinates exist
    if (!coords) {
      toast({
        title: "Address Not Found",
        description: "Please enter a more accurate address.",
        variant: "destructive"
      });
      return;
    }

    const existingData = localStorage.getItem("handymen");
    const handymen: Handyman[] = existingData ? JSON.parse(existingData) : [];

    const newHandyman: Handyman = {
      id: Date.now().toString(),
      name: formData.name,
      skills: formData.skills.split(",").map((s) => s.trim()),
      rating: parseFloat(formData.rating),
      reviews: 0,
      whatsapp: formData.whatsapp,
      profilePicture: formData.profilePicture,
      category: formData.category || formData.skills.split(",")[0]?.trim(),
      address: formData.address,

      location: {
        lat: coords.lat,
        lng: coords.lng
      }
    };

    handymen.push(newHandyman);
    localStorage.setItem("handymen", JSON.stringify(handymen));

    toast({
      title: "Success!",
      description: `${formData.name} has been added successfully.`
    });

    setTimeout(() => {
      setLocation("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => setLocation("/")}
            className="hover-elevate"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl">Add New Handyman</CardTitle>
            <CardDescription>
              Fill out the form below to add a new handyman to the directory
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g., John Smith"
                />
              </div>

              {/* Skills */}
              <div className="space-y-2">
                <Label htmlFor="skills">Skills (comma-separated) *</Label>
                <Input
                  id="skills"
                  required
                  value={formData.skills}
                  onChange={(e) =>
                    setFormData({ ...formData, skills: e.target.value })
                  }
                  placeholder="e.g., Electrical, Wiring, Lighting"
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Input
                  id="category"
                  required
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  placeholder="e.g., Electrical"
                />
              </div>

              {/* Rating + WhatsApp */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating *</Label>
                  <Input
                    id="rating"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    required
                    value={formData.rating}
                    onChange={(e) =>
                      setFormData({ ...formData, rating: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp *</Label>
                  <Input
                    id="whatsapp"
                    type="tel"
                    required
                    value={formData.whatsapp}
                    onChange={(e) =>
                      setFormData({ ...formData, whatsapp: e.target.value })
                    }
                    placeholder="+2348012345678"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address">Address *</Label>
                <Input
                  id="address"
                  required
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder="e.g., Admiralty Way, Lekki Phase 1"
                />
                {isGeocoding && (
                  <p className="text-sm text-muted-foreground">
                    Geocoding address…
                  </p>
                )}
              </div>

              {/* Profile Picture Select */}
              <div className="space-y-2">
                <Label htmlFor="profilePicture">Profile Picture Type</Label>
                <select
                  id="profilePicture"
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  value={formData.profilePicture}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      profilePicture: e.target.value
                    })
                  }
                >
                  <option value="electrician">Electrician</option>
                  <option value="plumber">Plumber</option>
                  <option value="carpenter">Carpenter</option>
                  <option value="hvac">HVAC Technician</option>
                  <option value="painter">Painter</option>
                </select>
              </div>

              {/* -------------------- MAP COMPONENT -------------------- */}
              <div className="pt-4">
                <Label>Location Preview</Label>
                <div className="h-64 rounded-md overflow-hidden border border-border mt-2">
                  <DynamicMap coords={coords} />
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Add Handyman
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
