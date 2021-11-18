import pokemons from '../../../data'

export default function handler(req, res) {
  const { name } = req.query

  if (!name) {
    return res.status(400).json({
      error: 'You need to send the name'
    })
  }

  const pokemon = pokemons.find(
    pok => pok.name.toLowerCase() === name.toLowerCase()
  )

  if (!pokemon) {
    return res.status(404).json({
      error: 'Not found: ' + name
    })
  }

  res.status(200).json({
    pokemon
  })
}