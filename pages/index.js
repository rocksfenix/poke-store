import { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import api from '../utils/api'
import Card from '../components/card'
import Grid from '../components/grid'
import Title from '../components/title'
import Center from '../components/center'
import Layout from '../components/layout'
import Spinner from '../components/spinner'
import ErrorBox from '../components/error-box'
import { useStore } from '../hooks/use-store'

export default function Home() {
  const [pokemons, setPokemons] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filterPurchased, setFilterPurchased] = useState(false)
  const { cart, addProduct, removeProduct } = useStore('MXN')

  useEffect(() => {
    setLoading(false)
    api
      .getPokemons()
      .then(data => {
        setLoading(false)
        setTotal(data.total)
        setHasMore(data.hasMore)
        setPokemons(data.pokemons)
      })
      .catch(error => {
        setError(error.message)
      })
  }, [])

  function loadMore () {
    window.setTimeout(() => {
      api
        .getPokemons(pokemons.length )
        .then(data => {
          setPokemons([
            ...pokemons,
            ...data.pokemons
          ])
          setHasMore(data.hasMore)
        })
    }, 1000)
  }

  function toggleFilter () {
    setFilterPurchased(!filterPurchased)
  }

  const producsts = filterPurchased
    ? pokemons
    : pokemons.filter(
      pokemon => !cart.purchasedProducts[pokemon.name]
    )

  return (
    <Layout>
      <Title>Poke Store</Title>
      <Center>
        <button onClick={toggleFilter}>
          {filterPurchased ? 'Hide' : 'Filter'} Purchased
        </button>
      </Center>
      {loading && <Spinner/>}
      {error && <ErrorBox>{error}</ErrorBox>}
      <InfiniteScroll
        dataLength={pokemons.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<Spinner />}
      >
      <Grid>
        {producsts.map(pokemon => (
          <Card
            key={pokemon.name}
            pokemon={pokemon}
            onPurchase={addProduct}
            onRemove={removeProduct}
            inCart={cart.products[pokemon.name]}
            purchased={cart.purchasedProducts[pokemon.name]}
          />
        ))}
      </Grid>
      </InfiniteScroll>
    </Layout>
  )
}
