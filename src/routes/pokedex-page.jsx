import { useState } from "react";
import Select from "react-select";
import sortCategoryOptions, {
  SORT_CATEGORY_VALUES,
} from "../constant/sort-category";
import Accordion from "../components/accordion";

function PokedexPage() {
  const [category, setCategory] = useState(SORT_CATEGORY_VALUES.REGION);

  return (
    <>
      <div className="mx-4 my-2 flex flex-col md:flex-row items-start md:items-center justify-between">
        <h1 className="text-2xl my-2">Pokedéx</h1>
        <div className="flex flex-col md:flex-row items-start md:items-center w-full md:w-1/2">
          <h3 className="w-full text-left">Categorized by: {category}</h3>
          <div className="w-full">
            <Select
              options={sortCategoryOptions}
              defaultValue={SORT_CATEGORY_VALUES.REGION}
              onChange={(option) => setCategory(option.value)}
            />
          </div>
        </div>
      </div>
      <Accordion label="Kanto">
        <div>Bulbasaur</div>
      </Accordion>
    </>
  );
}

export default PokedexPage;
