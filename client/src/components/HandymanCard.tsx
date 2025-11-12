import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, MessageCircle } from "lucide-react";
import type { Handyman } from "@/types";

interface HandymanCardProps {
  handyman: Handyman;
}

export default function HandymanCard({ handyman }: HandymanCardProps) {
  const getProfileImage = (type: string) => {
    const images: Record<string, string> = {
      electrician: "/src/../attached_assets/generated_images/Male_electrician_portrait_be343d94.png",
      plumber: "/src/../attached_assets/generated_images/Female_plumber_portrait_adca515e.png",
      carpenter: "/src/../attached_assets/generated_images/Male_carpenter_portrait_62b1daf5.png",
      hvac: "/src/../attached_assets/generated_images/Female_HVAC_technician_portrait_5b99acf2.png",
      painter: "/src/../attached_assets/generated_images/Male_painter_portrait_1a007cd4.png",
    };
    return images[type] || images.electrician;
  };

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${handyman.whatsapp}`, '_blank');
  };

  return (
    <Card 
      data-testid={`card-handyman-${handyman.id}`}
      className="overflow-hidden hover-elevate transition-all duration-300"
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16 ring-2 ring-primary/20">
            <AvatarImage src={getProfileImage(handyman.profilePicture)} alt={handyman.name} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {handyman.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg mb-1" data-testid={`text-name-${handyman.id}`}>
              {handyman.name}
            </h3>
            
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="font-medium text-primary" data-testid={`text-rating-${handyman.id}`}>
                  {handyman.rating}
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                ({handyman.reviews} reviews)
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {handyman.skills.map((skill, index) => (
                <Badge 
                  key={index}
                  variant="secondary"
                  className="text-xs"
                  data-testid={`badge-skill-${handyman.id}-${index}`}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button
          data-testid={`button-whatsapp-${handyman.id}`}
          onClick={handleWhatsAppClick}
          className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white"
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Contact on WhatsApp
        </Button>
      </CardFooter>
    </Card>
  );
}
