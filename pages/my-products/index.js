import { BiPurchaseTag } from 'react-icons/bi'
import Grid from '../../components/grid'
import Layout from '../../components/layout'
import { useStore } from '../../hooks/use-store'
import Card from '../../components/card-purchased'

export default function MyProducts() {
  const { cart } = useStore('MXN')

  const producsts = Object
    .keys(cart.purchasedProducts)
    .map(key => {
      return cart.purchasedProducts[key]
    })

  return (
    <Layout>
      <h1><BiPurchaseTag />My Purchases</h1>
      <Grid>
        {producsts.map(pokemon => (
          <Card
            key={pokemon.name}
            product={pokemon}
            purchased
          />
        ))}
      </Grid>
    </Layout>
  )
}
