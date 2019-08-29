import React, { Component } from 'react';
import { Context } from './Provider';
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

  themeList = () => {
      let sortedArray = this.context.state.themes.sort();
      let themes = sortedArray.map((theme, index) => {
          return (
              <li className="dropdown-item themes-list" key={`theme${index}`}>
                  <span className="themes-span">{theme}</span>
                  <input className="themes-checkbox" type="checkbox"/>
              </li>
          )
      })
      function splitThemes(){
        const groups = Math.round(themes.length / 10);
        let sortedThemes = [];
        for (let index = 0; index < groups; index++) {
          sortedThemes = [...sortedThemes, []];
        }
        let counter = 1;
        let subcounter = 0;
        themes.forEach((theme, index)=> {
          console.log(index)

          if(index < 9){
            sortedThemes[0] = [...sortedThemes[0], theme]
          }
          
          else{
            // index.toString().startsWith(counter.toString())
            subcounter += 1;
            console.log(`subcounter is ${subcounter}`)
            if(Number.isInteger(subcounter / 10)){
              counter += 1;
            }
            sortedThemes[counter] = [...sortedThemes[counter], theme]
          }
        })
        console.log(sortedThemes)
        let themeUls = sortedThemes.map(array => {
          return(<ul>
            {array}
          </ul>)
        })
        return themeUls;
      }

      return splitThemes()
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
              // <div className="dropdown themeSelector">
              //     <button className="btn btn-secondary dropdown-toggle" 
              //             type="button" 
              //             id="themeButton" 
              //             data-toggle="dropdown" 
              //             aria-haspopup="true" 
              //             aria-expanded="false"
              //             onClick={this.themeButton}>
              //       Select Themes
              //     </button>
              //   <ul className="dropdown-menu themelist" id="themelist">
              //       {this.themeList()}
              //   </ul>
              // </div>
              <div className="themeSelector">
                {/* <ul className="themelist" id="themelist"> */}
                    {this.themeList()}
                {/* </ul> */}
              </div>
            )
          }}
        </Context.Consumer>
      )
  }
}