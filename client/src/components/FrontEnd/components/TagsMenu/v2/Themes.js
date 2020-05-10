import React, { Fragment } from 'react'
import Accordion from './components/Accordion'
import ClearAll from '../../ClearAll'

const Themes = (props) => {

const collapse = (e, mainContainer, listId) => {
    console.log("caret clicked")
    e.stopPropagation()
    // console.log(e.target)
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

const createTheme = (options) => {
    return(
        <li 
        className={`tags-item list-item  ${options.isChecked ? "checkbox-selected" : ""}`}
        key={options.title} 
        onClick = {(e) => options.filter(e, options.title)}
        >
            {spreadLetters(options.title)}
        </li>
    )
}

const renderList = () => {
    if(!props.context.state.themesOnDisplay){
        return null
    }
    const allThemes = Object.keys(props.context.state.themesOnDisplay).filter(theme => props.context.state.themesOnDisplay[theme].length > 0).sort()
    let renderList = allThemes.map(theme => {
        return (
            createTheme({
                title: theme,
                filter: props.context.filterByTheme,
                isChecked: props.context.themeChecked(theme)
            })
        )
    })
    return <ul className="tagsMenu-list tagsMenu-list-tags" id="TagsMenu-themes_list">{renderList}</ul>
}

    return(
        <div
            className="FilterTree-wrapper"
            id="TagsMenu-themes_main"
        >
            <Accordion 
                containerClass={"FilterTree-form_category-title"}
                listId={"TagsMenu-themes_list"}
                mainContainer={"TagsMenu-themes_main"}
                >
                <div 
                className="FilterTree-title FilterTree-title_categories"
                onClick={e => {
                    collapse(e, "TagsMenu-themes_list", "TagsMenu-themes_list")
                }}
                >
                    {spreadLetters("Themes")}
                </div>
            </Accordion>
            <div 
                className="FilterTree-list FilterTree-category FilterTree-container_main" 
                id="TagsMenu-themes_list"
            >
                <ClearAll 
                    context={props.context}
                    enlarge={props.context.state.enlarge}
                />
                {renderList()}
            </div>
        </div>
    )
}

export default Themes