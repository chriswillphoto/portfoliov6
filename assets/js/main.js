const $$ = (selector, el = D) => {
  el.querySelectorAll(selector)
}

let viewBox = document.querySelector('#viewbox');
let navButtons = document.querySelectorAll('.nav-button')
let windowWidth = window.innerWidth;

const shiftView = function(e){
  const newLeft = e.target.getAttribute('data-left');
  e.preventDefault();
  viewBox.style.left = newLeft;
  console.log(newLeft)
}

navButtons.forEach(function(el){
  el.addEventListener('click', shiftView)
})
for(let i=0; i < navButtons.length; i++){
  navButtons[i].setAttribute('data-test', i);
  navButtons[i].addEventListener('click', function(){
    console.log(this.innerText);
  })
}