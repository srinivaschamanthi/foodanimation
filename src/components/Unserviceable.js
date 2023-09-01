import React from "react";
import location_unserviceable from "../assets/location_unserviceable.png";

const Unserviceable = () => {
  return (
    <div className="unservicable">
      <img src={location_unserviceable} className="unservicable_img"/>
      <h2>Location Unserviceable</h2>
      <h4>We don’t have any services here till now.</h4>
      <h4> Try changing location.</h4>
    </div>
  );
};

export default Unserviceable;
