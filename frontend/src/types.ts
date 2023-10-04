export type TCategory = {
  id: Number
  name: String
}
export type TProductsInfo  = {
  id: Number
  title: String
  categories: TCategory[]
  is_active: Boolean
  price: Number
  prev_month_orders_qty: Number
  curr_month_orders_qty: Number
}