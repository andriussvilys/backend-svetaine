import React, { Component } from 'react';
import { Context } from '../../Provider';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/jsonPreview.css';

export default class JsonPreview extends Component {
    static contextType = Context;

    makeList = (categories, state) => {
      let list = categories.map((item, index) => {
        let subcategories = [];
        // console.log(categories)
        // console.log(Object.keys(state.category[item]))

        if(Object.keys(state.category[item])){
            subcategories = Object.keys(state.category[item]).map((subcategory, subIndex) => {
            let listitems = [];
            if(state.category[item][subcategory]){
              listitems = state.category[item][subcategory].map((listitem, listIndex) => {
                  return(
                  <p key={`${subcategory}${listIndex}JsonPreviewLi`} className="jsonPreview--listitem">
                    {`"${listitem}", `}
                  </p>
                  )
                })
            }
              
              return(
            <div key={`${subcategory}${subIndex}JsonPreviewLi`} className="jsonPreview--subcategory">
              {`"${subcategory}": [ `}
              
              {listitems}
              ]
            </div>
              )
          })
        }

        return(
          <div key={`${item}${index}JsonPreviewLi`} className="jsonPreview--ul">
            {`"${item}": {`}
            {subcategories}
            }
          </div>
        )
      })
      return list
    }

    themesPreview = (array) => {
      let themes = array.map(theme => {
        return(<li key={`jsonPreview-${theme}`}>
          {theme}
        </li>)
      })
      return(
        <ul className="preview--list">
          {themes}
        </ul>
      )
    }

    booleanString = (stateKey) => {
      if(this.context.state[stateKey] === true){
        return "yes"
      }
      else{
        return "no"
      }
    }

    // this.state.category[category]
    isDisabled = () => {
      if(
        Object.keys(this.context.state.category).length > 0 &&
        this.context.state.file 
      ){
        return false
      }
      else{return true}
    }

    render() {
      // console.log("CATEGORY LENGTH")
      // console.log(Object.keys(this.context.state.category).length > 0)
      // console.log("file")
      // console.log(this.context.state.file)
        // console.log(this.props)
      return (
        <Context.Consumer>
          {()=>{
            return(
            <div className="DnD-jsonPreview">
                <div className="DnD-imageBox">
                  <div className="preview-container"><span className="preview-span">file name:</span> <div className="whiteSpace--break">{this.props.file.fileName}</div></div>
                  <div className="preview-container"><span className="preview-span">file type:</span> <div className="whiteSpace--break">{this.props.file.fileType}</div></div>
                  <div className="preview-container"><span className="preview-span">file path:</span> <div className="whiteSpace--break">{this.props.file.src}</div></div>
                  <div className="preview-container"><span className="preview-span">artwork Family:</span> <div className="whiteSpace--break">{this.context.state.artworkFamily}</div></div>
                  <div className="preview-container"><span className="preview-span">artwork Title:</span> <div className="whiteSpace--break">{this.context.state.artworkTitle}</div></div>
                  <div className="preview-container"><span className="preview-span">display on Main page:</span> <div className="whiteSpace--break">{this.booleanString("displayMain")}</div></div>
                  <div className="preview-container"><span className="preview-span">family display index:</span> <div className="whiteSpace--break">{this.props.index}</div></div>
                  <div className="preview-list-container preview-container"><span className="preview-span">themes:</span> <div className="whiteSpace--break">{this.themesPreview(this.context.state.themes)}</div></div>
                  <div className="preview-list-container preview-container"><span className="preview-span">seeAlso:</span> <div className="whiteSpace--break">{this.themesPreview(this.context.state.seeAlso)}</div></div>
                </div>
                <div className="jsonPreviewContainer">
                  <div>{'{'}</div>
                  <div className="category">
                  {`"category": {`}
                    <div className="jsonPreviewContent">
                      {this.makeList(Object.keys(this.context.state.category), this.context.state)}
                    </div>
                    }
                  </div>
                  <div>{'}'}</div>
                </div>
              </div>
            )
          }}
        </Context.Consumer>
      )
    }
  }

// function JsonPreview(props) {
//     return(
//         console.log(this.props)
//         <div>
//             category: {this.props.category}
//             subcategory: {this.props.subcategory}
//             listitem: {this.item.listitem}
//         </div>
//     )
// }

// export default JsonPreview;