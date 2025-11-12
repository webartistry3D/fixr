import { useState } from "react";
import CategoryGrid from "../CategoryGrid";

export default function CategoryGridExample() {
  const [selected, setSelected] = useState<string | null>(null);

  const categories = [
    { name: "Electrical", icon: "⚡" },
    { name: "Plumbing", icon: "🔧" },
    { name: "Carpentry", icon: "🪚" },
    { name: "HVAC", icon: "❄️" },
    { name: "Painting", icon: "🎨" },
    { name: "Locksmith", icon: "🔑" },
  ];

  return (
    <div className="p-8 bg-background">
      <CategoryGrid
        categories={categories}
        selectedCategory={selected}
        onCategorySelect={(cat) => {
          setSelected(cat);
          console.log("Selected category:", cat);
        }}
      />
    </div>
  );
}
