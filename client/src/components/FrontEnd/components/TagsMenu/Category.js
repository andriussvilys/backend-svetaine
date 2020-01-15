import React from 'react';
import { cpus } from 'os';

const Category = (props) => {

    const spreadLetters = (title, level) => {
        // if(title.includes(",")){
        //     let commaCounter = 0
        //     let titleArr = Array.from(title)
        //     let commaIndexes = []

        //     const str = "coldbath, london, UK"

        //     const sliceToComma = (title) => {
        //         let mutateTitle = title
        //         let newArr = []
        //         let commaIndex = mutateTitle.indexOf(",")
        //         let firstSlice = mutateTitle.slice(0, commaIndex)
        //         newArr = [...newArr, firstSlice]

        //         //commanIndex +2, because it needs to cut the comman and the space following it
        //         mutateTitle = mutateTitle.slice(commaIndex+1, mutateTitle.length)
        //         console.log(mutateTitle)
        //         if(mutateTitle.includes(",")){
        //             commaIndex = mutateTitle.indexOf(",")
        //             firstSlice = mutateTitle.slice(0, commaIndex-1)
        //             newarr = [...newArr, firstSlice]
        //         }
        //         mutateTitle = mutateTitle.slice(commaIndex+1, mutateTitle.length)
        //         if(mutateTitle.includes(",") || mutateTitle[0] === " "){
        //             commaIndex = mutateTitle.indexOf(",") || 1
        //             firstSlice = mutateTitle.slice(0, commaIndex)
        //             newarr = [...newArr, firstSlice]
        //         }

        //         return newArr
        //     }
        //     const slicedArr = (title) => {
        //         let sliceArr = []
        //         let mutateTitle = title
        //         mutateTitle = sliceToComma(mutateTitle, sliceArr).title
        //         sliceArr = [...sliceArr, sliceToComma(sliceToComma, sliceArr).arr]
        //         if(mutateTitle.includes(",")){
        //             sliceToComma(mutateTitle, sliceArr)
        //         }
        //         console.log("sliceArr")
        //         console.log(sliceArr)
        //         return sliceArr
        //     }
        // }
        let letters = Array.from(title).map((letter, index) => {
            return <div key={`${title}-leter-${index}`} className={`title-letter ${level}-title-letter`}>{letter}</div>
        })
        return letters
    }

    return(
        <div
        key={`TagsMenu-category-${props.category}`} 
        className={props.button || props.isChecked ? "TagsMenu-Accordion-label checkbox-selected" : "TagsMenu-Accordion-label"}
        >   
            <div 
            onClick={() => {props.showContent(props.category)}}
            className={`TagsMenu-category-title ${props.clickable ? null : "no-click"}`} >
                {spreadLetters(props.category, props.level)}
            </div>
            {!props.button ? 
                <input 
                id={`${props.level}-${props.category}`}
                className="TagsMenu-checkbox"
                type="checkbox" 
                // onChange={() => props.context.filterByCategory(props.category)} 
                // checked={props.context.categoryChecked(props.category)}
                onChange={props.onChange} 
                checked={props.isChecked}
                />
                : null
            }
        </div>
    )
}

export default Category