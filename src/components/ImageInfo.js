import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/components/imageInfo.css"

const navData = require('../JSON/navigation.json');

export default class ImageInfo extends Component{

  constructor(props){
    super(props);
    this.state = {
      category: {}
    }
  }

  render(){
      return(
          <div className="imageInfo">image info</div>
      )
  }
}