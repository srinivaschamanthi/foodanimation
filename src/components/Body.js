import RestaurantCard from "./RestaurantCard";
import {resList,newresList} from "../utils/mockData";
import { useEffect, useState } from "react";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState(newresList);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   const data = await fetch(
  //     "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.428934&lng=78.3529326&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
  //   );

  //   const json = await data.json();
  //   console.log(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
  //   // Optional Chaining
  //   // setListOfRestaurants(json.data.cards[5].card.card.gridElements.infoWithStyle.restaurants);
  //   // setFilteredRestaurant(json?.data?.cards[2]?.data?.data?.cards);
  // };

  return (
    <div className="body">
      <div>
        <button
          style={{
            margin: "10px",
            cursor: "pointer",
          }}
          onClick={() => {
            setListOfRestaurants(
              listOfRestaurants.filter((res) => res.info.avgRating > 4)
            );
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        {listOfRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.info.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;
