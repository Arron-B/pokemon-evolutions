import React, { useEffect, useState} from 'react'
import Evolutions from './Evolutions'

function MainPokemon () {
const [pokemon, setPokemon] = useState({})
const [isLoaded, setIsLoaded] = useState(false)
const [bothLoaded, setBothLoaded] = useState(false)
const [search, setSearch] = useState('charmander')
const [searchComplete, setSearchComplete] = useState(false)

useEffect(() => {
    setIsLoaded(false)
    fetch(`https://pokeapi.co/api/v2/pokemon/${search}`)
    .then((response) => response.json())
    .then((data) => {
        setPokemon(data)
        setIsLoaded(true)
    })
},[searchComplete])

function capitaliseFirstLetter(string) {
    return string.split('').map((letter, i) => {
        return i === 0 ? letter.toUpperCase() : letter
    }).join('')
}

if(isLoaded === true) {
return (
    <>
    <section className='main'>
    <form className='form'
        onSubmit={(event) => {
            event.preventDefault()
            setSearchComplete(!searchComplete)
        }}>
      <input
        type="search"
        aria-describedby="pokemonSearchBlock"
        placeholder="Search for a pokemon" onChange={(e) => {setSearch(e.target.value)}}/>
      <button className='mt-1 mb-1 p-1' onClick={() => {
        setSearchComplete(!searchComplete)
        }
        }>Search</button>{''}
        </form>
        <div className='pokemon-div' style={{ width: '80%'}}>
        <h2 style={{ fontSize: '2rem' }}>
            { capitaliseFirstLetter(pokemon.name) }
        </h2>
        <img className='image h-80 aspect-1' src={ pokemon.sprites.front_default }/>
            <h2>Types:</h2>
        {pokemon.types.map((type, i) => {
            return <p key={i}>
                { type.type.name }
            </p>
        })}
        </div>
    </section>
    <Evolutions pokemon={pokemon} capitaliseFirstLetter={capitaliseFirstLetter}/>
    </>
    ) }
    else {return <p>Loading...</p>}
}



export default MainPokemon;