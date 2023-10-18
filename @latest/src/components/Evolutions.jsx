import React, {useEffect, useState} from 'react'
function Evolutions ({pokemon, capitaliseFirstLetter}) {

    const [evolutionChain, setEvolutionChain] = useState([])
    const [noEvolutions, setNoEvolutions] = useState('')

    function getEvolutions (object) {
        const evolutions = []
       for (const property in object) {
        if(property === 'name') {
            evolutions.push(object[property])
        }
        else if(property === 'chain' || property === 'species') {
            evolutions.push(...getEvolutions(object[property])) 
       }
    
       else if(property === 'evolves_to') {
        evolutions.push(...getEvolutions(object[property][0]));
       }
    }
        return evolutions
    }



    useEffect(() => {
        setNoEvolutions('')
        fetch(pokemon.species.url)
        .then((response) => response.json())
        .then((data) => {
            return fetch(data.evolution_chain.url)
        }).then((response) => response.json())
        .then((data) => {
            const evolutions = getEvolutions(data);  
            // return fetch(`https://pokeapi.co/api/v2/pokemon/${evolutions[0]}`)          
            const evolutionPromises = evolutions.filter((name) => name !== pokemon.name)
            .map((name) => {
                return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
                .then((res) => res.json())
                .then((data) => {
                    return {
                        'name': capitaliseFirstLetter(data.name),
                        'img': data.sprites.front_default,
                        'types': data.types
                    }
                });
            })
            if(evolutionPromises.length > 0)return Promise.all(evolutionPromises);
            else return [];
        }).then((evolutions) => {
            if(evolutions.length < 1) {
                setNoEvolutions(true)
            }
            else{
                setNoEvolutions(false)
            }
            setEvolutionChain(evolutions);
        })
    },[])
    




   if(evolutionChain.length > 0) {
    return (
        <div className='evolutions-div'>
            <h1>Evolution stages</h1>
        {evolutionChain.map((evolution) => {
            return (<div key={evolution.name} className='evolution'>
                <h2>{evolution.name}</h2>
                <img className='image-evolution' src={ evolution.img }/>
                <div className="types-container">
                    <p>Types:</p>{evolution.types.map((type, i) => {
                        return <p key={`${evolution.name}${i}`}>
                    { type.type.name } </p>})}
                    </div>
            </div>)
        })}
        </div>
        
    ) }
    if(noEvolutions === '') {return <p>Loading...</p>}
    if(noEvolutions === true) {
        return <p>This pokemon has no evolutions</p>
    }
}




export default Evolutions;