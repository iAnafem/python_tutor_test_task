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

export type TUserInfo = {
  email: string
  first_name: string
  last_name: string
}

export type TUserDetails  = {
  user: TUserInfo | undefined
  token: string | undefined
}


export type TSignUpInputData  = {
  username?: string
  email?: string
  password?: string
  first_name?: string
  last_name?: string
}