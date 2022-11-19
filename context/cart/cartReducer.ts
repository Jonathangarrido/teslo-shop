import { ICartProduct } from '../../interfaces'
import { CartState, IShippingAddress } from './'

type CartActionType = 
| { type: 'Cart - LoadCart from cookies | storage', payload: ICartProduct[] }
| { type: 'Cart - Update products in cart', payload: ICartProduct[] }
| { type: 'Cart - Change cart quantity', payload: ICartProduct }
| { type: 'Cart - Remove product in cart', payload: ICartProduct }
| { type: 'Cart - LoadAddress from cookies', payload: IShippingAddress }
| { type: 'Cart - Update address', payload: IShippingAddress }
| { 
    type: 'Cart - Update orden summary', 
    payload: {
      numberOfItems: number
      subTotal: number
      tax: number
      total: number
    }
  }

export const cartReducer = (state: CartState, action: CartActionType): CartState => {
  switch (action.type) {
    case 'Cart - LoadCart from cookies | storage':
      return {...state, cart: action.payload, isLoaded: true}
    case 'Cart - Update products in cart':
      return {...state, cart: action.payload}
    case 'Cart - Change cart quantity':
      return {...state, cart: changeQuantity(state.cart, action.payload)}
    case 'Cart - Remove product in cart':
      return {...state, cart: removeProduct(state.cart, action.payload)}
    case 'Cart - Update orden summary':
      return {...state, ...action.payload}
    case 'Cart - LoadAddress from cookies':
    case 'Cart - Update address':
      return {...state, shippingAddress: action.payload}
    default:
      return state
  }
}

const changeQuantity = (cart: ICartProduct[], product: ICartProduct):ICartProduct[]  => {
  return cart.map(item=> {
    if(item._id === product._id && item.size === product.size){
      return product
    }
    return item
  })
}

const removeProduct = (cart: ICartProduct[], product: ICartProduct):ICartProduct[]  => {
  return cart.filter(item=> !(item._id === product._id && item.size === product.size))
}