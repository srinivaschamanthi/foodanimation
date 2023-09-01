import React from "react";
import { useState, useEffect, useRef } from "react";
import Shimmer from "./Shimmer";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CDN_URL } from "../utils/constants.js";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  decreaseQuantity,
  increaseQuantity,
} from "../utils/cartSlice";
import { toast } from "react-toastify";

const  ItemList =({ item })=> {
  const dispatch = useDispatch();

  const changingValueRef = useRef(0);

  const [isAdded, setIsAdded] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const cartItems = useSelector((store) => store.cart.items);

  useEffect(() => {
    const isPresentAt = cartItems.findIndex(
      (el) => el.card.info.id === item.card.info.id
    );
    setIsAdded(isPresentAt >= 0);
    setQuantity(cartItems?.[isPresentAt]?.inStock);
  }, [cartItems]);

  const handleAddItem = (item) => {
    changingValueRef.current = item.card.info.id;

    // You can use the updated value as needed
    dispatch(addItem({ ...item, inStock: 1 }));
    toast.success(item.card.info.name + " added to cart");
  };

  return (
    <div key={item.card.info.id}>
      <div className="singleItem">
        <div>
          {item.card.info.name} <br></br>
          {" Rs."}
          {item.card.info.price / 100 || item.card.info.defaultPrice / 100}
        </div>

        <div className="add-items-container">
          <div className="addCart">
            {isAdded && quantity ? (
              <>
                <div
                  onClick={() => {
                    dispatch(decreaseQuantity(item.card.info.id));
                    toast.warning(item.card.info.name + " removed from cart");
                  }}
                >
                  -
                </div>
                <div>{quantity}</div>
                <div
                  onClick={() => {
                    dispatch(increaseQuantity(item.card.info.id));
                    toast.success(item.card.info.name + " added to cart");
                  }}
                >
                  +
                </div>
              </>
            ) : (
              <div onClick={() => handleAddItem(item)}>Add +</div>
            )}
          </div>
          <img
            className="styles_itemImage__3CsDL"
            //   alt={item.card.info.name}
            src={
              CDN_URL + item.card.info.imageId || CDN_URL + item.card.info.id
            }
          ></img>
          {/* <button>Add +</button> */}
        </div>
      </div>
      <div className="styles_divider__2JelH"></div>
    </div>
  );
}

export default ItemList