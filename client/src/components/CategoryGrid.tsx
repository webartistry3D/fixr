import type { Category } from "@/types";
import CategoryCard from "./CategoryCard";

interface CategoryGridProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

export default function CategoryGrid({ categories, selectedCategory, onCategorySelect }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {categories.map((category) => (
        <CategoryCard
          key={category.name}
          name={category.name}
          icon={category.icon}
          isSelected={selectedCategory === category.name}
          onClick={() => {
            onCategorySelect(selectedCategory === category.name ? null : category.name);
          }}
        />
      ))}
    </div>
  );
}
