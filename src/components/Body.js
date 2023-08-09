import RestaurantCard from "./RestaurantCard";
import { resList, newresList } from "../utils/mockData";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant,setFilteredRestaurant] = useState([])
  const [searchText,setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.440081&lng=78.348915&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    // 17.440081, 78.348915. gachibowli lat&lan
    // 16.989065, 82.247467 kakinada lat&lan
    const json = await data.json();
    console.log(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    // Optional Chaining
    setListOfRestaurants(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurant(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search-container">
          <input className="search-input" type="text"  value={searchText} onChange={(e)=>{
            setSearchText(e.target.value)
          }}/>
          <button className="search-button" onClick={()=>{
           const filteredList =  listOfRestaurants.filter((res)=>res.info.name.toLowerCase().includes(searchText.toLowerCase())

            )
            setFilteredRestaurant(filteredList)
          }}>search</button>
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
          <Link className="linkStyle" key={restaurant.info.id} to={`/restaurants/${restaurant.info.id}`}>
          <RestaurantCard  resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
