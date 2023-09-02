import RestaurantCard, { withPromtedLabel } from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { UseOnlineStatus } from "../utils/useOnlineStatus";
import SimpleBackdrop from "./SimpleBackdrop";
import Unserviceable from "./Unserviceable";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [unservice, setUnservice] = useState(false);

  // const RestaurantCardPromoted = withPromtedLabel(RestaurantCard);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    //   const permissionMessage = "please allow your location to provide Restaurants Near By";

    // if (confirm(permissionMessage)) {
    try {
      navigator.geolocation.getCurrentPosition(async function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        //     console.log(latitude, longitude);

        const data = await fetch(
          `https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=${latitude}&lng=${longitude}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
        );
        // 17.1145559
        // 82.2521517
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
        // Optional Chaining
        // setListOfRestaurants(
        //   json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
        // );
        // setFilteredRestaurant(
        //   json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
        // );
        setListOfRestaurants(restaurants[0]);
        setFilteredRestaurant(restaurants[0]);
        setUnservice(json.data.cards[0].card.card.id === "swiggy_not_present");
      });
      // ;}
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const onlineStatus = UseOnlineStatus();

  if (onlineStatus === false) return <SimpleBackdrop />;
  if (unservice === true) return <Unserviceable />;

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
