import React from 'react'
import Selector from './Selector'

const Category = (props) => {
    const createCategory = data => {
        const subcategoryNames = Object.keys(data.subcategory)

        const subcategorySelectors = subcategoryNames.map(subcategoryName => {
            const title =  <Selector 
                key={`${data.category}-${subcategoryName}`}
                title={subcategoryName}
                onChange={(e) => props.context.filterBySubcategory(e, data.category, subcategoryName)}
                isChecked={props.context.isFilterChecked("subcategory", subcategoryName)}
                // isChecked={props.context.subcategoryChecked(data.category, subcategoryName)}
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
                    title={listItemObj.title}
                    onChange={(e) => props.context.filterByListitem(e, data.category, listItemObj.subcategory, listItemObj.title)}
                    isChecked={props.context.isFilterChecked("listitems", listItemObj.title)}
                    // isChecked={props.context.listitemChecked(data.category, listItemObj.subcategory, listItemObj.title)}
                />
            })
            return [title, ...listItemSelectors]
        })
        // const subcategorySelectors = subcategoryNames.map(subcategoryName => {
        //     return <Selector 
        //         key={`${data.category}-${subcategoryName}`}
        //         title={subcategoryName}
        //         onChange={(e) => props.context.filterBySubcategory(e, data.category, subcategoryName)}
        //         isChecked={props.context.subcategoryChecked(data.category, subcategoryName)}
        //     />
        // })
        // const getListItems = () => {
        //     let listItems = []
        //     subcategoryNames.forEach(subcategory => {
        //         data.subcategory[subcategory].forEach(listItem => {
        //             const listItemObj = {
        //                 title: listItem,
        //                 subcategory: subcategory
        //             }
        //             listItems = [...listItems, listItemObj]
        //         })
        //     })
        //     return listItems
        // }
        // const listItemSelectors = getListItems().map(listItemObj => {
        //     return <Selector 
        //         key={`${data.category}-${listItemObj.subcategory}-${listItemObj.title}`}
        //         title={listItemObj.title}
        //         onChange={(e) => props.context.filterByListitem(e, data.category, listItemObj.subcategory, listItemObj.title)}
        //         isChecked={props.context.listitemChecked(data.category, listItemObj.subcategory, listItemObj.title)}
        //     />
        // })
        // const allSelectors = [...subcategorySelectors, ...listItemSelectors]
        // console.log("CATEGORY props")
        // console.log(props)
        return (
            <ul className={"legacyStyle-List"}>
                {subcategorySelectors.map(selector => selector)}
            </ul>
        )
    }
    return(createCategory(props.data))
}

export default Category