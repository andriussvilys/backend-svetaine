const pullUp = (options) => {

    const onTouch = e => {
        console.log(e.target)
    }
    const parent = document.getElementById(options.parentId)
    const child = document.getElementById(options.childId)

    if(!child || !parent){
        console.log("parent or child not present")
        return
    }

    const childPositionY = () => {
        return parent.getBoundingClientRect().height - child.getBoundingClientRect().y + 4
    } 


    let startPositionY = null
    let endPositionY = null
    let drag = null
    let transformValue = 0


    const moveEvent = (e) => {
        if(drag){
            let diff = null
            if(!e.touches){
            diff = startPositionY - e.clientY
            }
            else{
            diff = startPositionY - e.touches[0].clientY
            }
            transformValue = -diff

            if(endPositionY){
                transformValue = -endPositionY - diff
                // console.log("endPositionY")
                // console.log(endPositionY)
            }
            if(-transformValue >= child.clientHeight){
                // console.log("transformValue >= child.clientHeight")
                return
            }
            if(transformValue > 0){
                // console.log("transformValue > 0")
                return
            }
            if(endPositionY){
                if(-transformValue < 10){
                    transformValue = 0
                }
            }
            if(-transformValue >= child.clientHeight - 20){
                transformValue = -child.clientHeight
            }
            // console.log("transformValue")
            // console.log(transformValue)
            
            transformValue = Math.round(transformValue)
                            // console.log("transformValue")
                            // console.log(transformValue)
            

            child.style.transform = `translateY(${transformValue}px)`
        }
    }

    const startEvent = (e) => {
        drag = true       
            if(e.touches){
                startPositionY = e.touches[0].clientY
                parent.addEventListener("touchmove", e => {
                    moveEvent(e)
                })
            }
            else{
                startPositionY = e.clientY
                parent.addEventListener("mousemove", e => {
                    moveEvent(e)
                })
            }
    }

    const endEvent = (e) => {

        endPositionY = Math.round(childPositionY() - 50)
        // if(endPositionY >= 0){
        //     endPositionY = null
        // }
        if(endPositionY <= 0){
            child.classList.remove("info-up")
        }
        else{
            child.classList.add("info-up")
        }
        // console.log(`endposition ${endPositionY}`)
        drag = false
    }

    parent.addEventListener("mousedown", (e) => startEvent(e))
    parent.addEventListener("mouseup", (e) => endEvent(e))

    parent.addEventListener("touchstart", (e) => startEvent(e))
    parent.addEventListener("touchend", (e) => endEvent(e))

}

export default pullUp

