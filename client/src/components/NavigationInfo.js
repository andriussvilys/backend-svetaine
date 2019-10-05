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
            console.log('********************list item autochecked--CATEGORY')
            console.log(`this subcategory is`)
            console.log(subcategory)
            if(this.context.state.familySetupData.category[category][subcategory]){
                console.log('********************list item autochecked--SUBCATEGORY')
                if(this.context.state.familySetupData.category[category][subcategory].includes(listitem)){
                    console.log('********************list item autochecked-LISTITEM')
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
                                checked={this.autoCheckListItem(obj.category, subcategory, listitem)}
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
                        checked={this.autoCheckSubcategory(obj.category, subcategory)}
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
    //****************************MOVED TO PROVIDER ************************* */

    // getCategoryNames = () => {
    //     if(this.state.categoryNames.length < 1){
    //         console.log('***get category names')
    //         if(this.context.state.categoriesData){
    //             let categoryNames =  this.context.state.categoriesData.map(obj => obj.category)
    //             this.setState({categoryNames: categoryNames}, ()=>{
    //                 let categoryOptionList = this.state.categoryNames.map(name => {
    //                     return <option key={`add-category-${name}`} value={name}>{name}</option>
    //                 })
    //                 return this.setState({categoryDatalist: categoryOptionList})
    //             })
    //         }
    //     }
    //     else{return}
    // }

    // getSubcategoryNames = () => {
    //     if(document.getElementById("add-category").value){
    //         let selectedCategory = document.getElementById("add-category").value;
    //         let subcategories = this.context.state.categoriesData.find(item => item.category === selectedCategory)
    //         if(subcategories && subcategories.subcategory){
    //             let subcategoriesDatalist = Object.keys(subcategories.subcategory).map(subcategory => {
    //                 let option = <option key={`add-subcategory-${subcategory}`} value={subcategory}>{subcategory}</option> 
    //                 console.log(option)
    //                 return option
    //             })
    //             this.setState({subcategoryDatalist: subcategoriesDatalist})
    //         }
    //     }
    // }

    //****************************MOVED TO PROVIDER ************************* */

    // submitNewCategory = () => {

    //     const categoryInput = document.getElementById("add-category")
    //     const subcategoryInput = document.getElementById("add-subcategory")
    //     const listitemInput = document.getElementById("add-listitem")

    //     let reqBody = {category: null, subcategory: {}}
    //     //IF THE VALUE DOES NOT EXIST IN THE CATEGORYNAMES ARRAY IE IS NEW
    //     if(this.state.categoryNames.indexOf(categoryInput) < 0){
    //         reqBody = {category: categoryInput.value}
    //         if(subcategoryInput.value){
    //             reqBody.subcategory = {[subcategoryInput.value]: []}
    //         }
    //         if(listitemInput.value){
    //             reqBody.subcategory[subcategoryInput.value] = [listitemInput.value]
    //         }
    //         // reqBody = JSON.stringify(reqBody)
    //         // console.log(reqBody)
    //         axios.post('/api/categories/create', reqBody)
    //         .then(res => {
    //             console.log(res)
    //         })
    //         .catch(err => console.log(err))
    //     }
    // }


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
                            {/* <Button
                                style={{position: "absolute", right: 0, bottom: "5px"}}
                                variant="success" 
                                size="sm"
                                onClick={
                                    this.context.categoryMethods.submitNewCategory
                                }
                                // disabled={document.getElementById("add-category").value ? false : true}
                            >
                                SUBMIT
                            </Button> */}
                            <Button
                                style={{marginRight: "30px"}}
                                variant="success" 
                                size="sm"
                                onClick={
                                    this.context.categoryMethods.updateCategory
                                }
                                // disabled={document.getElementById("add-category").value ? false : true}
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