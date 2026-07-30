export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
  created_at: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  type: 'product' | 'bead';
  image_url: string | null;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images?: string[];
  image?: string;
  category_id: string;
  stock: number;
  rating?: number;
  original_price?: number;
  is_new?: boolean;
  is_sale?: boolean;
  created_at: string;
}

export interface Bead {
  id: string;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  category_id?: string;
  category?: string;
  color: string;
  material: string;
  size?: string;
  stock?: number;
}

export interface Design {
  id: string;
  user_id: string;
  name: string;
  base_type: 'bracelet' | 'necklace' | 'anklet';
  design_data: any; // JSON
  preview_url: string | null;
  total_price: number;
  created_at: string;
  updated_at: string;
}

export interface DesignItem {
  id: string;
  design_id: string;
  bead_id: string;
  position: number;
  quantity: number;
}

export interface Address {
  id: string;
  user_id: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  is_default: boolean;
}

export interface Coupon {
  id: string;
  code: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  min_order: number | null;
  max_uses: number | null;
  used_count: number;
  expires_at: string | null;
  is_active: boolean;
}

export interface Order {
  id: string;
  user_id: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  shipping_address_id: string;
  coupon_id: string | null;
  created_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string | null;
  design_id: string | null;
  quantity: number;
  price: number;
}

export interface CartItem {
  id: string;
  type: 'product' | 'design';
  product?: Product;
  design?: Design;
  name?: string;
  image?: string;
  beads?: any[];
  quantity: number;
  price: number;
}

export interface Review {
  id: string;
  user_id: string;
  product_id: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface AdminLog {
  id: string;
  admin_id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  details: any;
  created_at: string;
}

export interface PlacedBead {
  id: string;
  bead: Bead;
  position: number;
  x?: number;
  y?: number;
}

export interface BuilderState {
  baseType: 'bracelet' | 'necklace' | 'anklet';
  placedBeads: PlacedBead[];
  selectedBeadId: string | null;
  history: PlacedBead[][];
  historyIndex: number;
  zoom: number;
  totalPrice: number;
}
