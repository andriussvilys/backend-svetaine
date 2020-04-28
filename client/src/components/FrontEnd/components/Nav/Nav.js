import React, { Fragment } from 'react'
import Controls from '../ArtworkInfo/Controls'

const Nav = (props) => {
    const showButtons = () => {
        if(props.context.state.enlarge){
            if(!props.context.state.enlarge.open){
                return false
            }
            // if(props.context.state.enlarge.background.artworkFamily){
            //     // return props.context.state.relatedArtwork[props.context.state.enlarge.background.artworkFamily].column.fileIds.length > 1
            // }
            else{return true}
        }
        else{return false}
    }
    const showInfo = () => {
        if(props.context.state.enlarge){
            if(props.context.state.enlarge.open){
                return true
            }
            return false
        }
        return false
    }
        return(
            <div
                className="Navbar"
                style={{
                }}
                >
                    {/* {props.context.state.enlarge ?  */}
                                    <Fragment>
                                    <button
                                        id="button-next"
                                        onClick={() => props.context.viewNext(+1)}
                                        className={showButtons() ? "Nav-button Nav-button_next" : "Nav-button Nav-button_next move-right"}
                                    >
                                        <img alt="view next" src="icons/point-right.png" />
                                    </button>
                                    <button
                                        id="button-prev"
                                        onClick={() => props.context.viewNext(-1)}
                                        className={showButtons() ? "Nav-button Nav-button_prev" : "Nav-button Nav-button_prev move-left"}
                                    >
                                        <img alt="view previous" src="icons/point-left.png"/>
                                    </button>
                                        <div 
                                            className="Nav-button Nav-button-menu" 
                                            onClick={() => props.context.showMenu()}
                                        >
                                            <img className="menu" alt="menu button" src='icons/menu.png'/>
                                            {/* <h3 className="nav-menuButton">menu</h3> */}
                                        </div>
                                    {showInfo() ?                                    
                                        <div 
                                            className="Nav-button Nav-infoButton"
                                            onClick={() => props.context.showInfo()}
                                        >
                                            <img className="Nav-infoButton-icon" alt="info buton" src="icons/info.png" />
                                            {/* <h1>i</h1> */}
                                        </div>
                                        : 
                                        null
                                    }
                                    </Fragment>
                    {/* } */}
            </div>
        )
}

export default Nav
