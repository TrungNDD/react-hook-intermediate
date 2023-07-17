const GENERATION_URL = 'https://pokeapi.co/api/v2/generation';

(async() => {
    let generationsFromAPI;

    await fetch(GENERATION_URL)
        .then((response) => response.json())
        .then((json) => generationsFromAPI = json);

    // console.log(generationsFromAPI);

    const mappedGeneration = await Promise.all(generationsFromAPI.results.map(async generation => {
        return fetch(generation.url)
            .then((response) => response.json())
            .then((json) => ({
                id: json.id,
                name: json.name,
                main_region: json.main_region.name,
                pokemon_species: json.pokemon_species
            }));
    }))

    console.log(mappedGeneration);

    return mappedGeneration;
});