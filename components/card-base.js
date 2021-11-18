import styled from 'styled-components'

export const Card = styled.div`
  margin: 1rem;
  padding: 1.5rem;
  text-align: left;
  color: inherit;
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  flex-basis: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  transition: color 0.15s ease, border-color 0.15s ease;
  background-color: ${({ purchased }) => purchased ? '#2a2a33': '#FFF'};
  color: ${({ purchased }) => purchased ? '#FFF': '#000'};

  @media (min-width: 600px) {
    flex-basis: calc(50% - 2rem);
  }

  @media (min-width: 960px) {
    flex-basis: calc(33.33% - 2rem);
  }
`

export const Title = styled.h2`
  text-align: center;
`

export const Tag = styled.span`
  padding: 1em;
  background-color: red;
  border-radius: 0.6em;
  margin: 1em;
  font-size: 0.8em;
`

export const Image = styled.img`
  max-width: 80%;
  margin: 0 auto;
  display: flex;
  max-height: 250px;
`

export const PayButton = styled.button`
  cursor: pointer;
  color: #FFF;
  font-family: inherit;
  font-size: 0.9em;
  font-weight: 700;
  background-color: #0070f3;
  padding: 0.8em 1.4em;
  border-radius: 0.2em;
  border: 0;
`

export const RemoveButton = styled(PayButton)`
  background-color: tomato;
`
