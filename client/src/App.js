import React, { Component } from 'react';
import { Provider } from './components/Provider';
import JsonPreview from './components/JsonPreview';
import ImageInfo from './components/ImageInfo';
import NavigationInfo from './components/NavigationInfo'

import "bootstrap/dist/css/bootstrap.min.css";
import './css/main.css';



// const navData = require('./JSON/navigation.json');
// const categories = Object.keys(navData);

export default class App extends Component{

  render(){
    return(
      <Provider>
        <div className="container">
          <div className="data-container">
            <ImageInfo />
            <NavigationInfo onClick={this.onCheck}/>
          </div>
            <JsonPreview />
      </div>
        </Provider>
    )
  }
}