import React from 'react'

const DisplayTriggerList = (props) => {


    
    const createList = (title, data) => {
        if(!data){return}
        console.log("DisplayTriggerList")
        console.log(title)
        console.log(data)
        if(data.length <= 0){return}
        let list = data.map(item => {
            if(item === ""){return}
            return <li key={`trigger-${title}-${item}`}>
                        <span>{item}</span>
                        <input 
                            type="checkbox"
                            onChange={() => {}}
                        />
                    </li>
        })
        return list
    }

    return(
        <div>
            <p>{props.title}</p>
            <ul>
                {createList(props.title, props.data)}
            </ul>
        </div>
    )
}

export default DisplayTriggerList