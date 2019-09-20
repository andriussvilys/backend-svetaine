import React, { Component } from 'react';
import { Context } from './Provider'
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/components/navigationInfo.css';

const navData = require('../JSON/navigation.json');
const categories = Object.keys(navData);

export default class NavigationInfo extends Component{

    static contextType = Context;

    autoCheckListItem = (category, subcategory, listitem) => {
        if(this.context.state.category[category]){
            console.log("STATE HAS THIS CATEGORY")
            if(this.context.state.category[category][subcategory]){
                console.log("STATE HAS THIS CATEGORY")
                if(this.context.state.category[category][subcategory].includes(listitem)){
                    return true
                } 
                else{
                    return false
                }
            }
        }
    }
    autoCheckSubcategory = (category, subcategory) => {
        if(this.context.state.category[category]){
            if(this.context.state.category[category][subcategory]){
                return true
            }
            else{
                return false
            }
        }
    }

    autoCheckCategory = (category) => {
        if(this.context.state.category[category]){
                return true
            }
            else{
                return false
            }
    }
    //****************************************************************************************************
    //THIS METHOD DYNAMICALLY CREATES THE MENU 
    makeCategories = () => {
        let result = categories.map((category, index) => {
        // console.log(category)
        let subcategories = Object.keys(navData[category]).map(subcategory => {
            // console.log(navData[category][subcategory])
            let listitems = navData[category][subcategory].map((listitem, index) => {
            return(
                <li key={`${listitem}${index}}`} className="list--listitem list-group-item">
                <input 
                className="navigation-input listitem" 
                type="checkbox" 
                value={listitem} 
                id={listitem} 
                onChange={this.context.onCheck} 
                checked={this.autoCheckListItem(category, subcategory, listitem)}
                />

                <span>{listitem}</span>  
                </li>
            )
            })
            return(
            <ul key={subcategory} id={subcategory} className="list--subcategory list-group list-group-item">
                <input 
                className="navigation-input subcategory" 
                type="checkbox" 
                value={subcategory} 
                onChange={this.context.onCheck} 
                checked={this.autoCheckSubcategory(category, subcategory)}
                />

                <span>{subcategory}</span>
                {listitems}
            </ul>
            )
        })
    return(
        <div key={category} label={category} className="list-group">
        <ul id={category} className="list--category"> 
        <input 
        className="navigation-input category" 
        type="checkbox" 
        value={category} 
        onChange={this.context.onCheck} 
        checked={this.autoCheckCategory(category)}
        /> 
        <span>{category}</span>
        {subcategories}
        </ul>
        </div>
    )
    })
    return result
    }

  render(){
    return(
        <Context.Consumer>
            { () => {return(
                <div>
                    <h3>categories</h3>
                    <div className="list--container">
                            {this.makeCategories()}
                    </div>
                </div>
            )}
            }
        </Context.Consumer>
    )
  }
}