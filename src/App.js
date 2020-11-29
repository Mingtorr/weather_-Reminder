import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Login from "./login/login";
import Sign from "./sign/sign";
import Main from "./main/main";
class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={Login} />
        <Route exact path="/sign" component={Sign} />
        <Route exact path="/main" component={Main} />
      </BrowserRouter>
    );
  }
}

export default App;
