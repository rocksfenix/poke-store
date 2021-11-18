import { useRouter } from 'next/router'
import { BiPurchaseTag } from 'react-icons/bi'

import Center from '../../components/center'
import Layout from '../../components/layout'
import { useStore } from '../../hooks/use-store'

export default function MyProducts() {
  const router = useRouter()
  const { cart } = useStore('MXN')
  const { name } = router.query
  const product = cart.purchasedProducts[name] || {}

  return (
    <Layout title={`${name} details`}>
      <Center>
        <h1><BiPurchaseTag />Pokemon: {name}</h1>
        <h3>Bought on {product?.purchasedDate}</h3>
        <img
          alt={product.name}
          src={product?.sprites?.large}
        />
      </Center>
    </Layout>
  )
}
