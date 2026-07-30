export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Create Your Own', href: '/builder' },
  { label: 'Collections', href: '/collections' },
  { label: 'About', href: '/about' },
]

export const FOOTER_LINKS = {
  shop: [
    { label: 'All Jewelry', href: '/shop' },
    { label: 'Necklaces', href: '/shop?category=necklaces' },
    { label: 'Bracelets', href: '/shop?category=bracelets' },
    { label: 'Rings', href: '/shop?category=rings' },
    { label: 'Earrings', href: '/shop?category=earrings' },
  ],
  support: [
    { label: 'FAQ', href: '/faq' },
    { label: 'Shipping & Returns', href: '/shipping' },
    { label: 'Care Guide', href: '/care-guide' },
    { label: 'Contact Us', href: '/contact' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Sustainability', href: '/sustainability' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
  ],
}

export const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com/velora', icon: 'instagram' },
  { label: 'TikTok', href: 'https://tiktok.com/@velora', icon: 'tiktok' },
  { label: 'Pinterest', href: 'https://pinterest.com/velora', icon: 'pinterest' },
]

export const BUILDER_BASE_TYPES = [
  { id: 'bracelet', label: 'Bracelet', price: 49.99, length: 18 },
  { id: 'necklace', label: 'Necklace', price: 89.99, length: 45 },
  { id: 'anklet', label: 'Anklet', price: 39.99, length: 25 },
]

export const BEAD_CATEGORIES = [
  { id: 'gemstones', label: 'Gemstones' },
  { id: 'gold', label: 'Gold & Silver' },
  { id: 'pearls', label: 'Pearls' },
  { id: 'charms', label: 'Charms' },
  { id: 'glass', label: 'Glass & Enamel' },
]

export const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest Arrivals' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
]

export const ORDER_STATUSES = [
  { value: 'pending', label: 'Pending' },
  { value: 'processing', label: 'Processing' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
]
