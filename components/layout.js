import React from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import Header from './header'
import Footer from './footer'

const Container = styled.div`
  padding: 0 2rem;
  min-height: calc(100vh - 136px);
`

Layout.defaultProps = {
  title: 'Poke Store ⚡'
}

export default function Layout (props) {
  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
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
