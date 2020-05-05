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
    const createTree = (data) => {

        const subcategories = (subcategories, parent) => {
            const subcategoryNames = Object.keys(subcategories)
            const subcategoryLists = subcategoryNames.map(name => {
                return(
                    <li className={`FilterTree-subcategory_item`} key={`FilterTree-${parent}-${name}`}>
                        <div>
                            <span className={`FilterTree-title FilterTree-title_subcategory`}>{name}</span>
                            {subcategories[name].length > 0 ?
                            <ul className={`FilterTree-list FilterTree-listItems`}>
                                { subcategories[name].map(listItem => {
                                    return <li 
                                    className={"FilterTree-item_listItem"}
                                    key={`FilterTree-listItem-${name}-${listItem}`}>
                                        <span className={"FilterTree-title FilterTree-title_listItem"}>{listItem}</span>
                                    </li>
                                    })
                                }
                            </ul> 
                            : null
                            }
                        </div>
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
                        <span>{obj.category}</span>
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