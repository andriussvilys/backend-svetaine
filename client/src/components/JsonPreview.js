import React, { Component } from 'react';
import { Context } from './Provider';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
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
            <div className="jsonPreview">
                <h3 className="headline">image preview</h3>
                <div className="imageBox">
                  <img 
                  // src={this.context.state.imagePreview} 
                  src={this.context.state.imagePreview ? this.context.state.imagePreview : 'uploads/galaxy-s10plus-g975f-sm-g975fckhseb-backceramicblack.png'}
                  alt="" 
                  className="uploadPreview" 
                  />
                  <div className="preview-container"><span className="preview-span">file name:</span> <div className="whiteSpace--break">{this.context.state.fileName}</div></div>
                  <div className="preview-container"><span className="preview-span">file type:</span> <div className="whiteSpace--break">{this.context.state.fileType}</div></div>
                  <div className="preview-container"><span className="preview-span">file path:</span> <div className="whiteSpace--break">{this.context.state.filePath}</div></div>
                  <div className="preview-container"><span className="preview-span">artwork Family:</span> <div className="whiteSpace--break">{this.context.state.artworkFamily}</div></div>
                  <div className="preview-container"><span className="preview-span">artwork Title:</span> <div className="whiteSpace--break">{this.context.state.artworkTitle}</div></div>
                  <div className="preview-container"><span className="preview-span">display on Main page:</span> <div className="whiteSpace--break">{this.booleanString("displayMain")}</div></div>
                  <div className="preview-container"><span className="preview-span">family display index:</span> <div className="whiteSpace--break">{this.context.state.familyDisplayIndex}</div></div>
                  <div className="preview-list-container preview-container"><span className="preview-span">themes:</span> <div className="whiteSpace--break">{this.themesPreview(this.context.state.themes)}</div></div>
                  <div className="preview-list-container preview-container"><span className="preview-span">seeAlso:</span> <div className="whiteSpace--break">{this.themesPreview(this.context.state.seeAlso)}</div></div>
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
                <div
                  style={{
                    position: "fixed",
                    bottom: 0,
                    display: "flex",
                    flexDirection: "column",
                    height: "100px",
                    width: "100%",
                    backgroundColor: "#2f2f2f",
                    alignItems: "left",
                    color: "#a8a8a8",
                    fontSize: "12px"

                  }}
                >
                  <p className="whiteSpace--break">minimal requirements:</p>
                  <p>Upload File</p>
                  <p>Select Categories</p>
                  <Button  
                    variant="success"
                    disabled={this.isDisabled()}                 
                    onClick={
                          ()=>{

                          let artworkInfoData = 
                          {                          
                          category: this.context.state.category ?  this.context.state.category : null,
                          filePath: this.context.state.filePath ?  this.context.state.filePath : null,
                          fileName: this.context.state.fileName ?  this.context.state.fileName : null,
                          artworkFamily: this.context.state.artworkFamily ?  this.context.state.artworkFamily : null,
                          familyDescription: this.context.state.familyDescription ?  this.context.state.familyDescription : null,
                          artworkTitle: this.context.state.artworkTitle ?  this.context.state.artworkTitle : null,
                          artworkDescription: this.context.state.artworkDescription ?  this.context.state.artworkDescription : null,
                          displayMain: this.context.state.displayMain ?  this.context.state.displayMain : null,
                          familyDisplayIndex: this.context.state.familyDisplayIndex ?  this.context.state.familyDisplayIndex : null,
                          fileType: this.context.state.fileType ?  this.context.state.fileType : null,
                          themes: this.context.state.themes ?  this.context.state.themes : null,
                          seeAlso: this.context.state.seeAlso ?  this.context.state.seeAlso : null,
                          location: this.context.state.location ?  this.context.state.location : null,
                          year: this.context.state.year ?  this.context.state.year : null
                          }

                            console.log(artworkInfoData)
                            axios.post('/api/artworkInfo/create', artworkInfoData)
                              .then( res => { console.log(res.data)})
                              .then(res => this.context.uploadFile())
                                  // .then(() => axios.get('/api/artworkInfo'))
                                  //   .then( res => console.log(res.data))
                              }
                          }
                    style={{
                      width: "298px",
                      height: "45px"
                    }}
                  >
                    SEND TO DATABSE
                  </Button>
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