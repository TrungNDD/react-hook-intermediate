export const SORT_CATEGORY_VALUES = {
  REGION: "region",
  ALPHABET: "alphabet",
};

export const sortAlphabeticallyMethod = (a, b) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
};

const sortCategoryOptions = [
  { value: SORT_CATEGORY_VALUES.REGION, label: "Region" },
  { value: SORT_CATEGORY_VALUES.ALPHABET, label: "Alphabet" },
];

export default sortCategoryOptions;
