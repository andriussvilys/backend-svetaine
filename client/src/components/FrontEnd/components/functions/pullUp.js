const pullUp = (options) => {

//     const onTouch = e => {
//         console.log(e.target)
//     }
//     const parent = document.getElementById(options.parentId)
//     const child = document.getElementById(options.childId)

//     if(!child || !parent){
//         console.log("parent or child not present")
//         return
//     }

//     const childPositionY = () => {
//         return parent.getBoundingClientRect().height - child.getBoundingClientRect().y + 4
//     } 


//     let startPositionY = null
//     let endPositionY = null
//     let drag = null
//     let transformValue = 0


//     const moveEvent = (e) => {
//         if(drag){
//             let diff = null
//             if(!e.touches){
//             diff = startPositionY - e.clientY
//             }
//             else{
//             diff = startPositionY - e.touches[0].clientY
//             }
//             transformValue = -diff

//             if(endPositionY){
//                 transformValue = -endPositionY - diff
//                 // console.log("endPositionY")
//                 // console.log(endPositionY)
//             }
//             if(-transformValue >= child.clientHeight){
//                 // console.log("transformValue >= child.clientHeight")
//                 return
//             }
//             if(transformValue > 0){
//                 // console.log("transformValue > 0")
//                 return
//             }
//             if(endPositionY){
//                 if(-transformValue < 10){
//                     transformValue = 0
//                 }
//             }
//             if(-transformValue >= child.clientHeight - 20){
//                 transformValue = -child.clientHeight
//             }
//             // console.log("transformValue")
//             // console.log(transformValue)
            
//             transformValue = Math.round(transformValue)
//                             // console.log("transformValue")
//                             // console.log(transformValue)
            

//             child.style.transform = `translateY(${transformValue}px)`
//         }
//     }

//     const startEvent = (e) => {
//         drag = true       
//             if(e.touches){
//                 startPositionY = e.touches[0].clientY
//                 parent.addEventListener("touchmove", e => {
//                     moveEvent(e)
//                 })
//             }
//             else{
//                 startPositionY = e.clientY
//                 parent.addEventListener("mousemove", e => {
//                     moveEvent(e)
//                 })
//             }
//     }

//     const endEvent = (e) => {

//         endPositionY = Math.round(childPositionY() - 50)
//         // if(endPositionY >= 0){
//         //     endPositionY = null
//         // }
//         if(endPositionY <= 0){
//             child.classList.remove("info-up")
//         }
//         else{
//             child.classList.add("info-up")
//         }
//         // console.log(`endposition ${endPositionY}`)
//         drag = false
//     }

//     parent.addEventListener("mousedown", (e) => startEvent(e))
//     parent.addEventListener("mouseup", (e) => endEvent(e))

//     parent.addEventListener("touchstart", (e) => startEvent(e))
//     parent.addEventListener("touchend", (e) => endEvent(e))

// }


    // var dragItem = document.querySelector("#item");
    // var container = document.querySelector("#container");

    const container = document.getElementById(options.parentId)
    const dragItem = document.getElementById(options.childId)

    var active = false;
    var currentX;
    var currentY = null;
    var initialX;
    var initialY;
    var xOffset = 0;
    var yOffset = 0;

    container.addEventListener("touchstart", dragStart, false);
    container.addEventListener("touchend", dragEnd, false);
    container.addEventListener("touchmove", drag, false);

    container.addEventListener("mousedown", dragStart, false);
    container.addEventListener("mouseup", dragEnd, false);
    container.addEventListener("mousemove", drag, false);

    function dragStart(e) {
        console.log("drag start")
    if (e.type === "touchstart") {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
    } else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
    }
    active = true
    }

    function dragEnd(e) {
        console.log("drag end")
    initialX = currentX;
    initialY = currentY;

    active = false;
    }

    function drag(e) {
    if (active) {
    
        e.preventDefault();
    
        if (e.type === "touchmove") {
        currentX = e.touches[0].clientX - initialX;
        currentY = e.touches[0].clientY - initialY;
        } else {
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
        }

        xOffset = currentX;
        yOffset = currentY;

        if(-currentY > dragItem.clientHeight){
            return
        }
        if(currentY > 0 ){
            return
        }
        if(currentY > -20){
            currentY = 0
        }

        setTranslate(currentX, currentY, dragItem);
    }
    }

    function setTranslate(xPos, yPos, el) {
    el.style.transform = `translateY(${yPos}px)`;
    }
}

export default pullUp

