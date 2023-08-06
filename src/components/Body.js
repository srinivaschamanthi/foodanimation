import RestaurantCard from "./RestaurantCard";
import { resList, newresList } from "../utils/mockData";
import { useEffect, useState } from "react";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=16.989065&lng=82.247467&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
// 17.440081, 78.348915. gachibowli lat&lan
// 16.989065, 82.247467 kakinada lat&lan
    const json = await data.json();
    console.log(
      json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    // Optional Chaining
    setListOfRestaurants(
      json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    // setFilteredRestaurant(json?.data?.cards[2]?.data?.data?.cards);
  };

  return (
    <div className="body">
      <div>
        <button className="top-rated-button"
          style={{
            margin: "10px",
            padding: "10px",
            borderRadius: "10px",
            border: "1px solid #d4d5d9",
            cursor: "pointer",
            backgroundColor: "#fff",
            color: "#60b246",
            fontWeight:"600",
            fontSize:".9rem",
            textAlign:"center"
            
          }}
          onClick={() => {
            setListOfRestaurants(
              listOfRestaurants.filter((res) => res.info.avgRating >= 4)
            );
          }}
        >
          Top Rated
          <i className="fa fa-star"></i>
        </button>
      </div>
      <div className="res-container">
        {listOfRestaurants?.map((restaurant) => (
          <RestaurantCard key={restaurant.info.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;
