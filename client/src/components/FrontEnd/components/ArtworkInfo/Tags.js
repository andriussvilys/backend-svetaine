import React from 'react'

const Tags = (props) => {
    const tags = (file) => {
        
        let DOMthemes = null
        if(file.themes){
            let themes = file.themes
            themes = themes.map(theme => {return {"type": "theme", "title": theme, "onClick": props.context.filterByTheme}})
            DOMthemes = themes.map(tag => {
                return <div 
                className="Tags-item_container"
                onClick={(e) => {e.stopPropagation(); props.context.scrollToHorizontal(props.context.state.enlarge.background.fileName); tag.onClick(tag.title, true)}}
                >
                    <p className="Tags-item_text">{tag.title}</p>
                </div> 
            })
        }

        let categories = Object.keys(file.category) 
        categories = categories.map(category => {
            return {
                "type": "category", 
                "title": category, 
                "onClick": props.context.filterByCategory
            }
        })
        const DOMcategories = categories.map(tag => {
            return <div 
            key={`category-${tag.title}`}
            className="Tags-item_container"
            onClick={(e) => {e.stopPropagation(); props.context.scrollToHorizontal(props.context.state.enlarge.background.fileName); tag.onClick(tag.title, true)}}
            >
                <p className="Tags-item_text">{tag.title}</p>
            </div>            
        })

        let subcategories = []
        categories.forEach(category => {
            subcategories = Object.keys(file.category[category.title]).map(subcategory => subcategory)
            subcategories = subcategories.map(subcategory => {
                return {
                    "type": "subcategory", 
                    "title": subcategory, 
                    "category": category.title, 
                    "onClick": props.context.filterBySubcategory
                }
            })
        })
        const DOMsubcategories = subcategories.map(tag => {
            return <div 
            key={`subcategory-${tag.title}`}
            className="Tags-item_container"
            onClick={(e) => {e.stopPropagation(); props.context.scrollToHorizontal(props.context.state.enlarge.background.fileName); tag.onClick(tag.category, tag.title, true)}}
            >
                <p className="Tags-item_text">{tag.title}</p>
            </div>
        })

        let listItems = []
        categories.forEach(category => {
            Object.keys(file.category[category.title]).forEach(subcategory => {
                let list = file.category[category.title][subcategory]
                if(list.length === 0){return}
                listItems = list.map(listItem => {return {
                    "type": "listItem", 
                    "title": listItem,
                    "category": category.title,
                    "subcategory": subcategory,
                    "onClick": props.context.filterByListitem
                }
            })
            })
        })
        const DOMlistItems = listItems.map(tag => {
            return <div 
            key={`listitem-${tag.title}`}
            className="Tags-item_container"
            onClick={(e) => {e.stopPropagation(); props.context.scrollToHorizontal(props.context.state.enlarge.background.fileName); tag.onClick(tag.category, tag.subcategory, tag.title, true)}}
            >
                <p className="Tags-item_text">{tag.title}</p>
            </div>
        })
        let DOMtags = []
        DOMtags = [...DOMthemes, ...DOMsubcategories, ...DOMcategories, ...DOMlistItems]
        return DOMtags
    }
    return(
        <div  className="Tags-item_wrapper">
            {tags(props.file)}
        </div>
    )
}

export default Tags