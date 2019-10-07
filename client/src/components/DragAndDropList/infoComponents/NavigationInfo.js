import React, { Component } from 'react';
import { Context } from '../../Provider';
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/navigationInfo.css';
import '../css/imageInfo.css';

export default class NavigationInfo extends Component{

    static contextType = Context;

    constructor(props){
        super(props);
        this.state = {
            categoryNames: [],
            categoryDatalist: null,
            selectedCategory: null,
            subcategoryDatalist: null,

        }
    }

    //methods that check cheboxes if state has appropriate values and vice versa
    autoCheckListItem = (category, subcategory, listitem) => {
        if(!this.context.state.familySetupData.category){return}
        if(this.context.state.familySetupData.category[category]){
            if(this.context.state.familySetupData.category[category][subcategory]){
                if(this.context.state.familySetupData.category[category][subcategory].includes(listitem)){
                    return true
                } 
                else{
                    return false
                }
            }
        }
    }
    autoCheckSubcategory = (category, subcategory) => {
        if(!this.context.state.familySetupData.category){return}
        if(this.context.state.familySetupData.category[category]){
            if(this.context.state.familySetupData.category[category][subcategory]){
                return true
            }
            else{
                return false
            }
        }
    }
    autoCheckCategory = (category) => {
        if(!this.context.state.familySetupData.category){return}
        if(this.context.state.familySetupData.category[category]){
                return true
            }
            else{
                return false
            }
    }

    //****************************************************************************************************
    //THIS METHOD DYNAMICALLY CREATES THE MENU 

    makeCategories = () => {
        

        let result = this.context.state.categoriesData.map(obj => {

            let subcategories = null;

            if(obj.subcategory){
                let allSubcategories = Object.keys(obj.subcategory)
                subcategories = allSubcategories
                .map(subcategory => {
    
                    let listItems = obj.subcategory[subcategory].map((listitem, index) => {
                        return (
                            <li key={`${listitem}${index}}`} className="list--listitem list-group-item">
                                <input 
                                className="navigation-input listitem" 
                                type="checkbox" 
                                value={listitem} 
                                id={listitem} 
                                onChange={this.context.onCheck} 
                                checked={this.autoCheckListItem(obj.category, obj.subcategory, listitem)}
                                />
            
                                <span>{listitem}</span>  
                            </li>
                        )
                    })
    
                    // console.log('******************LIST iTEMS')
                    // console.log(listItems)
                    
                    return(
                    <ul key={subcategory} id={subcategory} className="list--subcategory list-group list-group-item">
                        <input 
                        className="navigation-input subcategory" 
                        type="checkbox" 
                        value={subcategory} 
                        onChange={this.context.onCheck} 
                        checked={this.autoCheckSubcategory(obj.category, subcategory)}
                        />
    
                        <span>{subcategory}</span>
                        {listItems}
                     </ul>)
                })
            }

            console.log('are subcategories formed')
            console.log(subcategories)
            return (
            <div key={obj.category} className="list-group">
                <ul id={obj.category} className="list--category"> 
                    <input 
                        className="navigation-input category" 
                        type="checkbox" 
                        value={obj.category} 
                        onChange={this.context.onCheck} 
                        checked={this.autoCheckCategory(obj.category)}
                    /> 
                    <span>{obj.category}</span>
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