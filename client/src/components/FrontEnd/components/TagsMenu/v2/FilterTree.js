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
            <form
                className={`FilterTree-form ${props.isChecked ? "checkbox-selected" : ""}`}
                onChange={options.onChange}
            >
                <label 
                    className={`FilterTree-title`}
                    htmlFor={`FilterTree-checkbox-${options.title}`}
                    // onClick={options.onClick}
                    >{options.title}</label>
                <div className="styledCheckbox-container">
                    <input 
                    className={`styledCheckbox-checkbox`}
                    id={`FilterTree-checkbox-${options.title}`} 
                    type="checkbox" checked={options.isChecked}
                    onChange={options.onChange}
                    ></input>
                    <span className="styleCheckbox-checkmark"></span>
                </div>
            </form>
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
                                onChange: () => props.context.filterBySubcategory(parent, name),
                                isChecked: props.context.subcategoryChecked(parent, name)
                            })}
                            {subcategories[name].length > 0 ?
                            <ul className={`FilterTree-list FilterTree-listItems`}>
                                { subcategories[name].map(listItem => {
                                    return <li 
                                    className={"FilterTree-item_listItem"}
                                    key={`FilterTree-listItem-${name}-${listItem}`}>
                                        {/* <span className={"FilterTree-title FilterTree-title_listItem"}>{listItem}</span> */}
                                        {createTitle({
                                            title: listItem,
                                            onChange: () => props.context.filterByListitem(parent, name, listItem),
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
                <ul className={`FilterTree-list FilterTree-subcategories`}>{subcategoryLists}</ul>
            )
        }

        const tree = data.map(obj => {
            return (
                    <ul className="FilterTree-list FilterTree-category" key={`FilterTree-category-${obj.category}`}>
                        {/* <span>{obj.category}</span> */}
                        {createTitle({
                            title: obj.category,
                            onChange: () => props.context.filterByCategory(obj.category),
                            isChecked: props.context.categoryChecked(obj.category)
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