import React, { Component } from 'react';
import { Context } from './Provider'
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/components/jsonPreview.css';

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


    render() {
        // console.log(this.props)
      return (
        <Context.Consumer>
          {()=>{
            return(
            <div className="jsonPreview">
                <h3 className="headline">image preview</h3>
                <div className="imageBox">
                  <img 
                  // src={this.context.state.uploadURL} 
                  src={this.context.state.uploadURL} 
                  alt="" 
                  className="uploadPreview" 
                  />
                  <div className="preview-container"><span className="preview-span">file name:</span> {this.context.state.fileName}</div>
                  <div className="preview-container"><span className="preview-span">file type:</span> {this.context.state.fileType}</div>
                  <div className="preview-container"><span className="preview-span">artwork Family:</span> {this.context.state.artworkFamily}</div>
                  <div className="preview-container"><span className="preview-span">display on Main page:</span> {this.booleanString("displayMain")}</div>
                  <div className="preview-container"><span className="preview-span">family display index:</span> {this.context.state.familyDisplayIndex}</div>
                  <div className="preview-list-container preview-container"><span className="preview-span">themes:</span> {this.themesPreview(this.context.state.themes)}</div>
                  <div className="preview-list-container preview-container"><span className="preview-span">seeAlso:</span> {this.themesPreview(this.context.state.seeAlso)}</div>
                </div>
                <h3 className="headline">json preview</h3>
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