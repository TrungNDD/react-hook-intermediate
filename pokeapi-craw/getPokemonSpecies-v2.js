const fs = require('fs');

const LIMIT = 1010;
const OFFSET = 0;
const POKEMON_SPECIES_URL = 'https://pokeapi.co/api/v2/pokemon/';

(async() => {
    let apis;

    for (let i = 0; i <= LIMIT; i++) {
        apis = fetch(`${POKEMON_SPECIES_URL}/${i}`)
                    .then(response => response.json())
                    .then(json => ({
                        generation: json.generation,
                        id: json.id,
                        name: json.name,
                        order: json.order,
                        sprites: json.sprites,
                        types: json.types
                    }))
    }

    const pokemonSpecies = await Promise.allSettled(apis);

    // console.log(pokemonSpecies)

    const pokemonSpeciesWithDetails = await Promise.allSettled(
        pokemonSpecies.map(
            pokemon => fetch(pokemon.url)
            .then(response => response.json())
            .then(json => ({
                generation: json.generation,
                has_gender_differences: json.has_gender_differences,
                id: json.id,
                is_baby: json.is_baby,
                is_legendary: json.is_legendary,
                is_mythical: json.is_mythical,
                name: json.name,
                order: json.order,
            }))
        )
    ).then(results => results.map(result => result.value));

    // console.log(pokemonSpeciesWithDetails[pokemonSpeciesWithDetails.length - 1]);

    const pokemonSpeciesWithGenerationDetails = await Promise.allSettled(
        pokemonSpeciesWithDetails.map(
            pokemon => {
                // console.log(pokemon.generation);
                if (pokemon.generation)
                return fetch(pokemon.generation.url)
                    .then(response => response.json())
                    .then(json => ({...pokemon, generation: {main_region: json.main_region, name: json.name}}))
            }
        )
    ).then(results => results.map(result => result.value))

    // console.log(pokemonSpeciesWithGenerationDetails);
    fs.writeFile('pokemon.json', JSON.stringify(pokemonSpeciesWithGenerationDetails), err => {
        if (err) {
          console.error(err);
        }
    });

    return pokemonSpeciesWithGenerationDetails;
})();