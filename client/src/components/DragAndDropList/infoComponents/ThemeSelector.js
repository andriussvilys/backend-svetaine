import React, { Component } from 'react';
import { Context } from '../../Provider';
import AddNew from './AddNew';
import ExtendedList from './ExtendedList';

// import "bootstrap/js/dist/util.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/imageInfo.css";

export default class ImageInfo extends Component{

  static contextType = Context;

  constructor(props){
    super(props);
    this.state = {
      button: 0
    }
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

  // themesGET = () => {
  //   axios.get('/api/themes')
  //   .then( res => {
  //     // console.log('reached 5000')
  //     // console.log(res.data)
  //     let themes = res.data[0].list
  //     console.log(themes)
  //     return themes
  //   })
  // }

  // themesADD = () => {
  //   const newTheme = document.getElementById('theme-add').value;
  //   axios.put('/api/themes/update', {"list": newTheme})
  //   .then( res => {
  //     let themes = res.data.list
  //     console.log(themes)
  //     return themes
  //   })
  // }

//   componentDidMount(){
//     console.log('component did mount')
//     this.context.loadData("themes")
// }

  render(){
      return(
        <Context.Consumer>
          {() => {
            return(

              <div>
                <ExtendedList 
                listName="select themes: "
                array={this.context.state.themesData}
                string="themes"
                id="themeList"
                >
                </ExtendedList>

                {/* <div className="imageInfo--box">
                  <p>add new theme: </p> <input id="theme-add" type="text" />
                  <button onClick={this.themesADD}>SEND</button>  
                </div> */}

                <AddNew
                  router={'/api/themes/update'}
                  stateKey='themesData'
                  requestKey="list"
                />

                {/* <div className="imageInfo--box">
                  <p>console log all themes: </p>
                  <button onClick={this.context.themesGET}>GET</button>
                </div> */}

              </div>
            )
          }}
        </Context.Consumer>
      )
  }
}