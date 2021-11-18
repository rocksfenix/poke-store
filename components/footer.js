import React from 'react'
import styled from 'styled-components'
import { FaGithub } from 'react-icons/fa'

const Footer = styled.footer`
  display: flex;
  flex: 1;
  padding: 2rem 0;
  border-top: 1px solid #eaeaea;
  justify-content: center;
  align-items: center;
`

const Author = styled.span`
  margin-left: 1em;
`

export default function FooterComponent (props) {
  return (
    <Footer>
      <a
        href='https://github.com/rocksfenix'
        target="_blank"
        rel="noopener noreferrer">
        <FaGithub />
        <Author>Created by Gerardo Gallegos </Author>
      </a>
    </Footer>
  )
}
