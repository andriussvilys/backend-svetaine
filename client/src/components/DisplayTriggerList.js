import React from 'react'

const DisplayTriggerList = (props) => {

    const isChecked = (title, file, item) => {

        if(title === "category"){
            return file.displayTriggers ? file.displayTriggers[title].includes(item) : false
        }
        if(title === "subcategory"){
            return file.displayTriggers ? file.displayTriggers[title].includes(item) : false
        }
        if(title === "listitems"){
            return file.displayTriggers ? file.displayTriggers[title].includes(item) : false
        }
        if(title === "themes"){
            if(file.displayTriggers[title])
            return file.displayTriggers ? file.displayTriggers[title].includes(item) : false
        }
    }


    
    const createList = (title, data, fileName) => {
        if(!data){return}
        if(data.length <= 0){return}
        let list = data.map(item => {
            if(item === "" || item === " "){return}
            return <li key={`trigger-${title}-${item}`} className="themes-list">
                        <span>{item}</span>
                        <input 
                            type="checkbox"
                            onChange={() => {}}
                            checked={isChecked(props.title, props.file, item)}
                            onChange={() => props.onChange(item, title, fileName)}
                        />
                    </li>
        })
        return list
    }

    return(
        <div className="displayTrigger-wrapper">
            <p className="displayTrigger-title">{props.title}</p>
            <ul>
                {createList(props.title, props.data, props.file.fileName)}
            </ul>
        </div>
    )
}

export default DisplayTriggerList