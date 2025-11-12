import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Handyman } from "@/types";

export default function AddHandyman() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    skills: "",
    rating: "5.0",
    whatsapp: "",
    category: "",
    latitude: "40.7589",
    longitude: "-73.9851",
    profilePicture: "electrician"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const existingData = localStorage.getItem('handymen');
    const handymen: Handyman[] = existingData ? JSON.parse(existingData) : [];

    const newHandyman: Handyman = {
      id: Date.now().toString(),
      name: formData.name,
      skills: formData.skills.split(',').map(s => s.trim()),
      rating: parseFloat(formData.rating),
      reviews: 0,
      whatsapp: formData.whatsapp,
      profilePicture: formData.profilePicture,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
      category: formData.category || formData.skills.split(',')[0].trim()
    };

    handymen.push(newHandyman);
    localStorage.setItem('handymen', JSON.stringify(handymen));

    toast({
      title: "Success!",
      description: `${formData.name} has been added successfully.`,
    });

    setTimeout(() => {
      setLocation('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Button
            data-testid="button-back"
            variant="ghost"
            onClick={() => setLocation('/')}
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
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  data-testid="input-name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., John Smith"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Skills (comma-separated) *</Label>
                <Input
                  id="skills"
                  data-testid="input-skills"
                  required
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  placeholder="e.g., Electrical, Wiring, Lighting"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Input
                  id="category"
                  data-testid="input-category"
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g., Electrical"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating (0-5) *</Label>
                  <Input
                    id="rating"
                    data-testid="input-rating"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    required
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp Number *</Label>
                  <Input
                    id="whatsapp"
                    data-testid="input-whatsapp"
                    type="tel"
                    required
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    placeholder="+1234567890"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="latitude">Latitude *</Label>
                  <Input
                    id="latitude"
                    data-testid="input-latitude"
                    type="number"
                    step="any"
                    required
                    value={formData.latitude}
                    onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="longitude">Longitude *</Label>
                  <Input
                    id="longitude"
                    data-testid="input-longitude"
                    type="number"
                    step="any"
                    required
                    value={formData.longitude}
                    onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="profilePicture">Profile Picture Type</Label>
                <select
                  id="profilePicture"
                  data-testid="select-profile-picture"
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  value={formData.profilePicture}
                  onChange={(e) => setFormData({ ...formData, profilePicture: e.target.value })}
                >
                  <option value="electrician">Electrician</option>
                  <option value="plumber">Plumber</option>
                  <option value="carpenter">Carpenter</option>
                  <option value="hvac">HVAC Technician</option>
                  <option value="painter">Painter</option>
                </select>
              </div>

              <Button
                data-testid="button-submit"
                type="submit"
                className="w-full"
                size="lg"
              >
                Add Handyman
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
