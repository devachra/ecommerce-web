/* 
default

inverted

google sign in 
*/
import "./button.style.scss";

const BUTTON_TYPE_CLASSES = {
  google: "google-sign-in",
  inverted: "inverted",
};
const Button = ({ children, buttonType, ...otherPorps }) => {
  return (
    <button
      className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
      {...otherPorps}
    >
      {children}
    </button>
  );
};

export default Button;
