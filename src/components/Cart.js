import { useSelector } from "react-redux";
import {  decreaseQuantity,
  increaseQuantity,
  clearCart,} from "../utils/cartSlice";
import { useDispatch } from "react-redux";
import { CDN_URL } from "../utils/constants";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);

  console.log(cartItems);

  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    // Dispatch an action
    dispatch(addItem(item));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="Restaurant_container">
      <h1>Cart</h1>
      <div>
        <button
          onClick={handleClearCart}
        >
          Clear Cart
        </button>
        {cartItems?.length === 0 && (
          <h1> Cart is empty. Add Items to the cart!</h1>
        )}
        <div>
                {cartItems.map((item) => (
                  <div key={item.card.info.id}>
                    <div className="singleItem">
                      <div>
                        {item.card.info.name} <br></br>
                        {" Rs."}
                        {item.card.info.price / 100 ||
                          item.card.info.defaultPrice / 100}
                      </div>
                      <div>
                        <div style={{position:"absolute"}}>
                          <button
                            onClick={() => handleAddItem(item)}
                          >
                            Add +
                          </button>
                        </div>
                        <img
                          className="styles_itemImage__3CsDL"
                          //   alt={item.card.info.name}
                          src={
                            CDN_URL + item.card.info.imageId ||
                            CDN_URL + item.card.info.id
                          }
                        ></img>
                        {/* <button>Add +</button> */}
                      </div>
                    </div>
                    <div className="styles_divider__2JelH"></div>
                  </div>
                ))}
              </div>
      </div>
    </div>
  );
};

export default Cart;