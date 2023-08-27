import React from "react";
import UserClass from "./UserClass";

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    //console.log("Parent Constructor");
  }

  componentDidMount() {
    //console.log("Parent Component Did Mount");
    // if ("geolocation" in navigator) {
    //   navigator.geolocation.getCurrentPosition(function(position) {
    //     const  latitude = position.coords.latitude;
    //     const longitude = position.coords.longitude;
    //     console.log("Latitude:", latitude);
    //     console.log("Longitude:", longitude);
    //   }, function(error) {
    //     console.error("Error getting location:", error.message);
    //   });
    // } else {
    //   console.log("Geolocation is not available.");
    // }
  }

  render() {
    //console.log("Parent Render");
    return (
      <div>
        <h1>about</h1>
        <UserClass/>
      </div>
    );
  }
}

export default About;
