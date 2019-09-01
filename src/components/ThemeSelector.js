import React, { Component } from 'react';
import { Context } from './Provider';
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

  // themeList = () => {
  //     let sortedArray = this.context.themes.sort();
  //     let themes = sortedArray.map((theme, index) => {
  //         return (
  //             <li className="dropdown-item themes-list" key={`theme${index}`}>
  //                 <span className="themes-span">{theme}</span>
  //                 <input className="themes-checkbox" type="checkbox" value={theme} onChange={(e) => this.context.themesCheck(e)}/>
  //             </li>
  //         )
  //     })
  //     function splitThemes(){
  //       const groups = Math.round(themes.length / 10);
  //       let sortedThemes = [];
  //       for (let index = 0; index < groups; index++) {
  //         sortedThemes = [...sortedThemes, []];
  //       }
  //       let counter = 1;
  //       let subcounter = 0;
  //       themes.forEach((theme, index)=> {
  //         console.log(index)

  //         if(index < 9){
  //           sortedThemes[0] = [...sortedThemes[0], theme]
  //         }
          
  //         else{
  //           // index.toString().startsWith(counter.toString())
  //           subcounter += 1;
  //           console.log(`subcounter is ${subcounter}`)
  //           if(Number.isInteger(subcounter / 10)){
  //             counter += 1;
  //           }
  //           sortedThemes[counter] = [...sortedThemes[counter], theme]
  //         }
  //       })
  //       console.log(sortedThemes)
  //       let themeUls = sortedThemes.map((array, index) => {
  //         return(<ul key={`themeListColumn-${index}`}>
  //           {array}
  //         </ul>)
  //       })
  //       return themeUls;
  //     }

  //     return splitThemes()
  // }
  

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

              <ExtendedList 
              listName="select themes: "
              array={this.context.themes}
              string="themes"
              id="themeList"
              >

              </ExtendedList>

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