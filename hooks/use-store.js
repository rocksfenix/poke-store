import omit from 'lodash/omit'
import { useState, useEffect, useContext, createContext } from 'react'
import { getStorageItem, setStorageItem } from '../utils/storage'
import api from '../utils/api'
import delay from '../utils/delay'

const STORE_STATE_KEY = 'POKE_STORE'

const defaultStore = {
  // Represents the product in the shopin cart
  products: {},

  // Represents the products purchased
  purchasedProducts: {},

  // Represents the simulated credits
  balance: 0
}

export const CartContext = createContext()

export function useStoreState (defaultCurrency = 'MXN') {
  const [cart, setCart] = useState(defaultStore)

  useEffect(() => {
    const data = getStorageItem(STORE_STATE_KEY)
    if ( data ) {
      setCart(data)
    }
  }, [])

  useEffect(() => {
    setStorageItem(STORE_STATE_KEY, cart)
  }, [cart])

  async function addProduct(item) {
    try {
      if (!cart.products[item.name]) {
        // Calculating the total price and exchange rates
        const { results } = await api.calculeExhcangeRate({
          origin: defaultCurrency,
          currency: item.currency
        })

        const exchange = results[`${item.currency}_${defaultCurrency}`].val
        const totalPrice = item.price * exchange
        const purchasedDate = new Date().toTimeString()

        setCart(prev => ({
          ...prev,
          products: {
            ...prev.products,
            [item.name]: {
              ...item,
              totalPrice,
              exchange,
              defaultCurrency,
              purchasedDate
            }
          }
        }))
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  function removeProduct(item) {
    setCart(prev => ({
      ...prev,
      products: omit(prev.products, item.name)
    }))
  }

  function addBalance (balance) {
    setCart(prev => ({
      ...prev,
      balance: prev.balance + balance
    }))
  }

  function getTotalCart (state) {
    const totalInLocalCurrency = Object
      .keys(state.products)
        .map(key => (
          state.products[key].totalPrice
        ))
      .reduce((prev, next) => (
        prev + next
      ), 0)

    return totalInLocalCurrency
  }

  async function checkout() {
    const totalInLocalCurrency = getTotalCart(cart)
    if (cart.balance < totalInLocalCurrency) {
      return {
        error: 'Insuficient Balance'
      }
    }

    try {
      await delay()
      // Adding the purchased products
      setCart((prev) => ({
        ...prev,
        products: {},
        balance: prev.balance - totalInLocalCurrency,
        purchasedProducts: {
          ...prev.purchasedProducts,
          ...prev.products
        }
      }))
      return { success: true }
    } catch (error) {
      throw new Error(error)
    }
  }

  const cartItems = Object
    .keys(cart.products)
    .map(key => {
      return cart.products[key]
    })

  return {
    cart,
    addProduct,
    removeProduct,
    cartItems,
    addBalance,
    checkout,
    balance: cart.balance
  }
}

export function useStore() {
  const store = useContext(CartContext)
  return store
}

