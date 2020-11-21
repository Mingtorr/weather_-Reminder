import logo from './logo.svg';
import React, { Component } from 'react';
import { Route,BrowserRouter, Switch } from 'react-router-dom';
import Login from './login/login';
import Sign from './sign/sign'
import Main from './main/main'
class App extends React.Component{
  render(){
    return(
      <BrowserRouter>
        <Route exact path="/" component={Login}/>
        <Route exact path="/sign" component={Sign}/>
        <Route exact path="/main" component={Main}/>
      </BrowserRouter>
    )
  }
}

export default App;
