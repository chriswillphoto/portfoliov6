(function() {
  let viewBox = document.querySelector("#viewbox");
  let navButtons = document.querySelectorAll(".nav-button");
  let windowWidth = window.innerWidth;
  let draggables = document.querySelectorAll(".draggable");
  let workWindow = document.querySelector('#work')

  let state = {
    mouseDown: false,
    timerID: 0,
    mouseX: 0,
    mouseY: 0
  };
  
  const onStart = () => {
    draggables.forEach(function(el) {
      const dragHandle = document.createElement("i");
      dragHandle.classList = "drag-handle icon ion-ios-move";
      el.appendChild(dragHandle);
    });
    viewBox.style.left = 0;
  }

  const shiftView = function(e) {
    const newLeft = e.target.getAttribute("data-left");
    e.preventDefault();
    if (viewBox.style.left != newLeft) {
      viewBox.style.left = newLeft;
    }
  };

  const dragHandler = function(e) {
    if (!state.mouseDown) {
      const timerId = setInterval(boxPosition, 100);
      state = {
        ...state,
        mouseDown: true,
        timerID: timerId,
        selectedEl: e.target.parentElement
      };
    }
  };

  const boxPosition = function() {
    if (state.mouseDown) {
      const offsetWidth = state.selectedEl.offsetWidth;
      const offsetHeight = state.selectedEl.offsetHeight;
      const mouseOffsetX = window.innerWidth - state.mouseX;
      const mouseOffsetY = window.innerHeight - state.mouseY;
      const newPosX = mouseOffsetX - offsetWidth;
      const newPosY = mouseOffsetY - offsetHeight;

      state.selectedEl.style.right = newPosX + "px";
      state.selectedEl.style.bottom = newPosY + "px";
      console.log(state);
    }
  };

  const mousePosition = function(e) {
    state = {
      ...state,
      mouseX: e.clientX,
      mouseY: e.clientY
    };

    // console.log(state);
  };

  // event delegation
  document.addEventListener(
    "click",
    function(event) {
      if (event.target.matches(".nav-button")) {
        shiftView(event);
      }

      if (event.target.matches(".open-modal")) {
        // Run your code to open a modal
        workWindow.classList.add('modal-open')
      }

      if (event.target.matches(".close")) {
        // Run your code to close a modal
        workWindow.classList.remove('modal-open')
      }

      if (event.target.matches(".drag-toggle")) {
        document.body.classList.toggle('view-handles') 
      }
    },
    false
  );

  document.addEventListener(
    "mousedown",
    function(event) {
      if (event.target.matches(".drag-handle")) {
        event.preventDefault();
        mousePosition(event);
        dragHandler(event);
      }
      // console.log(event.target)
    },
    false
  );

  document.addEventListener("mouseup", function(event) {
    state = {
      ...state,
      mouseDown: false
    };
    window.clearInterval(state.timerID);
    console.log(state);
  });

  document.addEventListener("mousemove", function(event) {
    if(state.mouseDown){
      mousePosition(event);
    }
  });
  onStart();
})();
