import { useEffect, useState } from "react";
import Select from "react-select";
import sortCategoryOptions, {
  SORT_CATEGORY_VALUES,
} from "../constant/sort-category";
import Accordion from "../components/accordion";
import PokemonList from "../constant/pokemon.json";

function PokedexPage() {
  const [category, setCategory] = useState(SORT_CATEGORY_VALUES.REGION);
  const [pokemonList, setPokemonList] = useState([]);
  const [isShiny, setIsShiny] = useState(false);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setPokemonList(PokemonList);
    }, 200);

    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  return (
    <div className="lg:mx-40 xl:mx-60">
      <div className="mx-4 my-2">
          <h3 className="w-full text-left">Categorized by:</h3>
          <div className="w-full flex flex-col items-start gap-4 mt-4 md:flex-row">
            <Select
              options={sortCategoryOptions}
              defaultValue={sortCategoryOptions[0]}
              onChange={(option) => setCategory(option.value)}
              className="w-2/5"
            />
        </div>
        <div className="w-full flex gap-4 items-center grow-0 mt-4">
          <input
            type="checkbox"
            checked={isShiny}
            onChange={() => setIsShiny((prev) => !prev)}
          />
          <label>Shiny dex</label>
        </div>
      </div>
      <Accordion
        pokemonList={pokemonList}
        category={category}
        isShiny={isShiny}
      />
    </div>
  );
}

export default PokedexPage;
