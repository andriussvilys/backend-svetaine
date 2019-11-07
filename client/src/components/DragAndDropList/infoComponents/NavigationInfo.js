import React, { Component } from 'react';
import { Context } from '../../Provider';

import Button from 'react-bootstrap/Button';

import "bootstrap/dist/css/bootstrap.min.css";
import '../../../css/components/navigationInfo.css';
import '../../../css/components/imageInfo.css';

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
    autoCheckCategories = (category, subcategory, listitem, fileName) => {
        if(!this.context.state.fileData.files[fileName].categories){return}
        if(this.context.state.fileData.files[fileName].categories[category]){
            if(this.context.state.fileData.files[fileName].categories[category][subcategory]){
                if(this.context.state.fileData.files[fileName].categories[category][subcategory].includes(listitem)){
                    return true
                } 
                else{
                    return false
                }
            }
        }
    }
    autoCheckCategories = (category, subcategory, fileName) => {
        if(!this.context.state.fileData.files[fileName].categories){return}
        if(this.context.state.fileData.files[fileName].categories[category]){
            if(this.context.state.fileData.files[fileName].categories[category][subcategory]){
                return true
            }
            else{
                return false
            }
        }
    }
    autoCheckCategories = (category, fileName) => {
        if(!this.context.state.fileData.files[fileName].categories){return}
        if(this.context.state.fileData.files[fileName].categories[category]){
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
                            <li key={`${listitem}${index}}`} 
                            className={
                            `list--listitem list-group-item
                            ${this.context.categoryMethods.autoCheckCategories(obj.category, subcategory, listitem, this.props.fileName) ? "themes-list--selected" : null}`}>
                                    <input 
                                    className="navigation-input listitem" 
                                    type="checkbox" 
                                    value={listitem} 
                                    id={listitem} 
                                    onChange={(e) => this.context.onCheck(e, this.props.fileName)} 
                                    checked={this.context.categoryMethods.autoCheckCategories(obj.category, subcategory, listitem, this.props.fileName)}
                                    />
                                    <span>{listitem}</span>  
                            </li>
                        )
                    })
                    
                    return(
                    <ul key={subcategory} id={subcategory} className="list--subcategory list-group list-group-item">
                        <div className={this.context.categoryMethods.autoCheckCategories(obj.category, subcategory, null, this.props.fileName) ? "themes-list--selected" : null}>
                            <input 
                            className="navigation-input subcategory" 
                            type="checkbox" 
                            value={subcategory} 
                            onChange={(e) => this.context.onCheck(e, this.props.fileName)} 
                            checked={this.context.categoryMethods.autoCheckCategories(obj.category, subcategory, null, this.props.fileName)}
                            />
                            <span>{subcategory}</span>
                        </div>
                        {listItems}
                     </ul>)
                })
            }
            return (
            <div key={obj.category} className="list-group">
                <ul id={obj.category} className="list--category"> 
                    <div className={this.context.categoryMethods.autoCheckCategories(obj.category, null, null, this.props.fileName) ? "themes-list--selected" : null}>
                        <input 
                            className="navigation-input category" 
                            type="checkbox" 
                            value={obj.category} 
                            onChange={(e) => this.context.onCheck(e, this.props.fileName)} 
                            checked={this.context.categoryMethods.autoCheckCategories(obj.category, null, null, this.props.fileName)}
                        /> 
                        <span>{obj.category}</span>
                    </div>
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

                            <div className="categories--addNew_container">
                                <h5 className="navigation--addNew_title">add new category</h5>
                                <div className="navigation--addNew">
                                    <input 
                                        className="categories-input"
                                        type="text" 
                                        list="datalist-add-categories"
                                        name="add-category" 
                                        id="add-category" 
                                        placeholder="category"
                                        onFocus={this.context.categoryMethods.getCategoryNames}
                                    />
                                    <datalist id="datalist-add-categories">
                                        {this.context.state.categoryDatalist}
                                    </datalist>

                                    <input 
                                        className="categories-input"
                                        type="text" 
                                        list="datalist-add-subcategories"
                                        name="add-subcategory" 
                                        id="add-subcategory" 
                                        placeholder="subcategory"
                                        onFocus={this.context.categoryMethods.getSubcategoryNames}
                                    />
                                    <datalist id="datalist-add-subcategories">
                                        {this.context.state.subcategoryDatalist}
                                    </datalist>

                                    <input 
                                        className="categories-input"
                                        type="text" 
                                        name="add-listitem" 
                                        id="add-listitem" 
                                        placeholder="listitem"
                                    />
                                    <Button
                                        className="custom-button"
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

                </div>
            )}
            }
        </Context.Consumer>
    )
  }
}
