import React, { Component } from 'react';
import { Context } from './Provider';
// import {DisplayTriggerList as List} from './DisplayTriggerList'
import DisplayTriggerList from './DisplayTriggerList'

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

    getSubcategories = (file) => {
        let categories = Object.keys(this.props.file.category)
        let subcategories = []
        categories.forEach(category => {
            subcategories = [...subcategories, [...Object.keys(file.category[category])]]
        })
        return subcategories
    }
    getListitems = (file) => {
        const categories = Object.keys(this.props.file.category)
        const subcategories = this.getSubcategories(file)
        let listItems = []
        categories.forEach(category => {
            let subcategories = Object.keys(file.category[category])
            subcategories.forEach(sub => {
                if(!file.category[category][sub].length > 0){return}
                listItems = [...listItems, [...file.category[category][sub]]]
            })
        })
        return listItems
    }
    getYearLocation = (file) => {
        let array = []
        if(file.year){array = [...array, file.year]}
        if(file.location){array = [...array, file.location]}
        return array
    }

    render(){
        return(
            <Context.Consumer>
            {()=>{
                return(
                <div>

                    <div className="imageInfo--box">
                        <div>
                        <p>Add Artwork title:</p> 
                        <p className="subtitle">(different from family name):</p>
                        </div>
                        <input 
                        value={this.props.file.artworkTitle}
                        type="text" 
                        onChange={(e) => this.props.onChange(e.target.value, 'artworkTitle', this.props.fileName)} 
                        />
                    </div>

                    <div className="imageInfo--box">
                  <span>display on main page:</span>
                  <form className="artworkinfo--form">
                      <div className="container-radio">
                          <label htmlFor="mainDisplayIndex_yes">yes</label>
                          <input 
                            type="radio" 
                            // defaultChecked 
                            checked={this.props.state.fileData.files[this.props.fileName].displayMain}
                            name="mainDisplayIndex" 
                            id="mainDisplayIndex__yes" 
                            value="yes" 
                            onChange={(e)=>{this.props.onChange(true, "displayMain", this.props.fileName)}}
                            />
                      </div>
                      <div className="container-radio">
                          <label htmlFor="mainDisplayIndex_no">no</label>
                          <input 
                            checked={!this.props.state.fileData.files[this.props.fileName].displayMain}
                            type="radio" 
                            name="mainDisplayIndex" 
                            id="mainDisplayIndex__no" 
                            value="no" 
                            onChange={(e)=>{this.props.onChange(false, "displayMain", this.props.fileName)}}
                            />
                      </div>
                    </form>
                    
                    </div>

                    <div className="imageInfo--box">
                        <span>year:</span>
                            <input 
                            type="number" 
                            min="1992" 
                            value={this.props.file.year}
                            onChange={(e) => this.props.onChange(e.target.value, "year", this.props.fileName) } 
                            />
                    </div>

                    <div className="imageInfo--box">
                        <span>location:</span>
                            <input 
                            type="text" 
                            value={this.props.file.location}
                            onChange={(e) => this.props.onChange(e.target.value, "location", this.props.fileName) } 
                            />
                    </div>

                    <div className="imageInfo--box"></div>

                    {/* DESCRIPTION */}
                    <div className="imageInfo--box"  style={{display: "block"}}>
                        <div>
                            <p>Artwork description:</p> 
                            <p className="subtitle">this is describes particulars of a work in a series or exhibit in a show</p>
                        </div>
                        <textarea
                            value={this.props.file.artworkDescription}
                        onChange={
                            (e) => this.props.onChange(e.target.value, "artworkDescription", this.props.fileName)
                        }
                        style={{width: "100%"}}
                        ></textarea>
                    </div>
                    
                    <div className="imageInfo--box">
                        <div>
                            <p>Display triggers</p>
                            <DisplayTriggerList 
                                title={'category'}
                                data={Object.keys(this.props.file.category)}
                            />
                            <DisplayTriggerList 
                                title={'subcategory'}
                                data={this.getSubcategories(this.props.file)}
                            />
                            <DisplayTriggerList 
                                title={'List Items'}
                                data={this.getListitems(this.props.file)}
                            />
                            <DisplayTriggerList 
                                title={'Themes'}
                                data={this.props.file.themes}
                            />
                            <DisplayTriggerList 
                                title={'Year/Location'}
                                data={this.getYearLocation(this.props.file)}
                            />
                        </div>
                    </div>

                </div>
                )

            }}    
            </Context.Consumer>
        )
    }


  }