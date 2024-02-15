export interface ProductDTOOut {
  id: string
  name: string
  price: number
  category: string
  offer_id: string | null
}

export interface ProductCart extends ProductDTOOut {
  quantity: number
  total: number
}
