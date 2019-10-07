import React, { Component } from 'react';
import { Context } from './Provider';
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/components/navigationInfo.css';
import '../css/components/imageInfo.css';

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

    //methods that check cheboxes if state has appropriate values and unchecks it if not
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
                                onChange={(e) => this.context.onCheck(e)} 
                                checked={this.context.categoryMethods.autoCheckListItem(obj.category, subcategory, listitem)}
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
                        onChange={(e) => this.context.onCheck(e)} 
                        checked={this.context.categoryMethods.autoCheckSubcategory(obj.category, subcategory)}
                        />
    
                        <span>{subcategory}</span>
                        {listItems}
                     </ul>)
                })
            }
            return (
            <div key={obj.category} className="list-group">
                <ul id={obj.category} className="list--category"> 
                    <input 
                        className="navigation-input category" 
                        type="checkbox" 
                        value={obj.category} 
                        onChange={(e) => this.context.onCheck(e)} 
                        checked={this.context.categoryMethods.autoCheckCategory(obj.category)}
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
                    <h3>categories</h3>

                    <div className="list--container">
                            {this.makeCategories()}
                    </div>

                    <div className="imageInfo--section" style={{backgroundColor: "#a8b4b9"}} >
                        <h5>add new category</h5>
                        <div className="imageInfo--box">
                            <input type="text" 
                                list="datalist-add-categories"
                                name="add-category" 
                                id="add-category" 
                                placeholder="category"
                                style={{marginRight: "30px"}}
                                onFocus={this.context.categoryMethods.getCategoryNames}
                            />
                            <datalist id="datalist-add-categories">
                                {this.context.state.categoryDatalist}
                            </datalist>

                            <input type="text" 
                                list="datalist-add-subcategories"
                                name="add-subcategory" 
                                id="add-subcategory" 
                                placeholder="subcategory"
                                style={{marginRight: "30px"}}
                                onFocus={this.context.categoryMethods.getSubcategoryNames}
                            />
                            <datalist id="datalist-add-subcategories">
                                {this.context.state.subcategoryDatalist}
                            </datalist>

                            <input type="text" 
                                name="add-listitem" 
                                id="add-listitem" 
                                placeholder="listitem"
                                style={{marginRight: "30px"}}
                            />
                            <Button
                                style={{marginRight: "30px"}}
                                variant="success" 
                                size="sm"
                                onClick={
                                    this.context.categoryMethods.updateCategory
                                }
                            >
                                SUBMIT
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            }
        </Context.Consumer>
    )
  }
}