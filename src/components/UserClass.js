import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url:"https://www.srinivaschamanthi.in/",
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
  }

  componentWillUnmount() {
  }

  render() {

    const { name, location, avatar_url } = this.state.userInfo;
    return (
      <div className="user-card">
        <img style={{height:'100px'}} src={avatar_url} />
        <h2>{name}</h2>
        <h3>{location}</h3>
        <h4>Frontend Developer / UI Engineer</h4>
        <a href={this.state.url} style={{ textDecoration: "none", color: "darkgrey" }}>❤️SRINIVAS CHAMANTHI</a>
      </div>
    );
  }
}

export default UserClass;