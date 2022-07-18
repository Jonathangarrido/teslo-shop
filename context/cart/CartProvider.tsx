import { useEffect, useReducer } from 'react'
import Cookie from 'js-cookie'

import { ICartProduct } from '../../interfaces'
import { CartContext, cartReducer } from './'

export interface CartState {
  cart: ICartProduct[]
  numberOfItems: number
  subTotal: number
  tax: number
  total: number
}

const CART_INITIAL_STATE: CartState = {
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

  return (
    <CartContext.Provider
      value={{ ...state, addProductToCart, updateCartQuantity, removeCartProduct }}>
      {children}
    </CartContext.Provider>
  )
}
