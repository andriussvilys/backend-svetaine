import React, { Fragment } from 'react'

const Nav = (props) => {
    const showButtons = () => {
        if(!props.context.state.enlarge.open){
            return false
        }
        if(props.context.state.enlarge.background.artworkFamily){
            return props.context.state.relatedArtwork[props.context.state.enlarge.background.artworkFamily].column.fileIds.length > 1
        }
        else{return false}
    }
        return(
            <div
                className="Navbar"
                style={{
                }}
                >
                    {
                        props.context.state.enlarge ? 
                                    <Fragment>
                                    <button
                                        id="button-next"
                                        onClick={() => props.context.viewNext()}
                                        className={showButtons() ? "Nav-button Nav-button_next" : "Nav-button Nav-button_next move-right"}
                                    >
                                        <img alt="view next" src="/icons/point-right.png" />
                                    </button>
                                    <button
                                        id="button-prev"
                                        onClick={() => props.context.viewPrev()}
                                        className={showButtons() ? "Nav-button Nav-button_prev" : "Nav-button Nav-button_prev move-left"}
                                    >
                                        <img alt="view previous" src="/icons/point-left.png"/>
                                    </button>
                                    <div 
                                        className="Nav-button Nav-infoButton"
                                        onClick={() => props.context.showInfo()}
                                    >
                                        <h1>i</h1>
                                    </div>
                                    </Fragment>
                                    : null
                    }
            </div>
        )
}

export default Nav
