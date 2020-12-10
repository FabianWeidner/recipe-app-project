import React, { Component, Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import Alert from "./components/layout/Alert";

import About from "./components/pages/About";
import Navbar from "./components/layout/Navbar";
import Recipes from "./components/recipes/Recipes";
import Search from "./components/recipes/Search";

const YOUR_APP_ID = "bfee1965";
const YOUR_APP_KEY = "751bcfba086263b93fe3ba2c26daa97f";

class App extends Component {
  state = {
    recipes: [],
    loading: false,
    alert: null,
  };

  async componentDidMount() {
    this.setState({ loading: false });
  }
  searchRecipes = async (text) => {
    this.setState({ loading: true });

    const res = await axios.get(
      `https://api.edamam.com/search?q=${text}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`
    );
    this.setState({ recipes: res.data.hits, loading: false });
  };

  // Clear Recipes from state
  clearRecipes = () => this.setState({ recipes: [], loading: false });

  // Set Alert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });

    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  render() {
    const { recipes, loading } = this.state;

    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Fragment>
                    <Search
                      searchRecipes={this.searchRecipes}
                      clearRecipes={this.clearRecipes}
                      showClear={recipes.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Recipes loading={loading} recipes={recipes} />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
export default App;
