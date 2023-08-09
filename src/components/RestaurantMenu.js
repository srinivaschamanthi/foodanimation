import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


const RestaurantMenu = () => {
  

  const [resInfo, setResInfo] = useState(null);

  const { resId } = useParams(33040);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.428934&lng=78.3529326&restaurantId=" +
        resId
    );
    const json = await data.json();
    setResInfo(json.data);
    console.log(json, "json");
  };
  if (resInfo === null) return <Shimmer />;
  const {
    name,
    cuisines,
    costForTwoMessage,
    areaName,
    locality,
    totalRatingsString,
  } = resInfo?.cards[0]?.card?.card?.info;
  const { lastMileTravel, deliveryTime } =
    resInfo?.cards[0]?.card?.card?.info.sla;

  const { itemCards, title } =
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;

  console.log(itemCards, "itemcards");

  return (
    <div className="Restaurant_container">
      <div className="RestaurantHeader_container">
        <div className="RestaurantHeader_container_inner">
          <div>
            <h1>{name}</h1>
            <p>{cuisines.join(", ")}</p>
            <p>
              {areaName || locality} , {lastMileTravel}Km
              <span style={{ color: "#fc8019" }}>▾</span>
            </p>
          </div>
          <div>
            <button className="RestaurantRatings_wrapper__2294i">
              <span className="RestaurantRatings_avgRating__1TOWY">
                <span className="icon-star">
                  <i className="fa fa-star"></i>
                </span>
                <span> 3.9</span>
              </span>
              <span className="RestaurantRatings_totalRatings__3d6Zc">
                {" "}
                {totalRatingsString}{" "}
              </span>
            </button>
          </div>
        </div>
        <hr
          class="RestaurantHeader_dottedSeparator__2O2hU RestaurantHeader_marginBottom__1rbfK"
          aria-hidden="true"
        ></hr>
        <div className="RestaurantHeader_marginBottom__1rbfK">
          <ul className="RestaurantTimeCost_wrapper__3YXF9">
            <li className="RestaurantTimeCost_item__2HCUz">
              <svg
                class="RestaurantTimeCost_icon__8UdT4"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
              >
                <circle
                  r="8.35"
                  transform="matrix(-1 0 0 1 9 9)"
                  stroke="#3E4152"
                  stroke-width="1.3"
                ></circle>
                <path
                  d="M3 15.2569C4.58666 16.9484 6.81075 18 9.273 18C14.0928 18 18 13.9706 18 9C18 4.02944 14.0928 0 9.273 0C9.273 2.25 9.273 9 9.273 9C6.36399 12 5.63674 12.75 3 15.2569Z"
                  fill="#3E4152"
                ></path>
              </svg>
              {deliveryTime} mins
            </li>
            <li className="RestaurantTimeCost_item__2HCUz">
              <svg
                class="RestaurantTimeCost_icon__8UdT4"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
              >
                <circle
                  cx="9"
                  cy="9"
                  r="8.25"
                  stroke="#3E4152"
                  stroke-width="1.5"
                ></circle>
                <path
                  d="M12.8748 4.495H5.6748V6.04H7.9698C8.7948 6.04 9.4248 6.43 9.6198 7.12H5.6748V8.125H9.6048C9.3798 8.8 8.7648 9.22 7.9698 9.22H5.6748V10.765H7.3098L9.5298 14.5H11.5548L9.1098 10.57C10.2048 10.39 11.2698 9.58 11.4498 8.125H12.8748V7.12H11.4348C11.3148 6.475 10.9698 5.905 10.4298 5.5H12.8748V4.495Z"
                  fill="#3E4152"
                ></path>
              </svg>{" "}
              {costForTwoMessage}
            </li>
          </ul>
        </div>
      </div>
      <div >
        <Accordion style={{boxShadow:"none"}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className="styles_headerNestedTitle__1PFSM">
              {title} ({itemCards.length})
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <ul>
                {itemCards.map((item) => (
                  <li key={item.card.info.id}>
                    {item.card.info.name} -{" Rs."}
                    {item.card.info.price / 100 ||
                      item.card.info.defaultPrice / 100}
                  </li>
                ))}
              </ul>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
      
      <div class="main_border__1Cc4a"></div>
    </div>
  );
};

export default RestaurantMenu;
