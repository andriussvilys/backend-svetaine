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
            }
            if(-transformValue >= child.clientHeight){
                return
            }
            if(transformValue > 0){
                transformValue = 0
            }

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
        endPositionY = childPositionY()
        drag = false
    }

    parent.addEventListener("mousedown", (e) => startEvent(e))
    parent.addEventListener("mouseup", (e) => endEvent(e))

    parent.addEventListener("touchstart", (e) => startEvent(e))
    parent.addEventListener("touchend", (e) => endEvent(e))

}

export default pullUp

