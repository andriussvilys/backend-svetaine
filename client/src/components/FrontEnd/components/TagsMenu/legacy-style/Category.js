import React from 'react'
import Selector from './Selector'

const Category = (props) => {
    const createCategory = data => {
        const subcategoryNames = Object.keys(data.subcategory)

        const subcategorySelectors = subcategoryNames.map(subcategoryName => {
            const title =  <Selector 
                key={`${data.category}-${subcategoryName}`}
                title={`${subcategoryName}`}
                id={`${data.category}-${subcategoryName}`}
                onChange={(e) => props.context.filterBySubcategory(e, data.category, subcategoryName)}
                isChecked={props.context.state.filters.onDisplay.subcategory.indexOf(subcategoryName) >= 0 ? true : false}
            />
            const getListItems = () => {
                let listItems = data.subcategory[subcategoryName].map(listItem => {
                        return {title: listItem, subcategory: subcategoryName}
                    })
                return listItems
            }
            const listItemSelectors = getListItems().map(listItemObj => {
                return <Selector 
                    key={`${data.category}-${listItemObj.subcategory}-${listItemObj.title}`}
                    title={`${listItemObj.title}`}
                    id={`${listItemObj.subcategory}-${listItemObj.title}`}
                    onChange={(e) => props.context.filterByListitem(e, data.category, listItemObj.subcategory, listItemObj.title)}
                    isChecked={props.context.state.filters.onDisplay.listitems.indexOf(listItemObj.title) >= 0 ? true : false}
                />
            })
            return [title, ...listItemSelectors]
        })
        return (
            <ul className={"legacyStyle-List"}>
                {subcategorySelectors.map(selector => selector)}
            </ul>
        )
    }
    return(createCategory(props.data))
}

export default Category