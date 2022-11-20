import { IUser } from "./"
import { ISizes } from './products'

export interface IOrder {
  _id?: string
  user?: IUser | string
  orderItems: IOrderItem[]
  shippingAddress: IShippingAddress
  paymentResult?: string
  numberOfItems: number
  subtotal: number
  tax: number
  total: number
  isPaid: boolean
  paidAt?: string
}

export interface IOrderItem {
  _id: string
  title: string
  size: ISizes
  quantity: number
  slug: string
  image: string
  price: number
  gender: string
}

export interface IShippingAddress {
  firstName: string
  lastName: string
  address: string
  address2?: string
  zip: string
  city: string
  country: string
  phone: string
}