import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { createActions } from "../../utils/reducer/reducer.utils";
import { CATEGORY_ACTION_TYPES } from "./category.type";

export const fetchCategoriesStart = () =>
  createActions(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categoriesArray) =>
  createActions(
    CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
    categoriesArray
  );

export const fetchCategoriesFailed = (error) =>
  createActions(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);

// thunk
export const fetchCategoriesAsync = () => async (dispatch) => {
  dispatch(fetchCategoriesStart());
  try {
    const categoryArray = await getCategoriesAndDocuments();
    dispatch(fetchCategoriesSuccess(categoryArray));
  } catch (error) {
    dispatch(fetchCategoriesFailed(error));
  }
};
