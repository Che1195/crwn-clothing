import React from "react";
import "./sign-in.component";

class SignIn extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({ email: "", password: "" });
  };

  handleChange = (event) => {
    const { name, value } = event;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="sign-in">
        <div>I already have an account</div>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            value={this.state.email}
            required
            onChange={this.handleChange}
          ></input>
          <label>Email</label>
          <input
            type="password"
            name="password"
            value={this.state.password}
            required
            onChange={this.handleChange}
          ></input>
          <label>Password</label>
          <input type="submit" value="Submit Form"></input>
        </form>
      </div>
    );
  }
}

export default SignIn;
