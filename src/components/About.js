import React from "react";
import UserClass from "./UserClass";

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <h1>About</h1>
        <UserClass />
      </div>
    );
  }
}

export default About;
