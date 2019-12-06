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
                                        style={{
                                            position: "absolute",
                                            top: "8vw",
                                            left: '0',
                                            width: "4vw",
                                            cursor: "pointer"
                                        }}
                                        onClick={() => props.context.viewNext()}
                                        className={showButtons() ? null : "move-right"}
                                    >
                                        <img alt="view next" src="/icons/point-right.png" />
                                    </button>
                                    <button
                                        id="button-prev"
                                        style={{
                                            position: "absolute",
                                            top: "12vw",
                                            left: '0',
                                            width: "4vw",
                                            cursor: "pointer"
                                        }}
                                        onClick={() => props.context.viewPrev()}
                                        className={showButtons() ? null : "move-left"}
                                    >
                                        <img alt="view previous" src="/icons/point-left.png"/>
                                    </button>
                                        <div 
                                        style={{
                                            position: "absolute",
                                            top: "16vw",
                                            left: '0',
                                            width: "4vw",
                                            cursor: "pointer",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
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
