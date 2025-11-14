import type { Category } from "@/types";

export interface CategorySection {
  title: string;
  subtitle?: string;
  icon?: string;
  categories: Category[];
}

export const CATEGORY_SECTIONS: CategorySection[] = [
  {
    title: "Core Trades",
    subtitle: "For major repairs & builds",
    icon: "🛠️",
    categories: [
      { name: "Carpentry", icon: "🪚" },
      { name: "Drywall & Plastering", icon: "🧰" },
      { name: "Electrical", icon: "⚡" },
      { name: "Flooring", icon: "🪵" },
      { name: "HVAC (Heating & Cooling)", icon: "❄️" },
      { name: "Locksmith", icon: "🔑" },
      { name: "Masonry", icon: "🧱" },
      { name: "Painting", icon: "🎨" },
      { name: "Roofing", icon: "🏠" },
      { name: "Tiling", icon: "🧩" },
      { name: "Welding", icon: "🔥" },
    ],
  },
  {
    title: "Home Maintenance",
    subtitle: "Keep your home running smoothly",
    icon: "🏡",
    categories: [
      { name: "Appliance Repair", icon: "🔌" },
      { name: "Cleaning", icon: "🧹" },
      { name: "Gutter Cleaning", icon: "💦" },
      { name: "Home Inspection", icon: "🕵️‍♂️" },
      { name: "Pest Control", icon: "🐜" },
      { name: "Window Cleaning", icon: "🪟" },
    ],
  },
  {
    title: "Outdoor & Landscaping",
    subtitle: "Gardens, lawns and outdoor structures",
    icon: "🌳",
    categories: [
      { name: "Deck & Patio", icon: "🪴" },
      { name: "Fencing", icon: "🚧" },
      { name: "Gardening", icon: "🌿" },
      { name: "Irrigation", icon: "💧" },
      { name: "Landscaping", icon: "🌳" },
      { name: "Lawn Care", icon: "🌾" },
      { name: "Tree Trimming", icon: "🌲" },
    ],
  },
  {
    title: "Interior & Design",
    subtitle: "Small improvements and styling",
    icon: "🛋️",
    categories: [
      { name: "Curtains & Blinds", icon: "🪟" },
      { name: "Furniture Assembly", icon: "🪑" },
      { name: "Interior Design", icon: "🛋️" },
      { name: "Lighting Installation", icon: "💡" },
      { name: "Smart Home Setup", icon: "🏡" },
      { name: "Wallpaper Installation", icon: "🖼️" },
    ],
  },
  {
    title: "Construction & Renovation",
    subtitle: "Larger renovation and building jobs",
    icon: "🏗️",
    categories: [
      { name: "Concrete Work", icon: "🚧" },
      { name: "Demolition", icon: "💥" },
      { name: "General Contracting", icon: "🧱" },
      { name: "Renovation", icon: "🏗️" },
      { name: "Steel Fabrication", icon: "🔩" },
      { name: "Waterproofing", icon: "💦" },
    ],
  },
  {
    title: "Vehicle & Mobility",
    subtitle: "Auto, bikes and tires",
    icon: "🚗",
    categories: [
      { name: "Auto Repair", icon: "🚗" },
      { name: "Battery Replacement", icon: "🔋" },
      { name: "Car Wash", icon: "🧽" },
      { name: "Motorbike Repair", icon: "🏍️" },
      { name: "Tire Services", icon: "🛞" },
    ],
  },
  {
    title: "Tech & Electronics",
    subtitle: "Installations, repairs and networking",
    icon: "💻",
    categories: [
      { name: "CCTV Installation", icon: "📹" },
      { name: "Computer Repair", icon: "💻" },
      { name: "Mobile Phone Repair", icon: "📱" },
      { name: "Networking", icon: "🌐" },
      { name: "Satellite & TV Setup", icon: "📡" },
      { name: "Solar Installation", icon: "☀️" },
    ],
  },
  {
    title: "Safety & Security",
    subtitle: "Protect your home and assets",
    icon: "🛡️",
    categories: [
      { name: "Fire Safety", icon: "🔥" },
      { name: "Gate Automation", icon: "🚪" },
      { name: "Security Systems", icon: "🛡️" },
    ],
  },
  {
    title: "Special & Emergency Services",
    subtitle: "One-off, special and urgent services",
    icon: "🚨",
    categories: [
      { name: "Glass & Mirror Work", icon: "🔍" },
      { name: "Moving Services", icon: "📦" },
      { name: "Pool Maintenance", icon: "🏊" },
      { name: "Signage & Printing", icon: "🪧" },
      { name: "Waste Disposal", icon: "🗑️" },
      { name: "Water Tank Cleaning", icon: "🚰" },
      { name: "24/7 Handyman", icon: "🕒" },
      { name: "Emergency Electrical", icon: "⚠️" },
      { name: "Emergency Plumbing", icon: "🚨" },
      { name: "Flood Cleanup", icon: "🌊" },
      { name: "Storm Damage Repair", icon: "🌩️" },
    ],
  },
];
