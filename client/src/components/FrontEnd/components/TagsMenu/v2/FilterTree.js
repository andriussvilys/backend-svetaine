import React from 'react'

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

    const createTitle = (options) => {
        return(
            <div
                className={`FilterTree-form ${props.isChecked ? "checkbox-selected" : ""}`}
            >
                <label 
                    className={`FilterTree-title`}
                    htmlFor={`FilterTree-checkbox-${options.title}`}
                    >
                    {options.title}
                </label>
                <div 
                    className="styledCheckbox-container"
                >
                    <input 
                    className={`styledCheckbox-checkbox`}
                    id={`FilterTree-checkbox-${options.title}`} 
                    type="checkbox" checked={options.isChecked}
                    onChange={options.onChange}
                    ></input>
                    <span 
                    onClick={options.onChange}
                    className="styleCheckbox-checkmark"
                    ></span>
                </div>
                {options.caret ? 
                    <img 
                    className="FilterTree-caret" 
                    src="icons/triangle.svg" 
                    alt="open or close filter category"
                    onClick={(e) => {
                        console.log("caret clicked")
                        e.stopPropagation()
                        e.target.classList.toggle("FilterTree-caret_down")
                        const list = document.getElementById(options.listId)

                        let timeout = 1
                        if (!list.classList.contains("FilterTree-list_closed") && !list.style.maxHeight){
                            list.style.maxHeight = `${list.scrollHeight}px`
                            timeout += 200
                        }
                        setTimeout(() => {                            
                            if (!list.classList.contains("FilterTree-list_closed")) {
                                list.style.maxHeight = 0;
                            } else {
                            list.style.maxHeight = list.scrollHeight + "px";
                            }
                            list.classList.toggle("FilterTree-list_closed")
                            return
                        }, timeout);
                    }}
                    ></img>
                    : null
                }
            </div>
        )
    }


    const createTree = (data) => {

        const subcategories = (subcategories, parent) => {
            const subcategoryNames = Object.keys(subcategories)
            const subcategoryLists = subcategoryNames.map(name => {
                return(
                    <li className={`FilterTree-subcategory_item`} key={`FilterTree-${parent}-${name}`}>
                            {/* <span className={`FilterTree-title FilterTree-title_subcategory`}>{name}</span> */}
                            {createTitle({
                                title: name,
                                onChange: (e) => props.context.filterBySubcategory(e, parent, name),
                                isChecked: props.context.subcategoryChecked(parent, name),
                                caret: subcategories[name].length > 0 ? true : false,
                                listId: `FilterTree-list_subcategory-${name}`
                            })}
                            {subcategories[name].length > 0 ?
                            <ul 
                            className={`FilterTree-list FilterTree-listItems`}
                            id={`FilterTree-list_subcategory-${name}`}
                            >
                                { subcategories[name].map(listItem => {
                                    return <li 
                                    className={"FilterTree-item_listItem"}
                                    key={`FilterTree-listItem-${name}-${listItem}`}>
                                        {/* <span className={"FilterTree-title FilterTree-title_listItem"}>{listItem}</span> */}
                                        {createTitle({
                                            title: listItem,
                                            onChange: (e) => props.context.filterByListitem(e, parent, name, listItem),
                                            isChecked: props.context.listitemChecked(parent, name, listItem)
                                        })}
                                    </li>
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
                    <ul className="FilterTree-list FilterTree-category" key={`FilterTree-category-${obj.category}`}>
                        {/* <span>{obj.category}</span> */}
                        {createTitle({
                            title: obj.category,
                            onChange: (e) => props.context.filterByCategory(e, obj.category),
                            isChecked: props.context.categoryChecked(obj.category),
                            caret: Object.keys(obj.subcategory).length > 0 ? true : false,
                            listId: `FilterTree-list_category-${obj.category}`
                        })}
                        {subcategories(obj.subcategory, obj.category)}
                    </ul>
            )
        })
    return tree
    }

    return(
        <div className="FilterTree-container" id="TagsMenu">
            {props.categoriesData ? createTree(props.categoriesData) : null}
        </div>
    )
}

export default FilterTree 