import logo from './logo.svg';
import React, { Component } from 'react';
import { Route,BrowserRouter, Switch } from 'react-router-dom';
import Login from './login/login';

class App extends React.Component{
  render(){
    return(
      <BrowserRouter>
        <Route exact path="/" component={Login}/>
      </BrowserRouter>
    )
  }
}

export default App;
