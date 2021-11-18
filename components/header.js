import React from 'react'
import styled from 'styled-components'
import Headroom from 'react-headroom'
import currencyFormatter from 'currency-formatter'

import { useStore } from '../hooks/use-store'
import NavegationMobile from './navegation-mobile'
import NavegationDesktop from './navegation-desktop'

const Header = styled.header`
  background-color: #000;
  padding: 0 1em;
  display: flex;
  height: 50px;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  width: 100%;
  color: #FFF;

  & > a:hover {
    color: gold;
  }
`

export default function HeaderComponent () {
  const { cartItems, cart } = useStore()

  const purchasedProducts = Object
    .keys(cart.purchasedProducts)
    .map(key => cart.purchasedProducts[key])

  const balance = currencyFormatter
    .format(cart.balance, { code: 'MXN' }) +' MXN'
  
  return (
    <Headroom>
      <Header>
        <NavegationDesktop
          balance={balance}
          cartItems={cartItems}
          purchasedProducts={purchasedProducts}
        />
        <NavegationMobile
          balance={balance}
          cartItems={cartItems}
          purchasedProducts={purchasedProducts}
        />
      </Header>
    </Headroom>
  )
}