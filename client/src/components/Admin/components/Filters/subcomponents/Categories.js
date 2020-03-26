import React from 'react';
import Button from 'react-bootstrap/Button';
// import "bootstrap/dist/css/bootstrap.min.css";
// import '../css/components/navigationInfo.css';
// import '../css/components/imageInfo.css';

const Categories = (props) => {

    const target = props.fileName ? 
                props.context.state.fileData.files[props.fileName] :
                props.context.state.familySetupdata

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
                                    <label>{listitem}</label>  
                                    <div
                                        key={`categories-delete-${obj.category}-${subcategory}-${listitem}`}
                                        style={{height: "20px", width: "20px", borderRadius: "10px", backgroundColor: "red"}}
                                        onClick={() => {
                                            const categoryName = obj.category
                                            const listitemObj = {category: categoryName, subcategory, listitem}
                                            const category = props.context.state.categoriesData.find(obj => obj.category === categoryName)
                                            const currentSubcategory = category.subcategory[subcategory]
                                            console.log("currentSubcategory")
                                            console.log(currentSubcategory)
                                            const newListItemsArray = currentSubcategory.filter(listItem => listItem !== listItem)
                                            const newCategoryList = {
                                                ...category, 
                                                subcategory: {...category.subcategory, 
                                                [subcategory]: currentSubcategory.filter(listItem => listItem !== listitem)
                                                }
                                            }
                                            console.log("newCategoryList")
                                            console.log(newCategoryList)

                                            props.context.categoryMethods.deleteCategory(obj.category, newCategoryList, listitemObj)
                                                .then(res => {
                                                    console.log('success')
                                                    console.log(res)
                                                })
                                                .catch(err => {
                                                    console.log("error")
                                                    console.log(err)
                                                })
                                        }}
                                    >
                                    </div>
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
                            <label>{subcategory}</label>
                            <div
                                        key={`categories-delete-${obj.category}-${subcategory}`}
                                        style={{height: "20px", width: "20px", borderRadius: "10px", backgroundColor: "red"}}
                                        onClick={() => {
                                            const categoryName = obj.category
                                            const category = props.context.state.categoriesData.find(obj => obj.category === categoryName)
                                            let newCategoryList = {...category}
                                            delete newCategoryList.subcategory[subcategory]
                                            console.log("newCategoryList")
                                            console.log(newCategoryList)
                                            console.log({
                                                category: categoryName,
                                                subcategory: subcategory,
                                                listitem: null
                                            })
                                            props.context.categoryMethods.deleteCategory(obj.category, newCategoryList)
                                                .then(res => {
                                                    console.log('success')
                                                    console.log(res)
                                                })
                                                .catch(err => {
                                                    console.log("error")
                                                    console.log(err)
                                                })
                                        }}
                                    >
                                    </div>
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
                        <label>{obj.category}</label>
                        <div
                                        key={`categories-delete-${obj.category}`}
                                        style={{height: "20px", width: "20px", borderRadius: "10px", backgroundColor: "red"}}
                                        onClick={() => {
                                            const categoryName = obj.category
                                            console.log({
                                                category: categoryName,
                                                subcategory: null,
                                                listitem: null
                                            })
                                            props.context.categoryMethods.deleteCategory(obj.category)
                                            .then(res => {
                                                console.log('success')
                                                console.log(res)
                                            })
                                            .catch(err => {
                                                console.log("error")
                                                console.log(err)
                                            })
                                        }}
                                    >
                                    </div>
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
