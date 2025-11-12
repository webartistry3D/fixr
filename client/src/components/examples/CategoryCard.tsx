import { useState } from "react";
import CategoryCard from "../CategoryCard";

export default function CategoryCardExample() {
  const [selected, setSelected] = useState<string | null>("Electrical");

  const categories = [
    { name: "Electrical", icon: "⚡" },
    { name: "Plumbing", icon: "🔧" },
    { name: "Carpentry", icon: "🪚" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-8 bg-background">
      {categories.map((cat) => (
        <CategoryCard
          key={cat.name}
          name={cat.name}
          icon={cat.icon}
          isSelected={selected === cat.name}
          onClick={() => {
            setSelected(cat.name);
            console.log(`Category ${cat.name} selected`);
          }}
        />
      ))}
    </div>
  );
}
