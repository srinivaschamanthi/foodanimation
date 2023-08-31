import RestaurantCard, { withPromtedLabel } from "./RestaurantCard";
import { resList, newresList } from "../utils/mockData";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { UseOnlineStatus } from "../utils/useOnlineStatus";
import SimpleBackdrop from "./SimpleBackdrop";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");

  // const RestaurantCardPromoted = withPromtedLabel(RestaurantCard);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.440081&lng=78.348915&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    const restaurants = json.data.cards
    ?.filter(
      (y) =>
        y?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.gandalf.widgets.v2.GridWidget"
    )
    ?.filter(
      (x) =>
        x?.card?.card?.id === "top_brands_for_you" ||
        x?.card?.card?.id === "restaurant_grid_listing"
    )
    ?.map((z) => z?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    console.log(restaurants);
    // Optional Chaining
    // setListOfRestaurants(
    //   json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    // );
    // setFilteredRestaurant(
    //   json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    // );
    setListOfRestaurants(
     restaurants[0] 
    )
    setFilteredRestaurant(
      restaurants[0]
    )
  };

  const onlineStatus = UseOnlineStatus();

  if (onlineStatus === false) return <SimpleBackdrop />;

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search-container">
          <input
            className="search-input"
            type="text"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="search-button"
            onClick={() => {
              const filteredList = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredRestaurant(filteredList);
            }}
          >
            search
          </button>
        </div>
        <button
          className="top-rated-button"
          style={{
            borderRadius: "10px",
            border: "1px solid #d4d5d9",
            cursor: "pointer",
            backgroundColor: "#fff",
            color: "#60b246",
            fontWeight: "600",
            fontSize: ".9rem",
            textAlign: "center",
          }}
          onClick={() => {
            setFilteredRestaurant(
              listOfRestaurants.filter((res) => res.info.avgRating >= 4)
            );
          }}
        >
          Top Rated
          <i className="fa fa-star"></i>
        </button>
      </div>
      <div className="res-container">
        {filteredRestaurant?.map((restaurant) => (
          <Link
            className="linkStyle"
            key={restaurant.info.id}
            to={`/restaurants/${restaurant.info.id}`}
          >
            <RestaurantCard resData={restaurant} />

            {/* {restaurant.info.aggregatedDiscountInfoV3 ? (
              <RestaurantCardPromoted resData={restaurant} />
            ) : (
              <RestaurantCard resData={restaurant} />
            )} */}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
