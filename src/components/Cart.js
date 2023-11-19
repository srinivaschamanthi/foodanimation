import { useSelector } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  clearCart,
  addItem,
} from "../utils/cartSlice";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CDN_URL } from "../utils/constants";
import Payment from "./Payment";
import Shake from 'react-reveal/Shake';

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);

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
      {cartItems?.length > 1 && (
        <button onClick={handleClearCart}>Clear Cart</button>
      )}

      <div>
        {cartItems?.length === 0 && (
          <div className="nocart-container">
            <img
              className="cart-no-image"
              src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0"
              alt="empty cart"
            />
            <Shake  >
            <h4> Your cart is empty</h4>
            </Shake>
            <h5>You can go to home page to view more restaurants</h5>

            <div className="">
              <Link to="/">
                <button className="see-res-cart">
                  SEE RESTAURANTS NEAR YOU
                </button>
              </Link>
            </div>
          </div>
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

                <div className="add-items-container">
                  <div className="addCart">
                    <>
                      <div
                        onClick={() =>
                          dispatch(decreaseQuantity(item.card.info.id))
                        }
                      >
                        -
                      </div>
                      <div>{item.inStock}</div>
                      <div
                        onClick={() =>
                          dispatch(increaseQuantity(item.card.info.id))
                        }
                      >
                        +
                      </div>
                    </>
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
          {cartItems.length > 0 && <Payment />}
        </div>
      </div>
    </div>
  );
};

export default Cart;
