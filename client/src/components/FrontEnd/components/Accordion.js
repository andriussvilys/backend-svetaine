import React from 'react'
import {Accordion as BootstrapAccordion, Card, Button} from 'react-bootstrap'

const Accordion = (props) => {

    const toggle = (toggle) => {
        if(toggle){
           return  <BootstrapAccordion.Toggle 
            as={Button} 
            variant="link" 
            eventKey="0"
            className={props.level === "category" ? "tagsMenu-Button tagsMenu-Button_category" : "tagsMenu-Button tagsMenu-Button_subcategory"}
            >
                {props.title}
            </BootstrapAccordion.Toggle>
        }
        else{
            return(
            <BootstrapAccordion 
            as={Button} 
            variant="link" 
            eventKey="0"
            className={props.level === "category" ? "tagsMenu-Button tagsMenu-Button_category" : "tagsMenu-Button tagsMenu-Button_subcategory"}
            style={{width: "auto"}}
            >
                {props.title}
            </BootstrapAccordion>
            )
        }
    }
    const createAcc = () => {
        return <div
                    className={`TagsMenu-Card-Title ${props.level}`}
                >
                    {toggle(props.toggle)}
                        {props.checkbox}
                </div>
    }
    console.log(`props ${props.collapseId}`)
    console.log(props)
    return(
        <BootstrapAccordion>
            <Card className={`TagsMenu-Card`}>
                {createAcc()}
                <BootstrapAccordion.Collapse className={props.open ? "show" : null} id={props.collapseId} eventKey="0">
                <Card.Body className={`${props.level}-collapse`}>
                    {props.children}
                </Card.Body>
                </BootstrapAccordion.Collapse>
            </Card>
        </BootstrapAccordion>  
    )
}

export default Accordion