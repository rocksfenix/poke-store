import styled from 'styled-components'

const Table = styled.table`
  width: 100%;
  border-spacing: 0;

  thead td {
    color: white;
    background-color: #000;
  }
  tr:last-child td {
    border-bottom: 0;
  }
  td {
    padding: 1em;
    border-bottom: solid 1px #cfd7de;
  }
  td:not(:first-child) {
    text-align: center;
  }
`

const TableComponent = ({ data, columns }) => {

  const rows = [...new Array(data.length)].map((item, index) => {
    return columns.map(({ columnId }) => data[index][columnId])
  })

  return (
    <Table>
      <thead>
        <tr>
          {columns.map(({ columnId, Header }) => {
            return (
              <td key={columnId}>{ Header }</td>
            )
          })}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => {
          return (
            <tr key={index}>
              { row.map((cell, index) => {
                return <td key={index}>{ cell }</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

export default TableComponent
