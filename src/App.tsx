import React from "react";
import { Login, Products, AddProduct } from "./screens/Imports";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className=" w-screen h-screen p-12 bg-yellow-400">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/products" component={Products} />
          <Route path="/add" component={AddProduct} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
