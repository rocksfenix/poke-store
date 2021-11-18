import { getStorageItem, setStorageItem } from './storage'

const HOST = process.env.NEXT_PUBLIC_VERCEL_URL
const ENCHANGE_API_KEY = process.env.NEXT_PUBLIC_ENCHANGE_API_KEY

// To avoid quora limit
const CACHE_RATES = 'rates'

let cache = getStorageItem(CACHE_RATES)

const api = {
  getPokemons: async (offset = 0, limit = 20) => {
    try {
      const res = await window.fetch(`${HOST}/api/pokemons?offset=${offset}&limit=${limit}`)
      return res.json()
    } catch (error) {
      throw new Error(error)
    }
  },

  getPokemonByName: async (name) => {
    try {
      const res = await window.fetch(`${HOST}/api/pokemons/${name}`)
      return res.json()
    } catch (error) {
      throw new Error(error)
    }
  },

  calculeExhcangeRate: async ({ origin = 'MXN', currency = 'USD' }) => {
    try {
      const res = await window.fetch(`https://free.currconv.com/api/v7/convert?q=${currency}_${origin}&apiKey=${ENCHANGE_API_KEY}`)
      return res.json()
    } catch (error) {
      throw new Error(error)
    }
  },

  getExchangeRates: async (base = 'MXN') => {
    if (cache) return cache

    try {
      const currencies = [
        'AUD',
        'CAD',
        'CHF',
        'CNY',
        'GBP',
        'JPY',
        'USD',
        'MXN'
      ]
      .map(currency => `${currency}_${base}`)

      const res = await Promise.all(
        currencies.map(query => window.fetch(`https://free.currconv.com/api/v7/convert?q=${query}&apiKey=${ENCHANGE_API_KEY}`))
      )

      const results = await Promise.all(
        res.map(res => res.json())
      )

      const data = results.map(result => {
        const key = Object.keys(result.results)[0]
        return result.results[key]
      })

      cache = data
      setStorageItem(CACHE_RATES, data)
      
      return data
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default api
