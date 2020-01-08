import React from 'react'
import Accordion from '../Accordion'

const Themes = (props) => {

    const renderList = () => {
        
        const allThemes = Object.keys(props.state.themesOnDisplay).sort()
        let renderList = allThemes.map(theme => {
            return <li key={theme} className="tags-li">
            <div 
            className={props.context.themeChecked(theme) ? "tagsMenu-listItem checkbox-selected" : "tagsMenu-listItem"}
            >
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
        // const clearAll = <li className="tags-li">
        //                     <div className="tagsMenu-listItem dark-bg">
        //                         <span className="white-font">{
        //                             props.context.state.artworkOnDisplay && Object.keys(props.context.state.artworkOnDisplay).length > 0 ?
        //                                 "clear all" :
        //                                 "view all"
        //                         }</span>
        //                         <input 
        //                             id={`theme-clearAll`}
        //                             type="checkbox" 
        //                             checked={props.context.state.artworkOnDisplay ? Object.keys(props.context.state.artworkOnDisplay).length > 0 : null}
        //                             onChange={(e) => { props.context.filterAllThemes(e)}
        //                             } 
        //                         />
        //                     </div>
        //                 </li>
            
        //     renderList = [clearAll, ...renderList]
        return <ul className="tagsMenu-list tagsMenu-list-tags">{renderList}</ul>
    }

    return(
        <Accordion
            title={<span>Tags</span>}
            toggle="1" 
            className="Tags"
            open={!props.state.mobile ? "1" : "0"}
            collapseId={"tags-collapse"}
            level="category"
        >   
            {props.state.themesOnDisplay ? renderList() : null}
        </Accordion>
    )
}

export default Themes