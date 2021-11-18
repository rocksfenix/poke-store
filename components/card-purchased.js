import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { Card as CardBase, Title, RemoveButton, Image, PayButton } from './card-base'

const Card = styled(CardBase)`
  border: 2px solid gray;
`

export default function CardComponent ({ product }) {
  return (
    <Card>
      <Title>{product.name}</Title>
      <p>{product.info}</p>
        <Image
          src={product.sprites.large}
          alt={product.name}
        />
      <p>
        <Link href={`/my-products/${product.name}`}>
          <a>See details</a>
        </Link>
      </p>
    </Card>
  )
}
