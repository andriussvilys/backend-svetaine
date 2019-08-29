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
      <div className="container">
        <Provider>
          <div className="data-container">
            <NavigationInfo onClick={this.onCheck}/>
            <ImageInfo />
          </div>
            <JsonPreview />
        </Provider>
      </div>
    )
  }
}