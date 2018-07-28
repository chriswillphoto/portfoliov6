(function() {
  let viewBox = document.querySelector("#viewbox");
  let navButtons = document.querySelectorAll(".nav-button");
  let windowWidth = window.innerWidth;
  let draggables = document.querySelectorAll(".draggable");

  draggables.forEach(function(el){
    const dragHandle = document.createElement('div');
    dragHandle.innerHTML = "<i class='icon ion-ios-move'></i>"
    dragHandle.classList = "drag-handle";
    el.appendChild(dragHandle)
  })

  let whatever = document.querySelectorAll(".home > *");

  console.log(whatever);
  let elHeights;
  whatever.forEach(function(i) {
    elHeights += i.clientHeight;
  });

  viewBox.style.left = 0;

  const shiftView = function(e) {
    const newLeft = e.target.getAttribute("data-left");
    e.preventDefault();
    if (viewBox.style.left != newLeft) {
      viewBox.style.left = newLeft;
      console.log(newLeft);
    }
  };

  // event delegation
  document.addEventListener(
    "click",
    function(event) {
      if (event.target.matches(".nav-button")) {
        shiftView(event);
      }

      if (event.target.matches(".modal-open")) {
        // Run your code to open a modal
      }

      if (event.target.matches(".close")) {
        // Run your code to close a modal
      }
    },
    false
  );
})();
