import React from 'react'
import Accordion from './components/Accordion'
import ClearAll from '../../ClearAll'

const YearLocation = (props) => {

    const collapse = (e, mainContainer, listId) => {
        console.log("caret clicked")
        e.stopPropagation()
        if(e.target.classList.contains(".FilterTree-container_main")){
            return
        }
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
            className={`list-item tags-item yearLocation-item ${options.isChecked ? "checkbox-selected" : ""}`}
            key={options.title} 
            onClick = {(e) => options.filter(e, options.title)}
            >
                {spreadLetters(options.title)}
            </li>
        )
    }
    const renderLocationList = () => {
        const data = props.context.state.yearLocation.all.locations
        const locations = Object.keys(data).filter(location => data[location].length > 0).sort()
        let List = locations.map(location => {
            return (
                createTheme({
                    title: location,
                    filter: props.context.filterByLocation,
                    isChecked: props.context.locationChecked(location)
                })
            )
        })
        return (
            <div className="yearLocation-container">
                <Accordion
                    containerClass={"FilterTree-form_category-title"}
                    listId={`FilterTree-list_yearLocation_location`}
                    mainContainer={"TagsMenu-yearLocation_list"}
                >
                    <div className="FilterTree-title FilterTree-title_categories">
                        {spreadLetters("Locations")}
                    </div>
                </Accordion>
                <ul 
                    className="FilterTree-list yearLocation-list" 
                    id="FilterTree-list_yearLocation_location"
                >
                    {List}
                </ul>
            </div>
        )
    }
    const renderYearList = () => {
        const data = props.context.state.yearLocation.all.years
        const years = Object.keys(data).filter(year => data[year].length > 0).sort()
        let List = years.map(year => {
            return (
                createTheme({
                    title: year,
                    filter: props.context.filterByYear,
                    isChecked: props.context.yearChecked(year)
                })
            )
        })
        return (
            <div className="yearLocation-container">
                <Accordion
                    containerClass={"FilterTree-form_category-title"}
                    listId={`FilterTree-list_yearLocation_year`}
                    mainContainer={"TagsMenu-yearLocation_list"}
                >
                    <div className="FilterTree-title FilterTree-title_categories">
                        {spreadLetters("Years")}
                    </div>
                </Accordion>
                <ul 
                    // className="FilterTree-list FilterTree-category" 
                    className="FilterTree-list yearLocation-list"
                    id="FilterTree-list_yearLocation_year"
                >
                    {List}
                </ul>
            </div>
        )
    }

    //RENDER 
    if(props.context.state.yearLocation){
        return(
        <div
            className="FilterTree-wrapper"
            onClick={e => {
                collapse(e, "TagsMenu-yearLocation_list", "TagsMenu-yearLocation_list")
            }}
            // id="TagsMenu-yearLocation_main"
        >   
            <Accordion 
                containerClass={"FilterTree-form_category-title"}
                listId={"TagsMenu-yearLocation_list"}
                mainContainer={"TagsMenu-yearLocation_list"}
                // mainContainer={"TagsMenu-yearLocation_main"}
                >
                <div className="FilterTree-title FilterTree-title_categories">
                    {spreadLetters("Year / Location")}
                </div>
            </Accordion>
            <div 
                className="FilterTree-list FilterTree-category FilterTree-container_main" 
                id="TagsMenu-yearLocation_list"
            >
                {renderYearList()}
                {renderLocationList()}
            </div>
        </div>
        )
    }
    else{
        return null
    }
}

export default YearLocation