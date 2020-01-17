import React from 'react'

const Controls = (props) => {
    const exitButton = () => {
        return(
            <div 
            className="controls-button controls-exitButton"
            onClick={(e) => {
                e.stopPropagation()
                const artworkInfo = document.getElementById("ArtworkInfo")
                let delay = 0
                if(artworkInfo.classList.contains("ArtworkInfo-toggleTags")){
                    artworkInfo.classList.remove("ArtworkInfo-toggleTags")
                    delay += 150
                }
                setTimeout(() => {
                    artworkInfo.classList.remove("info-up")
                }, delay);
            }}
            >
                <span>x</span>
            </div>
        )
    }

    const slideButton = () => {
        
        const isUp = () => {
            const artworkInfo = document.getElementById("ArtworkInfo")
            let isUp = artworkInfo.classList.contains("ArtworkInfo-toggleTags")
            return isUp
        }
        const toggle = (e) => {
            e.stopPropagation()
            const artworkInfo = document.getElementById("ArtworkInfo")
            if(artworkInfo){
                if(artworkInfo.classList.contains("info-up")){
                    if(isUp()){
                        artworkInfo.classList.remove("ArtworkInfo-toggleTags")
                        return
                    }
                    else{
                        artworkInfo.classList.add("ArtworkInfo-toggleTags")
                    }
                }
                else{
                    artworkInfo.classList.add("info-up")
                }
            }
        }
        return(
            <div 
            className="controls-button controls-slideButton"
            onClick={(e) => toggle(e)}
            >
                <img className="Nav-infoButton-icon" alt="info buton" src="/icons/info.png" />
            </div>
        )
    }

    return(
        <div className="controls">
            {slideButton()}
            {exitButton()}
        </div>
    )
}

export default Controls