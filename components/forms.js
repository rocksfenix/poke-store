import styled from 'styled-components'

export const InputNumber = styled.input.attrs({ type: 'number' })`
  background: #FFF;
  padding: 0.5em;
  border: 0;
  height: 3em;
`

export const Submit = styled.input.attrs({ type: 'submit' })`
  background: #00ff7d;
  padding: 0.5em;
  border: 0;
  height: 3em;
  border-radius: 0.3em;
  margin-top: 1em;
  cursor: pointer;

  @media(min-width: 976px) {
    border-radius: 0 0.3em 0.3em 0;
    margin-top: 0;
  }

  :hover {
    background: #75ce00;
  }
`

export const Label = styled.label`
  padding: 0.5em;
  border: 0;
  height: 3em;
`

export const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`

export const Form = styled.form`
  margin: 1em 0;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;


  @media(min-width: 976px) {
    flex-direction: row;
  }
`