const pullUp = (options, offsetCallback) => {
  const container = document.getElementById(options.parentId);
  const dragItem = document.getElementById(options.childId);
  const infoButton = document.getElementById("show-info-button");

  var active = false;
  var currentX;
  var currentY = null;
  var initialX;
  var initialY;
  var xOffset = 0;
  var yOffset = 0;

  let previousY = 0
  const maxY = dragItem.clientHeight;

  // infoButton.addEventListener("click", click)

  dragItem.addEventListener("touchstart", dragStart, false);
  dragItem.addEventListener("touchend", dragEnd, false);
  dragItem.addEventListener("touchmove", drag, false);

//   container.addEventListener("touchstart", dragStart, false);
//   container.addEventListener("touchend", dragEnd, false);
//   container.addEventListener("touchmove", drag, false);

  function dragStart(e) {
    e.stopPropagation()

    console.log("previousY")
    console.log(previousY)

    // document.getElementById("ArtworkInfo-container").classList.remove("ArtworkInfo-toggleTags");
        if (e.type === "touchstart") {
          if (e.touches.length > 1) {
            return;
          }
          initialY = e.touches[0].clientY - yOffset;
          initialX = e.touches[0].clientX - xOffset;
          if (
            dragItem.classList.contains("info-up") &&
            !dragItem.classList.contains("dragged")
          ) {
            initialY = e.touches[0].clientY;
          }
        } else {
          initialX = e.clientX - xOffset;
          initialY = e.clientY - yOffset;
        }
        active = true;
  }

  function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;

    xOffset = currentX;
    yOffset = currentY;

    previousY = currentY

    // if (currentY > -20) {
    // //   dragItem.classList.remove("info-up");
    // //   dragItem.classList.remove("dragged");
    // // document.getElementById("ArtworkInfo-container").classList.remove("ArtworkInfo-toggleTags");
    // // dragItem.style.transform = "translateY(0)"
    //   currentY = 0;
    // }
    if (currentY < 0) {
      dragItem.classList.add("dragged");
    }
    active = false;
  }

  function drag(e) {
    if (active) {
      // e.preventDefault();

      if (e.type === "touchmove") {
        dragItem.classList.remove("info-up")
        currentX = e.touches[0].clientX - initialX;
        currentY = e.touches[0].clientY - initialY;
        if (
          dragItem.classList.contains("info-up") &&
          !dragItem.classList.contains("dragged")
        ) {
          currentY = initialY - e.touches[0].clientY;
        }
      } else {
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
      }

      if (-currentY > dragItem.clientHeight) {
        currentY = -dragItem.clientHeight;
        dragItem.classList.add("info-up")
        // return
      }
      if (currentY > 0) {
        // return
        currentY = 0;
      }
      if(currentY !== 0){
          setTranslate(currentX, currentY, dragItem);
      }

    }
  }

  function setTranslate(xPos, yPos, el) {
    el.style.transform = `translateY(${yPos}px)`;
  }
};

export default pullUp;
