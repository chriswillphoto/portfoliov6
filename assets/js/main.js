(function() {
  const $$ = (selector, el = D) => {
    el.querySelectorAll(selector);
  };


  let viewBox = document.querySelector("#viewbox");
  let navButtons = document.querySelectorAll(".nav-button");
  let windowWidth = window.innerWidth;

  viewBox.style.left = 0;

  const shiftView = function(e) {
    const newLeft = e.target.getAttribute("data-left");
    e.preventDefault();
    viewBox.style.left = newLeft;
    console.log(newLeft);
  };

  navButtons.forEach(function(el) {
    el.addEventListener("click", shiftView);
  });

  // event delegation
  document.addEventListener('click', function (event) {

    if (event.target.matches('.modal-open')) {
      // Run your code to open a modal
    }
  
    if (event.target.matches('.close')) {
      // Run your code to close a modal
    }
  
  }, false);
})();
