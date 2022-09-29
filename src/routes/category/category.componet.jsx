import "./category.style.scss";
import { useParams } from "react-router-dom";
import { Fragment } from "react";

import { useState } from "react";
import { useEffect } from "react";
import ProductCard from "../../component/product-card/product-card.component";
import { useSelector } from "react-redux";
import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from "../../store/categories/category.selector";
import Spinner from "../../component/spinner/spinner.component";

const Category = () => {
  const { category } = useParams();
  const categroiesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  const [products, setProducts] = useState(categroiesMap[category]);

  useEffect(
    () => setProducts(categroiesMap[category]),
    [category, categroiesMap]
  );

  return (
    <Fragment>
      <h2 className="category-title ">{category} </h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="product-container">
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      )}
    </Fragment>
  );
};
export default Category;
