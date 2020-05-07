import React from 'react'
import FilterTree from './FilterTree'
import Category from '../Category'
import About from '../../About/About'
import ClearAll from '../../ClearAll'
import Themes from './Themes'

const Menu = (props) => {
    return(
        <div className="FilterTree-container" id="TagsMenu">
        {/* {props.categoriesData ? createTree(props.categoriesData) : null} */}
            <FilterTree 
                categoriesData={props.context.state.categoriesData || []}
                context={props.context}
            />
            {/* <div className="button-wrapper TagsMenu-about-contact">
                <Category 
                    clickable
                    category="contact"
                    context={props.context}
                    level="category"
                />
                <About
                    loadEnlarge={props.context.loadEnlarge}
                />
            </div>
            <Category 
                clickable
                category="year/location"
                level="category"
                context={props.context}
            />
            {/* <Category 
                clickable
                category="themes"
                context={props.context}
                level="category"
            /> */}
            {/* <Themes
                context={props.context}
            />
            <ClearAll 
                context={props.context}
                enlarge={props.context.state.enlarge}
            /> */}
        </div>
    )
}

export default Menu