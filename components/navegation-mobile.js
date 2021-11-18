import Link from 'next/link'
import React, { useState } from 'react'
import { ImCross } from 'react-icons/im'
import { BiPurchaseTag } from 'react-icons/bi'
import { GiHamburgerMenu } from 'react-icons/gi'
import styled, { keyframes } from 'styled-components'
import { FaShoppingCart, FaMoneyBillAlt } from 'react-icons/fa'

import useScrollBlock from '../hooks/use-scroll-block'
import Logo from './logo'

const animation = keyframes`
  0% {
    transform: translateX(100%)
  }
  100% {
    transform: translateX(0)
  }
`

const Options = styled.div`
  position: fixed;
  transform: translateX(100%);
  animation: 260ms ease forwards ${animation};
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.9);
  backdrop-filter: blur(3px);
  z-index: 100;
  display: flex;
  justify-content: center;
  flex-direction: column;
  will-change: transform;
`

const To = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  height: 50px;
  font-size: 1.3em;
`

const AppTitle = styled.span`
  font-weight: 700;
  margin-left: 0.5em;
`

const Info = styled.span`
  margin-left: 0.4em;
`

const CrossButton = styled.button`
  position: absolute;
  right: 1em;
  top: 1em;
  color: #FFF;
  background-color: transparent;
  border: 0;
  font-size: 1.3em;
`

const MobileMenu = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;

  @media(min-width: 968px) {
    display: none;
  }
`

export default function HeaderComponent (props) {
  const [show, setShow] = useState(false)
  const [blockScroll, allowScroll] = useScrollBlock()
  const { cartItems, purchasedProducts, balance } = props

  function toggleMenu () {
    setShow(!show)
    if (!show) {
      blockScroll()
    }
  }

  function close () {
    setShow(false)
    allowScroll()
  }
  
  return (
    <MobileMenu>
      <Link href='/' passHref>
        <To>
          <Logo src='/logo.svg' alt='Logo Poke Store'/>
          <AppTitle>Poke Store</AppTitle>
        </To>
      </Link>
      <GiHamburgerMenu
        size={28}
        onClick={toggleMenu}
      />
      {cartItems.length > 0 && (
        <Link href='/cart' passHref>
          <To>
            <FaShoppingCart /> 
            <Info>{cartItems.length}</Info>
          </To>
        </Link>
      )}
      {show && (
        <Options>
          <CrossButton onClick={close}><ImCross /></CrossButton>
          {cartItems.length > 0 && (
            <Link href='/cart' passHref>
              <To>
                <FaShoppingCart /> 
                <Info>{cartItems.length}</Info>
              </To>
            </Link>
          )}
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
        </Options>
      )}
    </MobileMenu>
  )
}
