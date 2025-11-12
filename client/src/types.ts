export interface Handyman {
  id: string;
  name: string;
  skills: string[];
  rating: number;
  reviews: number;
  whatsapp: string;
  profilePicture: string;
  latitude: number;
  longitude: number;
  category: string;
}

export interface Category {
  name: string;
  icon: string;
}
