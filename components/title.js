import styled from 'styled-components'

export default styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  margin-bottom: 1.5em;
  font-weight: 700;
  text-align: center;

  @media(min-width: 976px) {
    font-size: 2.5rem;
  }

  > svg {
    margin-right: 0.6em;
  }
`
