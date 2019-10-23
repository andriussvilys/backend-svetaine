import React, { Component } from 'react';
import { Provider } from './components/Provider';
import { BrowserRouter, Route } from 'react-router-dom';
import ImageInfo from './components/ImageInfo';
import FrontEndIndex from './components/FrontEnd/FrontEndIndex'
import "bootstrap/dist/css/bootstrap.min.css";
import './css/main.css';



// const navData = require('./JSON/navigation.json');
// const categories = Object.keys(navData);

export default class App extends Component{

  render(){
    return(
      <BrowserRouter>
        <Provider>
          <div className="container">
            <div className="data-container">
              <FrontEndIndex />
              <Route path="/admin" component={ImageInfo} />
            </div>
          </div>
          </Provider>
      </BrowserRouter>
    )
  }
}