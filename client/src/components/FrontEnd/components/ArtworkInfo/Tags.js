import React from 'react'

const Tags = (props) => {
    /**
     * 
     * @param filterFunc takes a Promise function
     */
    const animateFilter = (e, filterFunc) => {
        const artworkOnDisplay = props.context.state.artworkOnDisplay
        let enlargeImg = props.file
        let scrollToId = props.file.fileName

        if(!Object.keys(artworkOnDisplay).includes(scrollToId)){
            let newImg = null
            Object.keys(artworkOnDisplay).forEach(objName => {
                const currentObj = artworkOnDisplay[objName]
                if(Object.values(currentObj).includes(enlargeImg.artworkFamily)){
                    newImg = currentObj.fileName
                }
            })
            scrollToId = newImg
        }
        let infoUpDelay = 0
        if(props.context.state.mobile){
            if(!document.getElementById("ArtworkInfo-container").classList.contains("ArtworkInfo-toggleTags")){
                infoUpDelay = 200;
                document.getElementById("ArtworkInfo-container").classList.add("ArtworkInfo-toggleTags")
            }
            props.context.showInfo(e, {toggleTags: true})
        }
        setTimeout(() => {
            filterFunc
                .then(res => {
                        setTimeout(() => {
                            props.context.scrollToHorizontal(null, "imageSelect"); 
                        }, 400);
                    }
                )
        }, infoUpDelay);
    }

    const tags = (file) => {
        let DOMthemes = null
        if(file.themes){
            let themes = file.themes
            themes = themes.map(theme => {return {
                "type": "theme", 
                "title": theme, 
                "onClick": props.context.filterByTheme
                }
            })
            DOMthemes = themes.map((tag, index) => {
                return <div 
                key={`tag-${tag}${index}`}
                className="Tags-item_container"
                onClick={(e) => {
                    e.stopPropagation(); 
                    if(props.tagsTrigger){
                        props.tagsTrigger()
                    }
                    animateFilter(e, tag.onClick(e, tag.title, true))
                }}
                >
                    <p className="Tags-item_text">{tag.title}</p>
                </div> 
            })
        }

        let categories = Object.keys(file.category)
        categories = categories.map((category) => {
            return {
                "type": "category", 
                "title": category, 
                "onClick": props.context.filterByCategory
            }
        })
        const DOMcategories = categories.map((tag, index) => {
            return <div 
            key={`category-${tag.title}${index}`}
            className="Tags-item_container"
            onClick={(e) => {e.stopPropagation(); 
                if(props.tagsTrigger){
                    props.tagsTrigger()
                }
                animateFilter(e, tag.onClick(e, tag.title, true))
            }}
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
            if(tag.title === "studio"){
                return
            }
            return <div 
            key={`subcategory-${tag.title}`}
            className="Tags-item_container"
            onClick={(e) => {e.stopPropagation(); 
                if(props.tagsTrigger){
                    props.tagsTrigger()
                }
                animateFilter(e, tag.onClick(e, tag.category, tag.title, true))
            }}
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
            onClick={(e) => {e.stopPropagation(); 
                if(props.tagsTrigger){
                    props.tagsTrigger()
                }
                animateFilter(e, tag.onClick(e,tag.category, tag.subcategory, tag.title, true))
            }}
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