import React, { Fragment } from 'react'

const Accordion = (props) => {
    const collapse = (e) => {
        // console.log("caret clicked")
        e.stopPropagation()
        e.target.classList.toggle("FilterTree-caret_down")
        const list = document.getElementById(props.listId)

        let timeout = 1
        if (!list.classList.contains("FilterTree-list_closed") && !list.style.maxHeight){
            list.style.maxHeight = `${list.scrollHeight}px`
            timeout += 200
        }
        setTimeout(() => {      
            if (!list.classList.contains("FilterTree-list_closed")) {
                list.style.maxHeight = 0;
            } 
            else {
            list.style.maxHeight = list.scrollHeight + "px";
            // const parent = document.getElementById("FilterTree-list_all")
            const parent = document.getElementById(`${props.mainContainer}`)

                if(parent.style.maxHeight){
                    setTimeout(() => {
                        parent.style.maxHeight = `${parent.scrollHeight}px` 
                    }, 300);
                }
            }
            list.classList.toggle("FilterTree-list_closed")
            return
        }, timeout);
    }

    return(
        <div
        className={`FilterTree-form list-item ${props.containerClass ? props.containerClass : ""}`}
        >   
            {props.children}
            {props.listId ? 
                <img 
                className="FilterTree-caret" 
                src="icons/triangle.svg" 
                alt="open or close filter category"
                onClick={(e) => {
                    collapse(e)
                }}
                ></img>
                : null
            }
        </div>
    )
}
export default Accordion