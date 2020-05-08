import React from 'react'

const Accordion = (props) => {
    return(
        <div
        className={`FilterTree-form ${props.containerClass ? props.containerClass : ""}`}
        >
            {props.children}
            {props.listId ? 
                <img 
                className="FilterTree-caret" 
                src="icons/triangle.svg" 
                alt="open or close filter category"
                onClick={(e) => {
                    console.log("caret clicked")
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
                        const parent = document.getElementById("FilterTree-list_all")
                            if(parent.style.maxHeight){
                                setTimeout(() => {
                                    parent.style.maxHeight = `${parent.scrollHeight}px` 
                                }, 300);
                            }
                        }
                        list.classList.toggle("FilterTree-list_closed")
                        return
                    }, timeout);
                }}
                ></img>
                : null
            }
        </div>
    )
}
export default Accordion