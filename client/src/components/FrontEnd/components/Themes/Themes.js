import React from 'react'
import Accordion from '../Accordion'
import Button from 'react-bootstrap/Button'

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
            <div>
                <span>{theme}</span>
                <input 
                    id={`theme-${theme}`}
                    type="checkbox" 
                    
                    onChange={(e) => { props.context.filterByTheme(e, theme)}} 
                    // checked={props.state.visibleThemes[theme].length > 0}
                    checked={props.context.themeChecked(theme)}
                />
            </div>
            </li>
        })
        return <ul>{renderList}</ul>
    }

    return(
        <Accordion
            title="Themes"
            // checkbox={<input 
            //     level="category"
            //     type="checkbox" 
            //     onChange={(e) => this.props.context.filterByCategory(e, obj.category)} 
            //     checked={this.props.context.categoryChecked(obj.category)}
            // //     />}
            toggle="0" 
            className="TagsMenu-Accordion-label"
        >
            {props.state.themesOnDisplay ? renderList() : null}
        </Accordion>
    )
}

export default Themes