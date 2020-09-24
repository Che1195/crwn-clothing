import React from "react";
import FormInput from "../../components/form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
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
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={this.state.email}
            required
            onChange={this.handleChange}
            label="email"
          ></FormInput>
          <FormInput
            type="password"
            name="password"
            value={this.state.password}
            required
            onChange={this.handleChange}
            label="password"
          ></FormInput>
          <CustomButton type="submit"> Sign In</CustomButton>
        </form>
      </div>
    );
  }
}

export default SignIn;
