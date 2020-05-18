import React from 'react'

const Controls = (props) => {
    const exitButton = () => {
        let icon = Object.keys(props.context.state.artworkOnDisplay).length > 0 ? 
                    <span>x</span> : 
                    <img 
                    src="icons/eye.png" 
                    alt="show all icon" 
                    style={{
                        height: "100%",
                        width: "100%",
                        padding: "4px"
                    }}
                    />
        return(
            <div 
            className="controls-button controls-exitButton"
            onClick={(e) => {
                e.stopPropagation()
                console.log("run close X")
                const artworkInfo = document.getElementById("ArtworkInfo")
                const menu = document.getElementById("TagsMenu")
                const enlarge = props.context.state.enlarge
                if(artworkInfo &&  artworkInfo.classList.contains("info-up")){
                    console.log("artwork info up")
                    artworkInfo.classList.toggle("info-up")
                    return
                }
                else if(menu.classList.contains("show-menu")){
                    console.log("menu up")
                    console.log("run close Menu")
                    props.context.showMenu(e)
                    return
                }
                else if(enlarge && enlarge.open){
                    console.log("enlarge opan")
                    console.log("run close enlar")
                    props.context.closeEnlarge(e)
                }
                else{
                    console.log("switch 4")
                    const hide = Object.keys(props.context.state.artworkOnDisplay).length > 0 ? true : false
                    props.context.filterAllThemes(hide)
                    // props.context.closeEnlarge(e, true)
                }
            }}
            >
                {icon}
            </div>
        )
    }
    const slideButton = () => {
        const toggle = (e) => {
            e.stopPropagation()
            if(!props.context.state.enlarge || !props.context.state.enlarge.open){
                props.context.loadEnlarge(e, "portrait.jpg");
                setTimeout(() => {
                    if(document.getElementById("ArtworkInfo")){
                        // document.getElementById("ArtworkInfo").classList.add("show")
                        // setTimeout(() => {
                            document.getElementById("ArtworkInfo").classList.add("info-up")
                        // }, 200);
                    }
                }, 200)
                return
            }
            if(document.getElementById("TagsMenu").classList.contains("show-menu")){
                props.context.showMenu(e)
            }
            const artworkInfo = document.getElementById("ArtworkInfo")
            if(artworkInfo){
                artworkInfo.classList.toggle("info-up")
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
    const spreadLetters = (title) => {
        let letters = Array.from(title).map((letter, index) => {
            return <span 
            key={`${title}-leter-${index}`} 
            className="title-letter"
            >{letter}</span>
        })
        return letters
    }

    return(
        <div className="controls">
            {slideButton()}
            <div 
                className="menu-container"
                onClick={(e) => {
                    console.log("combined show menu")
                    props.context.showMenu(e)}
                }
                >
                <div className="menu-title">
                    {spreadLetters("menu")}
                </div>
            </div>
            {exitButton()}
        </div>
    )
}

export default Controls