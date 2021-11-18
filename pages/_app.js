import '../styles/globals.css'
import { CartContext, useStoreState } from '../hooks/use-store.js';

export default function App({ Component, pageProps }) {
  const store = useStoreState()
  return (
    <CartContext.Provider value={store}>
      <Component {...pageProps} />
    </CartContext.Provider>
  )
}
