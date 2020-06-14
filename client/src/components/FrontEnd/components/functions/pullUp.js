  
const pullUp = (options, offsetCallback) => {

        const container = document.getElementById(options.parentId)
        const dragItem = document.getElementById(options.childId)
        const infoButton = document.getElementById("show-info-button")
    
        var active = false;
        var currentX;
        var currentY = null;
        var initialX;
        var initialY;
        var xOffset = 0;
        var yOffset = 0;
        const maxY = dragItem.clientHeight

        // infoButton.addEventListener("click", click)

        container.addEventListener("touchstart", dragStart, false);
        container.addEventListener("touchend", dragEnd, false);
        container.addEventListener("touchmove", drag, false);
    
        // container.addEventListener("mousedown", dragStart, false);
        // container.addEventListener("mouseup", dragEnd, false);
        // container.addEventListener("mousemove", drag, false);

        // function click(e) {
        //     console.log("CLICKED")
        //     if(e){
        //         e.stopPropagation()
        //         e.preventDefault()
        //         console.log("run show info")
        //         console.log(e)
        //       }
        //       if(e.touches){return}
        
        //       const info = document.getElementById("ArtworkInfo")
        //       if(info.classList.contains("info-up")){
        //         info.style.transform = "translateY(0)"
        //         xOffset = 0
        //         info.classList.remove("info-up")
        //       }
        //       else{
        //         info.style.transform = `translateY(-${info.clientHeight}px)`
        //         // xOffset = 0
        //         xOffset = -maxY
        //         info.classList.add("info-up")
        //         }
              
        //       info.classList.remove("dragged")
        //       return
        // }


        function dragStart(e) {
            console.log("drag start")
            console.log(`initialY ________________ ${initialY}`)
            console.log("xOffset o nSTART")
            console.log(xOffset)
            if (e.type === "touchstart") {
                if(e.touches.length > 1){
                    return
                }
                initialY = e.touches[0].clientY - yOffset;
                initialX = e.touches[0].clientX - xOffset;
                if(dragItem.classList.contains("info-up") && !dragItem.classList.contains("dragged")){
                    initialY = e.touches[0].clientY
                }
                console.log("INITIAL Y__________________")
                console.log(initialY)
            } else {
                initialX = e.clientX - xOffset;
                initialY = e.clientY - yOffset;
            }
            console.log(`initialY ***************** ${initialY}`)
        active = true
        }
    
        function dragEnd(e) {
            if(e.touches.length > 1){
                active = false
                return
            }
        initialX = currentX;
        initialY = currentY;
        console.log("xOffset on END")
        console.log(xOffset)
        if(currentY > -20){
            dragItem.classList.remove("info-up")
            dragItem.classList.remove("dragged")
            currentY = 0
        }
        if(currentY < 0){
            dragItem.classList.add("info-up")
            dragItem.classList.add("dragged")
        }
        active = false;
        }
    
        function drag(e) {
        if (active) {
        
            // e.preventDefault();
        
            if (e.type === "touchmove") {
            currentX = e.touches[0].clientX - initialX;
            currentY = e.touches[0].clientY - initialY;
            if(dragItem.classList.contains("info-up") && !dragItem.classList.contains("dragged")){
                currentY = initialY - e.touches[0].clientY
            }
            } else {
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
            }
            console.log("currentY")
            console.log(currentY)
    
            
            if(-currentY > dragItem.clientHeight){
                return
            }
            if(currentY > 0 ){
                return
            }
            // if(currentY > -20){
            //     dragItem.classList.remove("info-up")
            //     dragItem.classList.remove("dragged")
            //     currentY = 0
            // }
            // if(currentY < 0){
            //     dragItem.classList.add("info-up")
            //     dragItem.classList.add("dragged")
            // }
            xOffset = currentX;
            yOffset = currentY;
            
            setTranslate(currentX, currentY, dragItem);
        }
        }
    
        function setTranslate(xPos, yPos, el) {
        el.style.transform = `translateY(${yPos}px)`;
        }

    }
    
    export default pullUp