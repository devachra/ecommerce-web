import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../store/cart/cart.acton";
import { selectCartItems } from "../../store/cart/cart.selector";
import Button from "../btton/button.component";
import "./product-card.style.scss";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { name, price, imageUrl } = product;

  const cartItems = useSelector(selectCartItems);

  const ItemCartHandler = () => dispatch(addItemToCart(cartItems, product));
  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name} />
      <div className="footer">
        <span className="name">{name} </span>
        <span className="price">{price} </span>
      </div>
      <Button buttonType="inverted" onClick={ItemCartHandler}>
        Add to Card
      </Button>
    </div>
  );
};
export default ProductCard;
