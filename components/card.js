import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import currencyFormatter from 'currency-formatter'
import { FaShoppingCart } from 'react-icons/fa'
import { Card, Title, RemoveButton, Image, PayButton } from './card-base'

export default function CardComponent (props) {
  const {
    pokemon,
    onPurchase,
    inCart,
    onRemove,
    purchased
  } = props

  return (
    <Card purchased={purchased}>
      <Title>{pokemon.name}</Title>
      <p>{pokemon.info}</p>
        <Image
          src={pokemon.sprites.large}
          alt={pokemon.name}
        />
      <p>
        {purchased && (
          <Link href='/my-products'>
            <a>Go to my Products</a>
          </Link>
        )}
        {(!purchased && inCart) && (
          <RemoveButton onClick={() => onRemove(pokemon)}>
            Remove from cart
          </RemoveButton>
        )}
        {(!purchased && !inCart) && (
          <PayButton onClick={() => onPurchase(pokemon)}>
            {currencyFormatter.format(pokemon.price, { code: pokemon.currency })}
            <span>( {pokemon.currency} ) Add to cart  </span>
            <FaShoppingCart />
          </PayButton>
        )}
      </p>
    </Card>
  )
}
