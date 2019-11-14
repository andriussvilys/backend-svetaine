import React from 'react'
import {Accordion as BootstrapAccordion, Card, Button} from 'react-bootstrap'

const Accordion = (props) => {

    const toggle = (toggle) => {
        if(toggle){
            return <BootstrapAccordion.Toggle as={Card.Header} eventKey="null"
            style={{fontWeight: "600"}}
            as={Button} 
            variant="link" 
            eventKey="0" 
            className={props.className}
        >
            {props.title}
            <input type="checkbox"/>
        </BootstrapAccordion.Toggle>
        }
        else{
            return(
            <BootstrapAccordion as={Card.Header} eventKey="null"
                style={{fontWeight: "600"}}
                as={Button} 
                variant="link" 
                eventKey="0" 
                className={props.className}
            >
                {props.title}
                <input type="checkbox"/>
            </BootstrapAccordion>
            )
        }
    }

    return(
        <BootstrapAccordion>
            <Card>
                {toggle(props.toggle)}
                {/* <BootstrapAccordion.Toggle as={Card.Header} eventKey="null"
                    style={{fontWeight: "600"}}
                    as={Button} 
                    variant="link" 
                    eventKey="0" 
                    className={props.className}
                >
                    {props.title}
                </BootstrapAccordion.Toggle> */}
                <BootstrapAccordion.Collapse eventKey="0">
                <Card.Body>
                    {props.children}
                </Card.Body>
                </BootstrapAccordion.Collapse>
            </Card>
        </BootstrapAccordion>  
    )
}

export default Accordion