import pokemons from '../../../data'

export default function handler(req, res) {
  const limit = req.query.limit
    ? Number(req.query.limit)
    : 20

  const offset = req.query.offset
    ? Number(req.query.offset)
    : 0

  // Simulating pagination
  let results = pokemons
    
  // Simulating text search
  if (req.query.search) {
    const name = new RegExp(req.query.search, 'i')
    results = pokemons.filter(
      pokemon => pokemon.name.match(name)
    )
  }

  const listFiltered = results.slice(
    offset,
    offset + limit
  )

  res.status(200).json({
    pokemons: listFiltered,
    total: pokemons.length,
    hasMore: offset + listFiltered.length < pokemons.length
  })
}
