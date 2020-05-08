import React, {Fragment} from 'react'
import Accordion from './components/Accordion'
import Title from './components/Title'

const FilterTree = (props) => {
    const spreadLetters = (title) => {
        let letters = Array.from(title).map((letter, index) => {
            return <div 
            key={`${title}-leter-${index}`} 
            className="title-letter"
            >{letter}</div>
        })
        return letters
    }
    const createTree = (data) => {

    const subcategories = (subcategories, parent) => {
        const subcategoryNames = Object.keys(subcategories)
        const subcategoryLists = subcategoryNames.map(name => {
            return(
                <li className={`FilterTree-subcategory_item`} key={`FilterTree-${parent}-${name}`}>
                <Accordion
                    listId={subcategories[name].length > 0 ? `FilterTree-list_subcategory-${name}` : null}
                >
                    <Title 
                        title={name}
                        onChange={(e) => props.context.filterBySubcategory(e, parent, name)}
                        isChecked={props.context.subcategoryChecked(parent, name)}
                    />
                </Accordion>
                {subcategories[name].length > 0 ?
                    <ul 
                    className={`FilterTree-list FilterTree-listItems`}
                    id={`FilterTree-list_subcategory-${name}`}
                    >
                        { subcategories[name].map(listItem => {
                            return (
                                <li 
                                className={"FilterTree-item_listItem"}
                                key={`FilterTree-listItem-${name}-${listItem}`}>
                                    <Title 
                                        title={listItem}
                                        onChange={(e) => props.context.filterByListitem(e, parent, name, listItem)}
                                        isChecked={props.context.listitemChecked(parent, name, listItem)}
                                    />
                                </li>
                            )
                            })
                        }
                    </ul> 
                    : null
                }
                </li>
            ) 
        })
        return (
            <ul 
            className={`FilterTree-list FilterTree-subcategories`}
            id={`FilterTree-list_category-${parent}`}
            >{subcategoryLists}</ul>
        )
    }

    const tree = data.map(obj => {
        return (
                <ul 
                    className="FilterTree-list FilterTree-category" 
                    key={`FilterTree-category-${obj.category}`}
                    // id="FilterTree-list_all"
                >
                    <Accordion
                        listId={ Object.keys(obj.subcategory).length > 0 ? `FilterTree-list_category-${obj.category}` : null}
                    >
                        <Title 
                            title={obj.category}
                            onChange={(e) => props.context.filterByCategory(e, obj.category)}
                            isChecked={props.context.categoryChecked(obj.category)}
                        />
                    </Accordion>
                    {subcategories(obj.subcategory, obj.category)}
                </ul>
        )
    })
    return tree
    }
return(
    <div className="FilterTree-container_main">
        <Accordion 
        containerClass={"FilterTree-form_categories"}
        listId={"FilterTree-list_all"}>
            <div className="FilterTree-title FilterTree-title_categories">
                {spreadLetters("Categories")}
            </div>
        </Accordion>
        <div 
            className="FilterTree-list FilterTree-category" 
            id="FilterTree-list_all"
        >
            {createTree(props.categoriesData)}  
        </div>
    </div>
) 
}

export default FilterTree 