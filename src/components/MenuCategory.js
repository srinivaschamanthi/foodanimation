import { useState, useEffect, useRef  } from "react";
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
import  ItemList  from "./ItemList";
import Fade from 'react-reveal/Fade';

const MenuCategory = (data) => {
  const dispatch = useDispatch();
  const changingValueRef = useRef(0);

  const [isAdded, setIsAdded] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const cartItems = useSelector((store) => store.cart.items);

  useEffect(() => {
    const isPresentAt = cartItems.findIndex(
      (el) => el.card.info.id === changingValueRef.current
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
    <div>
      <Fade right>
      <div>
        <Accordion defaultExpanded style={{ boxShadow: "none" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className="styles_headerNestedTitle__1PFSM">
              {data.data.title} ({data.data.itemCards.length})
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <div>
                {data.data.itemCards.map((item) => (
                  <div key={item.card.info.id}>
                    <ItemList item={item}/>
                    {/* <div className="styles_divider__2JelH"></div> */}
                  </div>
                ))}
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
      <div className="main_border__1Cc4a"></div>
      </Fade>
    </div>
  );
};

export default MenuCategory;
