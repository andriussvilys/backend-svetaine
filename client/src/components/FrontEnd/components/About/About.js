import React from 'react'

const About = (props) => {
    return(
        <div 
            className="tagsMenu-Button tagsMenu-Button_category about-container"
            onClick={(e) => {
                props.loadEnlarge(e, "portrait.jpg");
                setTimeout(() => {
                    if(document.getElementById("ArtworkInfo")){
                        document.getElementById("ArtworkInfo").classList.add("info-up")
                    }
                }, 600)
            }}
        >
            <span>ABOUT</span>
        </div>
    )
}

export default About