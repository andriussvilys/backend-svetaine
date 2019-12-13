import React from 'react'
import Accordion from '../Accordion'
import Button from 'react-bootstrap/Button'

const About = (props) => {
    return(
        <Accordion
        title="About"
        toggle="0" 
        className="TagsMenu-Accordion-label"
        collapseId="about-collapse"
    >
        <div className="about-container">
            <img 
                className="about-image"
                src="/uploads/portrait.jpg" 
                alt="self portrai" 
                id="portrait.jpg"
                onClick={(e) => props.loadEnlarge(e, "portrait.jpg")}
            />
        </div>
        </Accordion>
    )
}

export default About