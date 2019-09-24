import React, { Component } from 'react';
import { Context } from './Provider'
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
            subcategoryDatalist: null

        }
    }

    //methods that check cheboxes if state has appropriate values and vice versa
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
        

        let result = this.context.state.categoriesData.map(obj => {

            let allSubcategories = Object.keys(obj.subcategory)

            let subcategories = allSubcategories
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

            console.log('are subcategories formed')
            console.log(subcategories)
            return (
            <div label={obj.category} className="list-group">
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

    // componentDidMount(){
    //     this.makeCategories()
    // }

    getCategoryNames = () => {
        if(this.state.categoryNames.length < 1){
            console.log('***get category names')
            if(this.context.state.categoriesData){
                let categoryNames =  this.context.state.categoriesData.map(obj => obj.category)
                this.setState({categoryNames: categoryNames}, ()=>{
                    let categoryOptionList = this.state.categoryNames.map(name => {
                        return <option key={`add-category-${name}`} value={name}>{name}</option>
                    })
                    return this.setState({categoryDatalist: categoryOptionList})
                })
            }
        }
        else{return}
    }

    getSubcategoryNames = () => {
        if(document.getElementById("add-category").value){
            let selectedCategory = document.getElementById("add-category").value;
            let subcategories = this.context.state.categoriesData.find(item => item.category === selectedCategory)
            let subcategoriesDatalist = Object.keys(subcategories.subcategory).map(subcategory => {
                let option = <option key={`add-subcategory-${subcategory}`} value={subcategory}>{subcategory}</option> 
                console.log(option)
                return option
            })
            this.setState({subcategoryDatalist: subcategoriesDatalist})
        }

    }


  render(){
    return(
        <Context.Consumer>
            { () => {return(
                <div>
                    <h3>categories</h3>

                    <div className="imageInfo--section" >
                        <h5>add new category</h5>
                        <div className="imageInfo--box" style={{display: "block"}}>
                            <input type="text" 
                                list="datalist-add-categories"
                                name="add-category" 
                                id="add-category" 
                                placeholder="category"
                                style={{marginRight: "30px"}}
                                onFocus={this.getCategoryNames}
                            />
                            <datalist id="datalist-add-categories">
                                {this.state.categoryDatalist}
                            </datalist>

                            <input type="text" 
                                list="datalist-add-subcategories"
                                name="add-subcategory" 
                                id="add-subcategory" 
                                placeholder="subcategory"
                                style={{marginRight: "30px"}}
                                onFocus={this.getSubcategoryNames}
                            />
                            <datalist id="datalist-add-subcategories">
                                {this.state.subcategoryDatalist}
                            </datalist>

                            <input type="text" 
                                name="add-listitem" 
                                id="add-listitem" 
                                placeholder="listitem"
                                style={{marginRight: "30px"}}
                            />
                        </div>
                    </div>

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