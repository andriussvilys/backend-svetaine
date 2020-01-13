import React from 'react'
import Category from '../TagsMenu/Category';

const About = (props) => {
    return(
        <div 
            // className="tagsMenu-Button tagsMenu-Button_category about-container TagsMenu-Accordion-label"
            onClick={(e) => {
                props.loadEnlarge(e, "portrait.jpg");
                setTimeout(() => {
                    if(document.getElementById("ArtworkInfo")){
                        document.getElementById("ArtworkInfo").classList.add("show")
                        setTimeout(() => {
                            document.getElementById("ArtworkInfo").classList.add("info-up")
                        }, 200);
                    }
                }, 600)
            }}
        >

            {/* <span>ABOUT</span> */}
            <Category 
                category="about"
                level="category"
                button
                showContent={() => {return}}
            />
        </div>
    )
}

export default About