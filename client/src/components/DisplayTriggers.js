import React from 'react'
import DisplayTriggerList from './DisplayTriggerList'

const DisplayTriggers = (props) => {

    const getSubcategories = (file) => {
        let categories = Object.keys(file.category)
        let subcategories = []
        categories.forEach(category => {
            subcategories = [...subcategories, ...Object.keys(file.category[category])]
        })
        return subcategories
    }
    const getListitems = (file) => {
        const categories = Object.keys(file.category)
        let listItems = []
        categories.forEach(category => {
            let subcategories = Object.keys(file.category[category])
            subcategories.forEach(sub => {
                if(!file.category[category][sub].length > 0){return}
                listItems = [...listItems, ...file.category[category][sub]]
            })
        })
        return listItems
    }
    const getYearLocation = (file) => {
        let array = []
        if(file.year){array = [...array, file.year]}
        if(file.location){array = [...array, file.location]}
        return array
    }
    
    return(
        <div className="imageInfo--box">
            <div className="displayTrigger-container">
                <p className="displayTrigger-title">Display triggers</p>
                <DisplayTriggerList 
                    title={'category'}
                    // data={props.file.displayTriggers["category"]}
                    data={Object.keys(props.file.category)}
                    file={props.file}
                    onChange={props.context.fileDataMethods.onChangeDisplayTriggers}
                />
                <DisplayTriggerList 
                    title={'subcategory'}
                    // data={props.file.displayTriggers["subcategory"]}
                    data={getSubcategories(props.file)}
                    file={props.file}
                    onChange={props.context.fileDataMethods.onChangeDisplayTriggers}
                />
                <DisplayTriggerList 
                    title={'listitems'}
                    // data={props.file.displayTriggers["listitems"]}
                    data={getListitems(props.file)}
                    file={props.file}
                    onChange={props.context.fileDataMethods.onChangeDisplayTriggers}
                />
                <DisplayTriggerList 
                    title={'themes'}
                    data={props.file.themes}
                    file={props.file}
                    onChange={props.context.fileDataMethods.onChangeDisplayTriggers}
                />
                <DisplayTriggerList 
                    title={'Year/Location'}
                    data={getYearLocation(props.file)}
                    file={props.file}
                />
            </div>
        </div>
    )
}

export default DisplayTriggers