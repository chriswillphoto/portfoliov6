(function() {
  let viewBox = document.querySelector("#viewbox");
  let navButtons = document.querySelectorAll(".nav-button");
  let windowWidth = window.innerWidth;
  let draggables = document.querySelectorAll(".draggable");
  let workWindow = document.querySelector("#work");
  let pageViews = document.querySelectorAll('.page-view');
  // let workButtons = document.querySelectorAll('.button-container');


  navButtons.forEach(function(e, i){
      e.classList.add('animate')
  })

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

    document.querySelector('#home').classList.add('active-view');
  };

  const shiftView = function(e) {
    e.preventDefault();
    pageViews.forEach(function(view){
      view.classList.remove('active-view');
    })

    const newLeft = e.target.getAttribute("data-left");
    let activeView = e.target.getAttribute('data-view');
    
    document.querySelector('#'+activeView).classList.add('active-view');

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
      const offsetWidth = state.selectedEl.offsetWidth - ( state.selectedEl.offsetWidth / 2 ); // width of element - allowance for translateX +50%
      const offsetHeight = state.selectedEl.offsetHeight;
      const mouseOffsetX = window.innerWidth - state.mouseX;
      const mouseOffsetY = window.innerHeight - state.mouseY;
      const newPosX = mouseOffsetX - offsetWidth;
      const newPosY = mouseOffsetY - offsetHeight;

      state.selectedEl.style.right = newPosX + "px";
      state.selectedEl.style.bottom = newPosY + "px";
      // console.log(state);
    }
  };

  const mousePosition = function(e) {
    let newY = 0;
    let newX = 0;
    if (0 <= e.clientY && e.clientY <= window.innerHeight) {
      newY = e.clientY
    }else if( e.clientY < 0){
      newY = 0;
    }else if( e.clientY > window.innerHeight){
      newY = window.innerHeight;
    }
    if (0 <= e.clientX && e.clientX <= window.innerWidth) {
      newX = e.clientX
    }else if( e.clientX < 0){
      newX = 0;
    }else if( e.clientX > window.innerWidth){
      newX = window.innerWidth;
    }


    state = {
      ...state,
      mouseX: newX,
      mouseY: newY
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

      if (event.target.matches(".info-toggle")) {
        document.body.classList.toggle("info-modal-open");
      }

      if (event.target.matches(".open-modal")) {
        workWindow.classList.add("modal-open");
      }

      if (event.target.matches(".close")) {
        workWindow.classList.remove("modal-open");
        document.body.classList.remove("info-modal-open");
      }

      if (event.target.matches(".drag-toggle")) {
        document.body.classList.toggle("view-handles");
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
    if (state.mouseDown) {
      mousePosition(event);
    }
  });
  onStart();
})();
