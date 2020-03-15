import React, { Component } from 'react';
import { Context } from '../../../Provider';
import Button from 'react-bootstrap/Button';
// import "bootstrap/dist/css/bootstrap.min.css";
// import '../css/components/navigationInfo.css';
// import '../css/components/imageInfo.css';

const Categories = (props) => {

    const target = props.fileName ? 
                props.context.state.fileData.files[props.fileName] :
                props.context.state.familySetupdata

    //methods that check cheboxes if state has appropriate values and unchecks it if not
    // const autoCheckCategories = (category, subcategory, listitem) => {
    //     if(!target.category){return}
    //     if(target.category[category]){
    //         if(target.category[category][subcategory]){
    //             if(target.category[category][subcategory].includes(listitem)){
    //                 return true
    //             } 
    //             else{
    //                 return false
    //             }
    //         }
    //     }
    // }
    // const autoCheckCategories = (category, subcategory) => {
    //     if(!target.category){return}
    //     if(target.category[category]){
    //         if(target.category[category][subcategory]){
    //             return true
    //         }
    //         else{
    //             return false
    //         }
    //     }
    // }
    // const autoCheckCategories = (category) => {
    //     if(!target.category){return}
    //     if(target.category[category]){
    //             return true
    //         }
    //         else{
    //             return false
    //         }
    // }

    //****************************************************************************************************
    //THIS METHOD DYNAMICALLY CREATES THE MENU 

    const makeCategories = () => {
        
        let result = props.context.state.categoriesData.map(obj => {

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
                            ${props.context.categoryMethods.autoCheckCategories(props.fileName, obj.category, subcategory, listitem) ? "themes-list--selected" : null}`}>
                                    <input 
                                    className="navigation-input listitem" 
                                    type="checkbox" 
                                    value={listitem} 
                                    id={listitem} 
                                    onChange={(e) => props.context.onCheck(e, props.fileName)} 
                                    checked={props.context.categoryMethods.autoCheckCategories(props.fileName, obj.category, subcategory, listitem)}
                                    />
                                    <span>{listitem}</span>  
                            </li>
                        )
                    })
                    
                    return(
                    <ul key={subcategory} id={subcategory} className="list--subcategory list-group list-group-item">
                        <div className={props.context.categoryMethods.autoCheckCategories(props.fileName, obj.category, subcategory) ? "themes-list--selected" : null}>
                            <input 
                            className="navigation-input subcategory" 
                            type="checkbox" 
                            value={subcategory} 
                            onChange={(e) => props.context.onCheck(e, props.fileName)} 
                            checked={props.context.categoryMethods.autoCheckCategories(props.fileName, obj.category, subcategory)}
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
                    <div className={props.context.categoryMethods.autoCheckCategories(props.fileName, obj.category) ? "themes-list--selected" : null}>
                        <input 
                            className="navigation-input category" 
                            type="checkbox" 
                            value={obj.category} 
                            onChange={(e) => props.context.onCheck(e, props.fileName)} 
                            checked={props.context.categoryMethods.autoCheckCategories(props.fileName, obj.category)}
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

    const checkOptionList = (nest) => {
        if(props.context.state.categoriesOptionList){
            if(props.context.state.categoriesOptionList.DOM){
                return props.context.state.categoriesOptionList.DOM[nest]
            }
            else{ return null}
        }
        else{return null}
    }

        return(
            <div className="list--container">
                {makeCategories()}

                <div className="categories--addNew_container" >
                    <h5 className="navigation--addNew_title">add new category</h5>
                    <div className="navigation--addNew">
                        <input 
                            className="categories-input"
                            type="text" 
                            list="datalist-add-categories"
                            name="add-category" 
                            id="add-category" 
                            placeholder="category"
                            onFocus={props.context.categoryMethods.getCategoryNames}
                        />
                        <datalist id="datalist-add-categories">
                            {checkOptionList("categories")}
                        </datalist>

                        <input 
                            className="categories-input"
                            type="text" 
                            list="datalist-add-subcategories"
                            name="add-subcategory" 
                            id="add-subcategory" 
                            placeholder="subcategory"
                            onFocus={props.context.categoryMethods.getSubcategoryNames}
                        />

                        <datalist id="datalist-add-subcategories">
                            
                            {checkOptionList("subCategories")}
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
                                props.context.categoryMethods.updateCategory
                            }
                        >
                            SUBMIT
                        </Button>
                    </div>
                </div>
            </div>
            )
  }

  export default Categories
