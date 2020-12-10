import React, { useState, Fragment } from "react";
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

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const searchRecipes = async (text) => {
    setLoading(true);

    const res = await axios.get(
      `https://api.edamam.com/search?q=${text}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`
    );
    setRecipes(res.data.hits);
    setLoading(false);
  };

  // Clear Recipes from state
  const clearRecipes = () => {
    setRecipes([]);
    setLoading(false);
  };

  // Set Alert
  const showAlert = (msg, type) => {
    setAlert({ msg, type });

    setTimeout(() => setAlert(null), 5000);
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={alert} />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Fragment>
                  <Search
                    searchRecipes={searchRecipes}
                    clearRecipes={clearRecipes}
                    showClear={recipes.length > 0 ? true : false}
                    setAlert={showAlert}
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
};

export default App;
