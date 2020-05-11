import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, } from 'react-router-dom';

import FrontEndContext from './components/FrontEnd/FrontEndContext'

import "bootstrap/dist/css/bootstrap.min.css";
// import './css/main.css';

export default class App extends Component{

  render(){
    return(
        <BrowserRouter>
              <div className="app-container" >

              <Switch>
                <Route  path="/" exact component={FrontEndContext} />
                <Route to="/*" exact component={FrontEndContext} />
              </Switch>

              </div>
        </BrowserRouter>
    )
  }
}