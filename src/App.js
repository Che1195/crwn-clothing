import React from "react";
import { Route, Switch } from "react-router-dom";
import { auth } from "./firebase/firebase.utils";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import "./App.css";
import SignInAndSignUp from "./pages/sign-in-sign-up/sign-in-sign-up.component";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      this.setState({ currentUser: user });

      console.log(user);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/signin" component={SignInAndSignUp} />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
