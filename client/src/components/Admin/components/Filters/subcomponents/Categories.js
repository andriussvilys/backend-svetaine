import React from 'react';
import Button from 'react-bootstrap/Button';
// import "bootstrap/dist/css/bootstrap.min.css";
// import '../css/components/navigationInfo.css';
// import '../css/components/imageInfo.css';

const Categories = (props) => {

    const target = props.fileName ? 
                props.context.state.fileData.files[props.fileName] :
                props.context.state.familySetupdata

    const deletePromise = (categoryName, subcategory, listitem) => {
        return new Promise((resolve, reject) => {
            const listitemObj = listitem ? {category: categoryName, subcategory, listitem} : null
            const category = props.context.state.categoriesData.find(obj => obj.category === categoryName)
            const currentSubcategory = category.subcategory[subcategory]
            let newCategoryList = null
            newCategoryList = {
                ...category, 
                subcategory: {...category.subcategory, 
                [subcategory]: currentSubcategory.filter(listItem => listItem !== listitem)
                }
            }
            if(subcategory && !listitem){
                delete newCategoryList.subcategory[subcategory]
            }

            console.log("newCategoryList")
            console.log(newCategoryList)

            props.context.categoryMethods.deleteCategory(categoryName, newCategoryList, listitemObj)
                .then(res => {
                    res.modalMessage = res.modalMessage
                    res.confirm = false
                    resolve(res)
                })
                .catch(err => {
                    err.modalMessage = "Action failed"
                    err.confirm = false
                    reject(err)
                })
        })
    }

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
                            `list--listitem list-group-item themes-list
                            ${props.context.categoryMethods.autoCheckCategories(props.fileName, obj.category, subcategory, listitem) ? "themes-list--selected" : null}`}>
                                    <div
                                        className={"themes-list-delete"}
                                        key={`categories-delete-${obj.category}-${subcategory}-${listitem}`}
                                        onClick={() => {
                                            props.modalInvoke({
                                                    requireActionConfirm: true,
                                                    confirmedAction: () => deletePromise(obj.category, subcategory, listitem),
                                                    modalMessage: "Are you sure you want to delete?"
                                                }, 
                                                )

                                        }}
                                    >
                                        <img alt="delete icon" src="/icons/close-round-line.png" />
                                    </div>
                                    <label>{listitem}</label>  
                                    <input 
                                    className="navigation-input listitem" 
                                    type="checkbox" 
                                    value={listitem} 
                                    id={listitem} 
                                    onChange={(e) => props.context.onCheck(e, props.fileName)} 
                                    checked={props.context.categoryMethods.autoCheckCategories(props.fileName, obj.category, subcategory, listitem)}
                                    />
                            </li>
                        )
                    })
                    
                    return(
                    <ul key={subcategory} id={subcategory} className="list--subcategory list-group list-group-item">
                        <div className={props.context.categoryMethods.autoCheckCategories(props.fileName, obj.category, subcategory) ? "themes-list--selected themes-list " : "themes-list "}>
                        <div
                                className={"themes-list-delete"}
                                key={`categories-delete-${obj.category}-${subcategory}`}
                                onClick={() => {

                                    props.modalInvoke({
                                        requireActionConfirm: true,
                                        confirmedAction: () => deletePromise(obj.category, subcategory),
                                        modalMessage: "Are you sure you want to delete?"
                                    }, 
                                    )
                                }}
                            >
                                <img alt="delete icon" src="/icons/close-round-line.png" />
                            </div>
                            <label>{subcategory}</label>
                            <input 
                            className="navigation-input subcategory" 
                            type="checkbox" 
                            value={subcategory} 
                            onChange={(e) => props.context.onCheck(e, props.fileName)} 
                            checked={props.context.categoryMethods.autoCheckCategories(props.fileName, obj.category, subcategory)}
                            />
                        </div>
                        {listItems}
                     </ul>)
                })
            }
            return (
            <div key={obj.category} className="list-group">
                <ul id={obj.category} className="list--category"> 
                    <div className={props.context.categoryMethods.autoCheckCategories(props.fileName, obj.category) ? "themes-list--selected themes-list" : "themes-list"}>
                        <div
                            className={"themes-list-delete"}
                            key={`categories-delete-${obj.category}`}
                            onClick={() => {
                                props.modalInvoke({
                                    requireActionConfirm: true,
                                    confirmedAction: () => deletePromise(obj.category),
                                    modalMessage: "Are you sure you want to delete?"
                                }, 
                                )
                            }}
                        >
                            <img alt="delete icon" src="/icons/close-round-line.png" />
                        </div>
                        <label>{obj.category}</label>
                        <input 
                            className="navigation-input category" 
                            type="checkbox" 
                            value={obj.category} 
                            onChange={(e) => props.context.onCheck(e, props.fileName)} 
                            checked={props.context.categoryMethods.autoCheckCategories(props.fileName, obj.category)}
                        /> 
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
