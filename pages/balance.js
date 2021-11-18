import { useState, useEffect } from 'react'
import Select from 'react-select'
import { roundTo } from 'round-to'
import currencyFormatter from 'currency-formatter'
import { FaMoneyBillAlt } from 'react-icons/fa'
import styled from 'styled-components'

import api from '../utils/api'
import Title from '../components/title'
import Layout from '../components/layout'
import { useStore } from '../hooks/use-store'
import ContainerBase from '../components/container'
import { InputNumber, Form, Submit, Row } from '../components/forms'

const Container = styled(ContainerBase)`
  margin: 2em auto;
  padding: 2em 3.5em;
  border-radius: 0.5em;
  background: black;
  color: white;
`

export default function Balance() {
  const [exchanges, setExchanges] = useState([])
  const [addingBalance, setAddingBalance ] = useState(1000)
  const [activeExchange, setActiveExchange] = useState({})
  const [loading, setLoading] = useState(false)
  const { balance, addBalance } = useStore('MXN')
  
  useEffect(() => {
    setLoading(true)
    api
      .getExchangeRates()
      .then(data => {
        const info = data.map(exchange => ({
          value: exchange.val,
          label: `1 ${exchange.fr} = ${exchange.val} ${exchange.to}` 
        }))
        setLoading(false)
        setExchanges(info)
        setActiveExchange(info[0])
      })
  }, [])

  function handleSubmit (e){
    e.preventDefault()
    const balance = activeExchange.value * addingBalance
    addBalance(balance)
  }

  function handleChangeRate (data) {
    setActiveExchange(data)
  }

  function handlerAdding (e) {
    setAddingBalance(+e.target.value)
  }

  const textBalance = `Add Balance ${roundTo(activeExchange.value * addingBalance, 2)} MXN`
  const currentBalance = currencyFormatter.format(balance, { code: 'MXN' })

  return (
    <Layout>
      <Container>
        <Title>
          <FaMoneyBillAlt />
          <span>
            Your current balance: {currentBalance} MXN
          </span>
        </Title>
        <Row>
          <Select
            options={exchanges}
            defaultMenuIsOpen
            onChange={handleChangeRate}
            value={activeExchange}
          />
          <Form onSubmit={handleSubmit}>
            {/* <Label htmlFor='balance'>Add credit to your balance:</Label> */}
            <InputNumber
              type='number'
              id='balance'
              name='balance'
              onChange={handlerAdding}
              value={addingBalance}
            />
            <Submit
              type='submit'
              value={textBalance}
            />
          </Form>
        </Row>
      </Container>
    </Layout>
  )
}
