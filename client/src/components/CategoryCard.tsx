import { Card } from "@/components/ui/card";

interface CategoryCardProps {
  name: string;
  icon: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function CategoryCard({ name, icon, isSelected = false, onClick }: CategoryCardProps) {
  return (
    <Card
      data-testid={`card-category-${name.toLowerCase()}`}
      className={`
        cursor-pointer transition-all duration-300 p-6 
        hover-elevate active-elevate-2
        ${isSelected 
          ? 'border-primary shadow-[0_0_20px_rgba(34,211,238,0.4)]' 
          : 'border-card-border'
        }
      `}
      onClick={onClick}
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <div className={`text-4xl ${isSelected ? 'scale-110' : ''} transition-transform duration-300`}>
          {icon}
        </div>
        <h3 className={`font-semibold ${isSelected ? 'text-primary' : 'text-foreground'}`}>
          {name}
        </h3>
      </div>
    </Card>
  );
}
