import { SyncLoader } from 'react-spinners'
import React from 'react'
import styled from 'styled-components'

const SpinnerBox = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
`

export default function Spinner () {
  return (
  <SpinnerBox>
    <SyncLoader color='blue' />
  </SpinnerBox>
  )
}