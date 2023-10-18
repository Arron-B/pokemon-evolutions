import React, { useEffect, useState} from 'react'
import { Image, Button, Form, Card, FloatingLabel} from 'react-bootstrap'
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
    <Form className='form' onSubmit={(event) => {
            event.preventDefault()
            setSearchComplete(!searchComplete)
        }}>
      <input
        className='text-center'
        type="search"
        aria-describedby="pokemonSearchBlock"
        placeholder="Search for a pokemon" onChange={(e) => {setSearch(e.target.value)}}
      />
      <Button className='mt-1 mb-1 p-1' onClick={() => {
        setSearchComplete(!searchComplete)
        }
        }>Search</Button>{''}

        </Form>
        <Card className='d-flex align-items-center border-0' style={{ width: '80%'}}>
        <Card.Title>
            { capitaliseFirstLetter(pokemon.name) }
        </Card.Title>
        <Image className='image' src={ pokemon.sprites.front_default }/>
            <Card.Title>Types:</Card.Title>
        {pokemon.types.map((type, i) => {
            return <Card.Text key={i}>
                { type.type.name }
            </Card.Text>
        })}
        </Card>
    </section>
    <Evolutions pokemon={pokemon} bothLoaded={bothLoaded} setBothLoaded={setBothLoaded} capitaliseFirstLetter={capitaliseFirstLetter}/>
    </>
    ) }
    else {return <p>Loading...</p>}
}



export default MainPokemon;