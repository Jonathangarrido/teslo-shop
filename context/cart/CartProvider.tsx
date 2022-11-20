import { useEffect, useReducer } from 'react'
import Cookie from 'js-cookie'

import { ICartProduct, IShippingAddress } from '../../interfaces'
import { CartContext, cartReducer } from './'
import Cookies from 'js-cookie'

export interface CartState {
  isLoaded: boolean
  cart: ICartProduct[]
  numberOfItems: number
  subTotal: number
  tax: number
  total: number
  shippingAddress?: IShippingAddress
}

const CART_INITIAL_STATE: CartState = {
  isLoaded: false,
  cart: [],
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0,
}

interface props {
  children: React.ReactNode
}

export const CartProvider = ({ children }: props) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE)

  useEffect(() => {
    try {
      const newCart = JSON.parse(Cookie.get('cart') ?? '[]')
      if (newCart.length > 0) {
        dispatch({ type: 'Cart - LoadCart from cookies | storage', payload: newCart })
      }
    } catch (error) {
      dispatch({ type: 'Cart - LoadCart from cookies | storage', payload: [] })
    }
  }, [])

  useEffect(() => {
    if (Cookies.get('firstName')) {
      const shippingAddress = {
        firstName: Cookies.get('firstName') || '',
        lastName: Cookies.get('lastName') || '',
        address: Cookies.get('address') || '',
        address2: Cookies.get('address2') || '',
        zip: Cookies.get('zip') || '',
        city: Cookies.get('city') || '',
        country: Cookies.get('country') || 'CHL',
        phone: Cookies.get('phone') || '',
      }

      dispatch({ type: 'Cart - LoadAddress from cookies', payload: shippingAddress })
    }
  }, [])

  useEffect(() => {
    Cookie.set('cart', JSON.stringify(state.cart))
  }, [state.cart])

  useEffect(() => {
    let numberOfItems = 0
    let subTotal = 0

    state.cart.forEach((item) => {
      numberOfItems += item.quantity
      subTotal += item.quantity * item.price
    })

    const tax = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0)

    dispatch({
      type: 'Cart - Update orden summary',
      payload: {
        numberOfItems,
        subTotal,
        tax: subTotal * tax,
        total: subTotal * (tax + 1),
      },
    })
  }, [state.cart])

  const addProductToCart = (product: ICartProduct) => {
    const productInCart = state.cart.find(
      (item) => item._id === product._id && item.size === product.size
    )
    if (!productInCart) {
      return dispatch({ type: 'Cart - Update products in cart', payload: [...state.cart, product] })
    }

    const updateProducts = state.cart.map((item) => {
      if (item._id === product._id && item.size === product.size) {
        item.quantity += product.quantity
      }
      return item
    })

    dispatch({ type: 'Cart - Update products in cart', payload: updateProducts })
  }

  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({ type: 'Cart - Change cart quantity', payload: product })
  }

  const removeCartProduct = (product: ICartProduct) => {
    dispatch({ type: 'Cart - Remove product in cart', payload: product })
  }

  const updateAddress = (address: IShippingAddress) => {
    Cookies.set('firstName', address.firstName)
    Cookies.set('lastName', address.lastName)
    Cookies.set('address', address.address)
    Cookies.set('address2', address.address2 || '')
    Cookies.set('zip', address.zip)
    Cookies.set('city', address.city)
    Cookies.set('country', address.country)
    Cookies.set('phone', address.phone)
    dispatch({ type: 'Cart - Update address', payload: address })
  }

  return (
    <CartContext.Provider
      value={{ ...state, addProductToCart, updateCartQuantity, removeCartProduct, updateAddress }}>
      {children}
    </CartContext.Provider>
  )
}
