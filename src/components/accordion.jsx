import { SORT_CATEGORY_VALUES, sortAlphabeticallyMethod } from "../constant/sort-category";
import AccordionItem from "./accordion-item";
import Pokecard from "./poke-card";

function Accordion({pokemonList, category, isShiny}) {
    
  let accordionList = new Map();

  pokemonList.forEach((pokemon) => {
    const key =
      category === SORT_CATEGORY_VALUES.REGION
        ? pokemon.generation.main_region.name
        : pokemon.name.charAt(0);
    if (!accordionList.has(key)) {
      accordionList.set(key, []);
    }
    accordionList.get(key).push(pokemon);
  });

  accordionList = Array.from(accordionList, ([name, value]) => ({
    name,
    pokemonList: value,
  }));

  if (category === SORT_CATEGORY_VALUES.ALPHABET) {
    accordionList.sort(sortAlphabeticallyMethod);

    accordionList.forEach(({ _, pokemonList }) =>
      pokemonList.sort(sortAlphabeticallyMethod)
    );
  }

  // Pokemon list is sorted again everything isShiny change
  console.log(accordionList);

  return (
    <div className="m-4 text-left divide-y-2">
      {accordionList.map(({ name, pokemonList }) => (
        <AccordionItem label={name} key={`accordion-#${name}`}>
          {pokemonList.map((pokemon) => (
            <Pokecard pokemon={pokemon} key={`pokemon-#${pokemon.id}`} isShiny={isShiny}/>
          ))}
        </AccordionItem>
      ))}
    </div>
  );
}

export default Accordion;
