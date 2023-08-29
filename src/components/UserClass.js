import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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

  componentDidUpdate() {
    // console.log("Component Did Update");
  }

  componentWillUnmount() {
    // console.log("Component Will Unmount");
  }

  render() {
    // console.log(this.props.name + "Child Render");

    const { name, location, avatar_url } = this.state.userInfo;
    return (
      <div className="user-card">
        <img style={{height:'100px'}} src={avatar_url} />
        <h2>Name : {name}</h2>
        <h3>Location : {location}</h3>
        <h4>Contact : @srinivaschamanthi</h4>
      </div>
    );
  }
}

export default UserClass;