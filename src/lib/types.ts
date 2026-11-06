export type City = "القاهرة" | "مدينة نصر" | "مصر الجديدة" | "التجمع الخامس" | "المعادي" | "المهندسين" | string;

export interface Branch {
  id: string;
  name: string;
  city: City;
  address: string;
  phone: string;
  phone2?: string;
  whatsapp: string; // international format without + e.g. 201010400507
  hours: string;
  mapUrl: string;
  services: string[];
  deliveryFee: number;
  minOrder: number;
  deliveryAreas: string[];
  isActive: boolean;
}

export type Intent =
  | "shawarma"
  | "grills"
  | "fatteh"
  | "appetizers"
  | "sandwiches"
  | "family"
  | "sides"
  | "offers";

export interface Category {
  id: string;
  nameAr: string;
  nameEn?: string;
  slug: string;
  intent: Intent;
  icon: string;
  image: string;
  sortOrder: number;
}

export interface ProductSize {
  id: string;
  label: string;
  price: number;
}

export interface ProductAddon {
  id: string;
  label: string;
  price: number;
}

export type Taste = "sweet" | "savory";

export interface Product {
  id: string;
  categoryId: string;
  nameAr: string;
  nameEn?: string;
  descriptionAr: string;
  descriptionEn?: string;
  badge?: string;
  calories?: number;
  isSpicy?: boolean;
  image: string;
  model3d?: string;
  sizes: ProductSize[];
  addons: ProductAddon[];
  taste: Taste;
  isAvailable: boolean;
  isBestSeller: boolean;
  isNew: boolean;
  forFamily: boolean;
  unavailableBranches: string[];
}

export interface Offer {
  id: string;
  title: string;
  titleEn?: string;
  badge?: string;
  description: string;
  image: string;
  oldPrice: number;
  price: number;
  startsAt: string;
  endsAt: string;
  branchIds: string[]; // empty = all
  terms: string;
  isActive: boolean;
}

export type OrderStatus = "new" | "preparing" | "delivering" | "done" | "cancelled";

export interface OrderItem {
  productId: string;
  name: string;
  sizeLabel?: string;
  addons: string[];
  note?: string;
  unitPrice: number;
  qty: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  branchId: string;
  customerName: string;
  customerPhone: string;
  orderType: "delivery" | "pickup";
  address?: string;
  paymentMethod: string;
  notes?: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
}

export type OccasionStatus = "new" | "contacted" | "confirmed" | "done" | "cancelled";

export interface OccasionRequest {
  id: string;
  name: string;
  phone: string;
  type: string;
  quantity: string;
  date: string;
  branchId: string;
  details: string;
  status: OccasionStatus;
  createdAt: string;
}

export interface Review {
  id: string;
  name: string;
  text: string;
  rating: number;
}

export interface Settings {
  brandName: string;
  facebook: string;
  instagram: string;
  tiktok: string;
  email?: string;
  linktree?: string;
  talabat: string;
  complaintsWhatsapp?: string;
  taxId?: string;
  adminUsername?: string;
  adminPassword: string;
}

export interface DB {
  settings: Settings;
  branches: Branch[];
  categories: Category[];
  products: Product[];
  offers: Offer[];
  orders: Order[];
  occasions: OccasionRequest[];
  reviews: Review[];
}
