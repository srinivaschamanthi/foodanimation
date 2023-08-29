import React from "react";
import UserClass from "./UserClass";

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // if ("geolocation" in navigator) {
    //   navigator.geolocation.getCurrentPosition(function(position) {
    //     const  latitude = position.coords.latitude;
    //     const longitude = position.coords.longitude;
    //   }, function(error) {
    //     console.error("Error getting location:", error.message);
    //   });
    // } else {
    //   console.log("Geolocation is not available.");
    // }
  }

  render() {
    return (
      <div>
        <h1>about</h1>
        <UserClass/>
      </div>
    );
  }
}

export default About;
