export enum FoodTypes {
  SPICINESS = "SPICINESS",
  MEAT = "MEAT",
  VEGETABLE = "VEGETABLE",
  SEAFOOD = "SEAFOOD",
}

export enum Allergens {
  FISH = "FISH",
  SOYBEANS = "SOYBEANS",
  PEANUTS = "PEANUTS",
  MILK = "MILK",
  WHEAT = "WHEAT",
  EGGS = "EGGS",
  SHELLFISH = "SHELLFISH",
  NUTS = "NUTS",
}

export interface Ingredient {
  unit: number;
  name: string;
  foodtypes: FoodTypes[];
  allergens: Allergens[];
  calorie: number;
}

export class Recipe {
  name: string;
  ingredients: Ingredient[];
  foodtypes: Set<FoodTypes> = new Set();
  allergens: Set<Allergens> = new Set();
  constructor(name: string, ingredients: Ingredient[]) {
    this.name = name;
    this.ingredients = ingredients;
    ingredients.forEach((ingredient) => {
      ingredient.foodtypes.forEach((foodtype) => this.foodtypes.add(foodtype));
      ingredient.allergens.forEach((allergen) => this.allergens.add(allergen));
    });
  }
}

/**
 * Pass a pizza recipe and array of food types
 * @param recipe
 * @param foodtypes
 * @returns
 */
export const hasFoodTypes = (
  recipe: Recipe,
  foodtypes: FoodTypes[]
): boolean => {
  const recipeFoodTypes: FoodTypes[] = [];
  for (let i = 0; i < recipe.ingredients.length; i++) {
    if (Array.from(recipe.foodtypes).includes(foodtypes[i])) {
      // if any of food types matches returning true
      return true;
    }
  }
  return false;
};

/**
 * 
 * @param recipe
 * @param allergens
 * @returns
 */
export const hasAllergens = (
  recipe: Recipe,
  allergens: Allergens[]
): boolean => {
  for (let i = 0; i < allergens.length; i++) {
    if (Array.from(recipe.allergens).includes(allergens[i])) {
      return true;
    }
  }
  return false;
};

/**
 *
 * @param recipe
 * @param allergens
 * @returns
 */
export const removeAllergens = (
  recipe: Recipe,
  allergens: Allergens[]
): Recipe => {
  const newIngredients = recipe.ingredients.filter((ingredient) => {
    let flag = true;
    for (let index = 0; index < ingredient.allergens.length; index++) {
      if (allergens.includes(ingredient.allergens[index])) {
        flag = false;
      }
    }
    return flag;
  });
  return new Recipe(recipe.name, newIngredients);
};

/**
 *
 * @param recipe
 * @param foodtypes
 * @returns
 */
export const removeFoodTypes = (
  recipe: Recipe,
  foodtypes: FoodTypes[]
): Recipe => {
  const newIngredients = recipe.ingredients.filter((ingredient) => {
    let flag = true;
    for (let index = 0; index < ingredient.foodtypes.length; index++) {
      if (foodtypes.includes(ingredient.foodtypes[index])) {
        flag = false;
      }
    }
    return flag;
  });
  return new Recipe(recipe.name, newIngredients);
};

/**
 *
 * @param recipe
 * @param ingredients
 * @returns
 */
export const removeIngredients = (
  recipe: Recipe,
  ingredients: Ingredient[]
): Recipe => {
  const removedIngredientName = ingredients.map(
    (_ingredient) => _ingredient.name
  );
  const newIngredients = recipe.ingredients.filter(
    (ingredient) => !removedIngredientName.includes(ingredient.name)
  );
  return new Recipe(recipe.name, newIngredients);
};

/**
 * 
 * @param recipe
 * @param ingredients
 * @returns
 */
export const doubleIngredients = (
  recipe: Recipe,
  ingredients: Ingredient[]
): Recipe => {
  const doubleIngredientNames = recipe.ingredients.map(
    (ingredient) => ingredient.name
  );
  let newIngredients: Ingredient[] = recipe.ingredients.map((ingredient) => {
    if (doubleIngredientNames.includes(ingredient.name)) {
      return {
        unit: ingredient.unit * 2,
        name: ingredient.name,
        foodtypes: ingredient.foodtypes,
        allergens: ingredient.allergens,
        calorie: ingredient.calorie * 2,
      };
    } else {
      return ingredient;
    }
  });
  return new Recipe(recipe.name, newIngredients);
};

/**
 *
 * @param recipe
 * @returns
 */
export const getCalories = (recipe: Recipe): number => {
  return recipe.ingredients
    .map((ingredient) => ingredient.calorie)
    .reduce((prev, curr) => prev + curr);
};
