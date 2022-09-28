import { createActions } from "../../utils/reducer/reducer.utils";
import { CATEGORY_ACTION_TYPES } from "./category.type";

export const setCategories = (categoriesArray) =>
  createActions(CATEGORY_ACTION_TYPES.SET_CATEGORIES, categoriesArray);
