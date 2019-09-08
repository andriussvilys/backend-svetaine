import React, { Component } from 'react';
import { Context } from './Provider';
import axios from 'axios';
import ExtendedList from './ExtendedList';

// import "bootstrap/js/dist/util.js";
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

  themesGET = () => {
    axios.get('/api/themes')
    .then( res => {
      let themes = res.data[0].list
      console.log(themes)
      return themes
    })
  }

  render(){
      return(
        <Context.Consumer>
          {() => {
            return(

              <div>
                <ExtendedList 
                listName="select themes: "
                array={this.context.themes}
                string="themes"
                id="themeList"
                >
  
                </ExtendedList>
                <div className="imageInfo--box">
                  <p>add new theme: </p> <input type="text" />
                  <button onClick={this.themes}>SEND</button>                  
                  <div>
                  <button onClick={this.themesGET}>GET</button>
                  </div>
                </div>
              </div>

              // <div className="themeSelector">
              //       {this.context.makeDataList(this.context.themes, 'theme')}
              //       {/* {this.themeList()} */}
              //       {this.context.splitList(this.context.themes, 'theme')}

              // </div>
            )
          }}
        </Context.Consumer>
      )
  }
}