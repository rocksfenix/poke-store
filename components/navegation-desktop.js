import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { FaShoppingCart, FaMoneyBillAlt } from 'react-icons/fa'
import { BiPurchaseTag } from 'react-icons/bi'
import Logo from './logo'

const To = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;

  :hover {
    color: gold;
  }
`

const AppTitle = styled.span`
  font-weight: 700;
  margin-left: 0.5em;
`

const Info = styled.span`
  margin-left: 0.4em;
`

const DesktopMenu = styled.div`
  display: none;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  width: 100%;

  @media(min-width: 968px) {
    display: flex;
  }
`

export default function HeaderComponent (props) {
  const { cartItems, purchasedProducts, balance } = props

  return (
    <DesktopMenu>
      <Link href='/' passHref>
        <To>
          <Logo
            src='/logo.svg'
            alt='Logo Poke Store'
          />
          <AppTitle>Poke Store</AppTitle>
        </To>
      </Link>
      <Link href='/balance' passHref>
        <To>
          <FaMoneyBillAlt />
          <Info> Balance {balance}</Info>
        </To>
      </Link>
      {purchasedProducts.length > 0 && (
        <Link href='/my-products' passHref>
          <To>
            <BiPurchaseTag /> 
            <Info>My Purchases</Info>
          </To>
        </Link>
      )}
      {cartItems.length > 0 && (
        <Link href='/cart' passHref>
          <To>
            <FaShoppingCart /> 
            <Info>{cartItems.length}</Info>
          </To>
        </Link>
      )}
    </DesktopMenu>
  )
}