import React from 'react';

const Category = (props) => {

    const spreadLetters = (title) => {
        let letters = Array.from(title).map((letter, index) => {
            return <div key={`${title}-leter-${index}`} className="title-letter">{letter}</div>
        })
        return letters
    }

    console.log("categoyr")
    console.log(props.category)
    return(
        <div
        key={`TagsMenu-category-${props.category}`} 
        className={props.context.categoryChecked(props.category) ? "TagsMenu-Accordion-label checkbox-selected" : "TagsMenu-Accordion-label"}
        >
            {spreadLetters(props.category)}
            <input 
            id={`category-${props.category}`}
            className="TagsMenu-checkbox"
            type="checkbox" 
            // onChange={() => props.context.filterByCategory(props.category)} 
            // checked={props.context.categoryChecked(props.category)}
            onChange={() => props.onChange(props.category)} 
            checked={props.isChecked(props.category)}
            />
        </div>
    )
}

export default Category