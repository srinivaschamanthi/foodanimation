import { CDN_URL } from "../utils/constants";
import Pulse from 'react-reveal/Pulse';
import Swing from 'react-reveal/Swing';
import HeadShake from 'react-reveal/HeadShake';


const RestaurantCard = (props) => {
  const { resData } = props;

  const {
    cloudinaryImageId,
    name,
    avgRating,
    cuisines,
    costForTwo,
    locality,
    areaName,
  } = resData?.info;
  const buttonStyle = {
    backgroundColor: avgRating >= 4 ? "#48c479" : "#db7c38",
  };
  return (
    <div className="res-card">
      <div className="offer-img-container">
        <HeadShake>
        <div className="offer">
          {resData?.info?.aggregatedDiscountInfoV3?.header}{" "}
          {resData?.info?.aggregatedDiscountInfoV3?.subHeader}
        </div>
        </HeadShake>
        <img
          className="res-logo"
          alt="res-logo"
          src={CDN_URL + cloudinaryImageId}
        />
      </div>
      <Pulse>
      <h3>{name}</h3>
      </Pulse>
      <div className="cuisines">{cuisines.join(", ")}</div>

      <div className="res-card-rating" style={buttonStyle}>
        <i className="fa fa-star"></i>
        <span>{avgRating}</span>
      </div>
      <h4 className="costForTwo">{costForTwo}</h4>
      <h4>{locality || areaName}</h4>
    </div>
  );
};
// Higher Order Component

// input - RestaurantCard =>> RestaurantCardPromoted

export const withPromtedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <label>offer</label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
