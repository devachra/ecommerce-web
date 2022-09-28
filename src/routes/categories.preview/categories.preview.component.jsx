import { Fragment } from "react";
import { useSelector } from "react-redux";
import CategoryPreview from "../../component/category-preview/category-preview.component";
import { selectCategoriesMap } from "../../store/categories/category.selector";

// import { CategoriesContext } from "../../contexts/categroies.context";

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  // const { categroiesMap } = useContext(CategoriesContext);
  // console.log(categroiesMap);
  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </Fragment>
  );
};

export default CategoriesPreview;
