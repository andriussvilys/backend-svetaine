import React from 'react';
import Checkbox from './Checkbox';

const Category = (props) => {

    const spreadLetters = (title, level) => {
        let letters = Array.from(title).map((letter, index) => {
            return <div key={`${title}-leter-${index}`} className={`title-letter ${level}-title-letter`}>{letter}</div>
        })
        return letters
    }

    return(
        <div
        key={`TagsMenu-category-${props.category}`} 
        className={props.button || props.isChecked ? `TagsMenu-Accordion-label checkbox-selected ${props.modifierClass}` : `TagsMenu-Accordion-label ${props.modifierClass}`}
        >   
            <div 
            onClick={() => {props.showContent(props.category)}}
            className={`TagsMenu-category-title ${props.clickable ? null : "no-click"} ${props.titleModifier}`} >
                {spreadLetters(props.category, props.level)}
            </div>
            {!props.button ? 
                // <input 
                // id={`${props.level}-${props.category}`}
                // className="TagsMenu-checkbox"
                // type="checkbox" 
                // // onChange={() => props.context.filterByCategory(props.category)} 
                // // checked={props.context.categoryChecked(props.category)}
                // onChange={props.onChange} 
                // checked={props.isChecked}
                // />
                <Checkbox
                    id={`${props.level}-${props.category}`}
                    onChange={props.onChange} 
                    isChecked={props.isChecked}
                    className={props.level === "category" ? "styledCheckbox-container_large" : "styledCheckbox-container_small"}
                />
                : null
            }
        </div>
    )
}

export default Category