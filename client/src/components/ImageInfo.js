import React, { Component } from 'react';
import { Context } from './Provider';
import axios from 'axios';
import ThemeSelector from './ThemeSelector';
import FamilyInfo from './FamilyInfo';
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/components/imageInfo.css";

export default class ImageInfo extends Component{

  static contextType = Context;

  constructor(props){
    super(props);
    this.state = {
      category: {}
    }
  }

  render(){
      return(
        <Context.Consumer>
          {() => {
            return(
            <div className="imageInfo">
              <h3>image info:</h3>
              <div className="imageInfo--section">
                  <h5>file upload:</h5>
                  <div className="imageInfo--box">
                    <span>Upload file:</span> <input type="file" className="imageInfo--fileUpload" onChange={this.context.uploadFile} /><br/>
                  </div>
                  <div className="imageInfo--box">
                    <span>Change file name:</span> <input type="text" value={this.context.state.fileName} onChange={this.context.changeFileName} />
                </div>
                <div className="imageInfo--box">
                  <span>display on main page:</span>
                  <form>
                      <div className="container-radio">
                          <label htmlFor="mainDisplayIndex_yes">yes</label>
                          <input 
                            type="radio" 
                            defaultChecked 
                            name="mainDisplayIndex" 
                            id="mainDisplayIndex__yes" 
                            value="yes" 
                            onChange={(e)=>{this.context.onChange(e, "displayMain")}}
                            />
                      </div>
                      <div className="container-radio">
                          <label htmlFor="mainDisplayIndex_no">no</label>
                          <input 
                            type="radio" 
                            name="mainDisplayIndex" 
                            id="mainDisplayIndex__no" 
                            value="no" 
                            onChange={(e)=>{this.context.onChange(e, "displayMain")}}
                            />
                      </div>
                    </form>
                </div>
                <div className="imageInfo--box">
                  <span>display state in console:</span>
                  <button className="btn btn-primary btn-sm"
                  onClick={()=>{console.log(JSON.stringify(this.context.state))
                      }
                    }
                  >click to see</button>
                </div>
                <div className="imageInfo--box">
                  <span>display database in console:</span>
                  <button className="btn btn-primary btn-sm"
                    onClick={()=>{
                        axios.get('/api/artworkInfo')
                          .then( res => console.log(res.data))
                      }
                    }
                    >click to see</button>
                </div>
                <div className="imageInfo--box">
                  <span>post to database:</span>
                  <button className="btn btn-primary btn-sm"
                    onClick={()=>{
                        axios.post('/api/artworkInfo', JSON.stringify(this.context.state))
                          .then( res => { console.log(res)})
                              .then(() => axios.get('/api/artworkInfo'))
                                .then( res => console.log(res.data))
                          }
                      }
                    >POST</button>
                </div>
              </div>

              <div className="imageInfo--section">
                <h5>family info:</h5>
                <FamilyInfo/>
              </div>

              <div className="imageInfo--section">
                <h5>theme selector:</h5>
                {/* <div className="imageInfo--box"> */}
                  <ThemeSelector/>
                {/* </div> */}
              </div>

            </div>
            )
          }}
        </Context.Consumer>
      )
  }
}