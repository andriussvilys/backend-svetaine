import React from 'react'
import Accordion from '../Accordion'

const Themes = (props) => {

    // const themesOnDisplay = () => {
    //     let allThemes = []
    //     Object.keys(props.artworkInfoData).forEach(objName => {
    //         allThemes = [...allThemes, ...props.artworkInfoData[objName].themes]
    //     })
    //     let allThemesSet = new Set(allThemes)
    //     allThemesSet = Array.from(allThemesSet)
    //     console.log(allThemesSet)
    //     return allThemesSet
    // }

    const renderList = () => {
        
        const allThemes = Object.keys(props.state.themesOnDisplay)
        // const allThemes = themesOnDisplay()
        let renderList = allThemes.map(theme => {
            return <li key={theme}>
            <div className="tagsMenu-listItem">
                <span>{theme}</span>
                <input 
                    id={`theme-${theme}`}
                    type="checkbox" 
                    
                    onChange={() => { props.context.filterByTheme(theme)}} 
                    // checked={props.state.visibleThemes[theme].length > 0}
                    checked={props.context.themeChecked(theme)}
                />
            </div>
            </li>
        })
        return <ul className="tagsMenu-list">{renderList}</ul>
    }

    return(
        <Accordion
            title="Themes"
            toggle="0" 
            className="TagsMenu-Accordion-label"
        >
            {props.state.themesOnDisplay ? renderList() : null}
        </Accordion>
    )
}

export default Themes