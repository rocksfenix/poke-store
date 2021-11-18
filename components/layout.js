import React from 'react'
import styled from 'styled-components'
import Header from './header'
import Footer from './footer'

const Container = styled.div`
  padding: 0 2rem;
  min-height: calc(100vh - 136px);
`

export default function Layout (props) {
  return (
    <>
      <Header />
      <Container>
        <main>
          {props.children}
        </main>
      </Container>
      <Footer />
    </>
  )
}
