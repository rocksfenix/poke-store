import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import cf from 'currency-formatter'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { BeatLoader } from 'react-spinners' 
import { MdRemoveShoppingCart } from 'react-icons/md'

import Table from '../components/table'
import Layout from '../components/layout'
import { useStore } from '../hooks/use-store'
import ErrorBox from '../components/error-box'
import CheckoutButton from '../components/checkout-button'

const CheckoutBox = styled.div`
  max-width: 300px;
`

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 3em;
`

export default function Cart() {
  const [fetching, setFetching] = useState(false)
  const router = useRouter()
  const [error, setError] = useState(null)
  const { cartItems, removeProduct, checkout, balance } = useStore('MXN')
  
  const totalInLocalCurrency = cartItems.reduce((prev, next) => {
    if (typeof prev === 'number') {
      return prev + next.totalPrice
    }
    return prev.totalPrice + next.totalPrice
  }, 0)

  function handleCheckout () {
    setFetching(true)
    checkout().then((res) => {
      if (res.error) {
        setError(res.error)
      }
      setFetching(false)
      window.setTimeout(() => setError(false), 3000)
      if (res.success) {
        router.replace('/my-products')
      }
    })
  }

  const data = cartItems.map(product => ({
    ...product,
    price: getPrice(product),
    image: getImage(product),
    exchange: getExchange(product),
    totalPrice:  getTotalPrice(product),
    removeItem: getRemoveButton(product, removeProduct)
  }))

  const total = cf.format(totalInLocalCurrency, { code: 'MXN' })

  const insuficient = balance < totalInLocalCurrency
  console.log('balance', balance)

  return (
    <Layout title='Shopping Cart'>
      <Container>
        <h1>Shopping Cart</h1>
        <Table
          data={data}
          columns={columns}
        />
        {insuficient && <ErrorBox>Insufficient Balance</ErrorBox>}
        {error && <ErrorBox>{error}</ErrorBox>}
        
        <CheckoutBox>
          <h2>Total: {total} MXN</h2>
          {insuficient && (
            <Link href='/balance'>
              <CheckoutButton>
                Apply Credit
              </CheckoutButton>
            </Link>
          )}
          {!insuficient && (
            <CheckoutButton onClick={handleCheckout}>
              {!fetching && (
                <span>Procced To Checkout </span>
              )}
              {fetching && (
                <span>
                  Processing <BeatLoader color='#FFF' size={13}/>
                </span>
              )}
            </CheckoutButton>
          )}
        </CheckoutBox>
      </Container>
    </Layout>
  )
}

const columns = [
  {
    columnId: 'name',
    Header: 'Product Name'
  },
  {
    columnId: 'image',
    Header: 'Image'
  },
  {
    columnId: 'removeItem',
    Header: ''
  },
  {
    columnId: 'price',
    Header: 'Price original Currency'
  },
  {
    columnId: 'exchange',
    Header: 'Exchange Convertion'
  },
  {
    columnId: 'totalPrice',
    Header: 'Total to Pay'
  }
]

const getPrice = (product) => (
  <span>
    {cf.format(product.price, { code: product.currency })}
    <span> {product.currency}</span>
  </span>
)

const getImage = (product) => (
  <Image
    src={product.sprites.normal}
    alt={product.name}
    width={50}
    height={50}
  />
)

const getExchange = (product) => (
  <span>
    1  {product.currency} = {product.exchange} {product.defaultCurrency}
  </span>
)

const getTotalPrice = (product) => (
  <span>
    {cf.format(product.totalPrice, { code: 'MXN' })}
  </span>
)

const getRemoveButton = (product, removeProduct) => (
  <button onClick={() => removeProduct(product)}>
    Remove <MdRemoveShoppingCart />
  </button>
)
