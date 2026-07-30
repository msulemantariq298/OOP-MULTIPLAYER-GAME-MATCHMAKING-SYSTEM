import { createClient } from '@/lib/supabase/client'
import { Product, Bead, Category, Design, Order, Review, Coupon, Address } from '@/types'

// Products
export async function getProducts(filters?: { category_id?: string; limit?: number }) {
  const supabase = createClient()
  let query = supabase.from('products').select('*')
  
  if (filters?.category_id) query = query.eq('category_id', filters.category_id)
  if (filters?.limit) query = query.limit(filters.limit)
  
  const { data, error } = await query
  if (error) throw error
  return data as Product[]
}

export async function getProductById(id: string) {
  const supabase = createClient()
  const { data, error } = await supabase.from('products').select('*').eq('id', id).single()
  if (error) throw error
  return data as Product
}

// Beads
export async function getBeads(categoryId?: string) {
  const supabase = createClient()
  let query = supabase.from('beads').select('*')
  
  if (categoryId) query = query.eq('category_id', categoryId)
  
  const { data, error } = await query
  if (error) throw error
  return data as Bead[]
}

export async function getBeadById(id: string) {
  const supabase = createClient()
  const { data, error } = await supabase.from('beads').select('*').eq('id', id).single()
  if (error) throw error
  return data as Bead
}

// Categories
export async function getCategories(type?: 'product' | 'bead') {
  const supabase = createClient()
  let query = supabase.from('categories').select('*')
  
  if (type) query = query.eq('type', type)
  
  const { data, error } = await query
  if (error) throw error
  return data as Category[]
}

// Designs
export async function saveDesign(design: Partial<Design>) {
  const supabase = createClient()
  const { data, error } = await supabase.from('designs').insert(design).select().single()
  if (error) throw error
  return data as Design
}

export async function getUserDesigns(userId: string) {
  const supabase = createClient()
  const { data, error } = await supabase.from('designs').select('*').eq('user_id', userId)
  if (error) throw error
  return data as Design[]
}

// Orders
export async function createOrder(order: Partial<Order>, items: any[]) {
  const supabase = createClient()
  
  // Start a transaction using an RPC or sequentially (easier but less safe without real transactions in client)
  // For simplicity using sequential inserts
  const { data: newOrder, error: orderError } = await supabase
    .from('orders')
    .insert(order)
    .select()
    .single()
    
  if (orderError) throw orderError
  
  const orderItems = items.map(item => ({
    ...item,
    order_id: newOrder.id
  }))
  
  const { error: itemsError } = await supabase.from('order_items').insert(orderItems)
  if (itemsError) throw itemsError
  
  return newOrder as Order
}

export async function getUserOrders(userId: string) {
  const supabase = createClient()
  const { data, error } = await supabase.from('orders').select('*, order_items(*)').eq('user_id', userId)
  if (error) throw error
  return data as Order[]
}

// Reviews
export async function getProductReviews(productId: string) {
  const supabase = createClient()
  const { data, error } = await supabase.from('reviews').select('*, profiles(first_name, last_name, avatar_url)').eq('product_id', productId)
  if (error) throw error
  return data
}

export async function addReview(review: Partial<Review>) {
  const supabase = createClient()
  const { data, error } = await supabase.from('reviews').insert(review).select().single()
  if (error) throw error
  return data as Review
}

// Coupons
export async function validateCoupon(code: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('coupons')
    .select('*')
    .eq('code', code)
    .eq('is_active', true)
    .single()
    
  if (error) return null
  return data as Coupon
}

// Addresses
export async function getUserAddresses(userId: string) {
  const supabase = createClient()
  const { data, error } = await supabase.from('addresses').select('*').eq('user_id', userId)
  if (error) throw error
  return data as Address[]
}
