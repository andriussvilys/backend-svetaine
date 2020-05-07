import React, { Fragment } from 'react'
import Category from '../Category'

const Themes = (props) => {

const spreadLetters = (title) => {
    let letters = Array.from(title).map((letter, index) => {
        return <div 
        key={`${title}-leter-${index}`} 
        className="title-letter"
        >{letter}</div>
    })
    return letters
}

// const createThemesList = () => {
//     return(
//         <div 
//         className={`FilterTree-list FilterTree-listItems`}
//         id={`FilterTree-list_themes`}
//         >
//             { subcategories[name].map(listItem => {
//                 return <li 
//                 className={"FilterTree-item_listItem"}
//                 key={`FilterTree-listItem-${name}-${listItem}`}>
//                     {/* <span className={"FilterTree-title FilterTree-title_listItem"}>{listItem}</span> */}
//                     {createTitle({
//                         title: listItem,
//                         onChange: (e) => props.context.filterByListitem(e, parent, name, listItem),
//                         isChecked: props.context.listitemChecked(parent, name, listItem)
//                     })}
//                 </li>
//                 })
//             }
//         </div> 
//     )
// }

const renderList = () => {
    if(!props.context.state.themesOnDisplay){
        return null
    }
    const allThemes = Object.keys(props.context.state.themesOnDisplay).filter(theme => props.context.state.themesOnDisplay[theme].length > 0).sort()
    let renderList = allThemes.map(theme => {
        return <li key={theme} className="tags-li">
        <Category 
        key={theme}
        category={theme}
        level="theme"
        onChange={(e) => props.context.filterByTheme(e, theme)}
        isChecked={props.context.themeChecked(theme)}
        showContent={() => {return}}
        titleModifier={"nowrap"}
    />
        </li>
    })
    return <ul className="tagsMenu-list tagsMenu-list-tags">{renderList}</ul>
}

const createThemesTitle = () => {
    return(
            <div 
                className="styledCheckbox-container"
            >
                <Fragment>{spreadLetters("Themes")}</Fragment>
                <img 
                className="FilterTree-caret" 
                src="icons/triangle.svg" 
                alt="open or close filter category"
                onClick={(e) => {
                    console.log("caret clicked")
                    e.stopPropagation()
                    e.target.classList.toggle("FilterTree-caret_down")
                    const list = document.getElementById("FilterTree-list_themes")

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
                />
            </div>
    )
}

    return(
        <div
            className={`FilterTree-form`}
        >
            {renderList()}
            {createThemesTitle()}
        </div>
    )
}

export default Themes