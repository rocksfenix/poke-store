import React from 'react'
import styled from 'styled-components'

const Grid = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 1em auto;
`

export default function GridComponent (props) {
  return (
    <Grid>
      {props.children}
    </Grid>
  )
}