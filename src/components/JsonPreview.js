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

    // this.state.category[category]


    render() {
        // console.log(this.props)
      return (
          <div className="jsonPreview">
            <h3 className="headline">json preview</h3>
            <div className="imageBox">
              <img 
              // src={this.context.state.uploadURL} 
              src={this.context.state.uploadURL} 
              alt="" 
              className="uploadPreview" 
              />
              <p>file name: {this.context.state.fileName}</p>
              <p>file type: {this.context.state.fileType}</p>
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