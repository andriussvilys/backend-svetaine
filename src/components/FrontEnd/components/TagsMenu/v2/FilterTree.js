import React, {Fragment} from 'react'
import Accordion from './components/Accordion'
import Title from './components/Title'

const FilterTree = (props) => {

    const collapse = (e, mainContainer, listId) => {
        console.log("caret clicked")
        e.stopPropagation()
        const caret = e.target.classList.contains("FilterTree-title") ? e.target.nextSibling :  e.target.parentNode.nextSibling
        console.log(caret)
        caret.classList.toggle("FilterTree-caret_down")
        const list = document.getElementById(listId)

        let timeout = 1
        if (!list.classList.contains("FilterTree-list_closed") && !list.style.maxHeight){
            list.style.maxHeight = `${list.scrollHeight}px`
            timeout += 200
        }
        setTimeout(() => {      
            if (!list.classList.contains("FilterTree-list_closed")) {
                list.style.maxHeight = 0;
            } 
            else {
            list.style.maxHeight = list.scrollHeight + "px";
            // const parent = document.getElementById("FilterTree-list_all")
            const parent = document.getElementById(`${mainContainer}`)

                if(parent.style.maxHeight){
                    setTimeout(() => {
                        parent.style.maxHeight = `${parent.scrollHeight}px` 
                    }, 300);
                }
            }
            list.classList.toggle("FilterTree-list_closed")
            return
        }, timeout);
    }
    const spreadLetters = (title) => {
        let letters = Array.from(title).map((letter, index) => {
            return <span 
            key={`${title}-leter-${index}`} 
            className="title-letter"
            >{letter}</span>
        })
        return letters
    }
    const createTree = (data) => {

    const subcategories = (subcategories, parent) => {
        const subcategoryNames = Object.keys(subcategories)
        const subcategoryLists = subcategoryNames.map(name => {
            return(
                <li className={`FilterTree-subcategory_item list-item`} key={`FilterTree-${parent}-${name}`}>
                <Accordion
                    mainContainer={"FilterTree-list_all"}
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
                                className={"FilterTree-item_listItem list-item"}
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
                    className="FilterTree-list FilterTree-category list-item" 
                    key={`FilterTree-category-${obj.category}`}
                    // id="FilterTree-list_all"
                >
                    <Accordion
                        listId={ Object.keys(obj.subcategory).length > 0 ? `FilterTree-list_category-${obj.category}` : null}
                        mainContainer={"FilterTree-list_all"}
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
    <div 
    className="FilterTree-wrapper"
    >
        <Accordion 
        containerClass={"FilterTree-form_category-title"}
        listId={"FilterTree-list_all"}
        mainContainer={"FilterTree-list_all"}
        >
            <div 
            className="FilterTree-title FilterTree-title_categories"
            onClick={(e) => {
                collapse(e, "FilterTree-list_all", "FilterTree-list_all")
            }}
            >
                {spreadLetters("Categories")}
            </div>
        </Accordion>
        <div 
            className="FilterTree-list FilterTree-category FilterTree-container_main" 
            id="FilterTree-list_all"
        >
            {createTree(props.categoriesData)}  
        </div>
    </div>
) 
}

export default FilterTree 