import React from 'react'

const Nav = (props) => {
    if(props.context){
        return(
            <div
                className="Navbar"
                style={{
                }}
                >
                <button
                    style={{
                        position: "absolute",
                        top: "8vw",
                        left: '0',
                        width: "4vw",
                        cursor: "pointer"
                    }}
                    onClick={() => props.context.viewNext()}
                    className={props.context.state.enlarge ? null : "display-no"}
                >
                    <img alt="view next" src="/icons/point-right.png" />
                </button>
                <button
                    style={{
                        position: "absolute",
                        top: "12vw",
                        left: '0',
                        width: "4vw",
                        cursor: "pointer"
                    }}
                    onClick={() => props.context.viewPrev()}
                    className={props.context.state.enlarge? null : "display-no"}
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
            </div>
        )
    }
    else{return null}
}

export default Nav
