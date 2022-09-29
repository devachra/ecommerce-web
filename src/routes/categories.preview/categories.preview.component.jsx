import { Fragment } from "react";
import { useSelector } from "react-redux";
import Spinner from "../../component/spinner/spinner.component";
import CategoryPreview from "../../component/category-preview/category-preview.component";
import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from "../../store/categories/category.selector";

// import { CategoriesContext } from "../../contexts/categroies.context";

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  // const { categroiesMap } = useContext(CategoriesContext);
  // console.log(categroiesMap);
  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title];
          return (
            <CategoryPreview key={title} title={title} products={products} />
          );
        })
      )}
    </Fragment>
  );
};

export default CategoriesPreview;
