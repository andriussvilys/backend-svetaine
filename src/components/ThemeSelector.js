import React, { Component } from 'react';
import { Context } from './Provider';
import "bootstrap/js/dist/util.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/components/imageInfo.css";

export default class ImageInfo extends Component{

  constructor(props){
    super(props);
    this.state = {
      button: 0
    }
  }

  static contextType = Context;

  themeList = () => {
      let themes = this.context.state.themes.map((theme, index) => {
          return (
              <li className="dropdown-item" key={`theme${index}`}>
                  <input type="checkbox"/><span>{theme}</span>
              </li>
          )
      })
      console.log(themes)
      return themes
  }
  themeButton = () => {
    if(this.state.button === 0){
      document.getElementById('themelist').classList.add('themelist__display');
      this.setState({ button: 1})
      return
    }
    else{
      document.getElementById('themelist').classList.remove('themelist__display');
      this.setState({ button: 0})
    }
  }

  render(){
      return(
        <Context.Consumer>
          {() => {
            return(
              <div className="dropdown themeSelector">
                  <button className="btn btn-secondary dropdown-toggle" 
                          type="button" 
                          id="themeButton" 
                          data-toggle="dropdown" 
                          aria-haspopup="true" 
                          aria-expanded="false"
                          onClick={this.themeButton}>
                    Select Themes
                  </button>
                <ul className="dropdown-menu themelist" id="themelist">
                    {this.themeList()}
                </ul>
              </div>
            )
          }}
        </Context.Consumer>
      )
  }
}