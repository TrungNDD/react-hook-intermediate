const fs = require('fs');

const LIMIT = 1010;
const OFFSET = 0;
const POKEMON_SPECIES_URL = 'https://pokeapi.co/api/v2/pokemon-species';

(async() => {
    const pokemonSpecies = await fetch(`${POKEMON_SPECIES_URL}?offset=${OFFSET}&limit=${LIMIT}`)
        .then(response => response.json())
        .then(json => json.results)

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
                varieties: json.varieties
            }))
        )
    ).then(results => results.map(result => result.value));

    console.log(pokemonSpeciesWithDetails);

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