import React from 'react'

const Controls = (props) => {
    const exitButton = () => {
        return(
            <div 
            className="controls-button controls-exitButton"
            onClick={(e) => {
                e.stopPropagation()
                const artworkInfo = document.getElementById("ArtworkInfo")
                const menu = document.getElementById("TagsMenu")
                const enlarge = props.context.state.enlarge
                if(artworkInfo &&  artworkInfo.classList.contains("info-up")){
                    console.log("run close info")
                    // if(artworkInfo.classList.contains("ArtworkInfo-toggleTags")){
                    //     artworkInfo.classList.remove("ArtworkInfo-toggleTags")
                    //     delay += 150
                    // }
                    // setTimeout(() => {
                    //     artworkInfo.classList.remove("info-up")
                    // }, delay);
                    props.context.showInfo({close: true})
                    return
                }
                else if(menu.classList.contains("show-menu")){
                    console.log("run close Menu")
                    props.context.showMenu()
                    return
                }
                else if(enlarge && enlarge.open){
                    console.log("run close enlar")
                    props.context.closeEnlarge(e)
                }
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
            if(!props.context.state.enlarge || !props.context.state.enlarge.open){
                props.context.loadEnlarge(e, "portrait.jpg");
                setTimeout(() => {
                    if(document.getElementById("ArtworkInfo")){
                        document.getElementById("ArtworkInfo").classList.add("show")
                        setTimeout(() => {
                            document.getElementById("ArtworkInfo").classList.add("info-up")
                        }, 200);
                    }
                }, 600)
                return
            }
            if(document.getElementById("TagsMenu").classList.contains("show-menu")){
                props.context.showMenu()
            }
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
                <img className="Nav-infoButton-icon" alt="info buton" src="icons/info.png" />
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