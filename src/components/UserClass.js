import React from "react";
import Pulse from "react-reveal/Pulse";
import { Fade } from "react-reveal";

class UserClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url: "https://www.srinivaschamanthi.in/",
      userInfo: {
        name: "Dummy",
        location: "Default",
      },
    };
  }

  async componentDidMount() {
    // Api call

    const data = await fetch("https://api.github.com/users/srinivaschamanthi");
    const json = await data.json();

    this.setState({
      userInfo: json,
    });
  }

  componentDidUpdate() {}

  componentWillUnmount() {}

  render() {
    const { name, location, avatar_url } = this.state.userInfo;
    return (
      <div className="user-card">
        <Pulse>
        <img style={{ height: "100px" }} src={avatar_url} />
        </Pulse>
        <Fade right>
        <h2>{name}</h2>
        <h3>{location}</h3>
        <h4>Frontend Developer / UI Engineer</h4>
       <div>
        <a
          href={this.state.url}
          style={{ textDecoration: "none", color: "darkgrey" }}
        >

          ❤️SRINIVAS CHAMANTHI

        </a>
        </div>
        </Fade>
      </div>
    );
  }
}

export default UserClass;
