function getEvolutions (object) {
    // console.log(object.chain.species.name);
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

const temp = {
    "baby_trigger_item": null,
    "chain": {
    "evolution_details": [],
    "evolves_to": [
    {
    "evolution_details": [],
    "evolves_to": [
    {
    "evolution_details": [],
    "evolves_to": [],
    "is_baby": false,
    "species": {
    "name": "charizard",
    "url": "https://pokeapi.co/api/v2/pokemon-species/6/"
    }
    }
    ],
    "is_baby": false,
    "species": {
    "name": "charmeleon",
    "url": "https://pokeapi.co/api/v2/pokemon-species/5/"
    }
    }
    ],
    "is_baby": false,
    "species": {
    "name": "charmander",
    "url": "https://pokeapi.co/api/v2/pokemon-species/4/"
    }
    },
    "id": 2
    }


    console.log(getEvolutions(temp));