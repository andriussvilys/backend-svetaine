import React from 'react'
import Accordion from '../Accordion'
import Category from '../TagsMenu/Category'

const Themes = (props) => {

    const renderList = () => {
        
        const allThemes = Object.keys(props.state.themesOnDisplay).sort()
        let renderList = allThemes.map(theme => {
            return <li key={theme} className="tags-li">
            {/* <div 
            className={props.context.themeChecked(theme) ? "tagsMenu-listItem checkbox-selected" : "tagsMenu-listItem"}
            >
                <span className="nowrap">{theme}</span>
                <input 
                    id={`theme-${theme}`}
                    type="checkbox" 
                    
                    onChange={() => { props.context.filterByTheme(theme)}} 
                    // checked={props.state.visibleThemes[theme].length > 0}
                    checked={props.context.themeChecked(theme)}
                />
            </div> */}
            <Category 
            key={theme}
            category={theme}
            level="theme"
            onChange={() => props.context.filterByTheme(theme)}
            isChecked={props.context.themeChecked(theme)}
            showContent={() => {return}}
            titleModifier={"nowrap"}
            // modifierClass={"year-tag"}
        />
            </li>
        })
        return <ul className="tagsMenu-list tagsMenu-list-tags">{renderList}</ul>
    }

    return(
        // <Category 
        //     category={"tags"}
        //     context={props.context}
        //     button
        //     // onChange={this.props.context.filterByCategory}
        //     // isChecked={this.props.context.categoryChecked}
        // />

        props.state.themesOnDisplay ? renderList() : null

        // <Accordion
        //     title={<span>Tags</span>}
        //     toggle="1" 
        //     className="Tags"
        //     open={!props.state.mobile ? "1" : "0"}
        //     collapseId={"tags-collapse"}
        //     level="category"
        // >   
        //     {props.state.themesOnDisplay ? renderList() : null}
        // </Accordion>
    )
}

export default Themes