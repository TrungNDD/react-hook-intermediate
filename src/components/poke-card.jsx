function Pokecard({ pokemon, isShiny }) {
  return (
    <div className="w-full">
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
          isShiny ? "shiny/" : ""
        }${pokemon.id}.png`}
        alt={pokemon.name}
        loading="lazy"
        className="bg-zinc-100 rounded"
      />
      <p className="text-xs">#{`${pokemon.id}`.padStart(4, "0")}</p>
      <p className="uppercase">{pokemon.name}</p>
    </div>
  );
}

export default Pokecard;
