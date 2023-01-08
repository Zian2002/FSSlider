data.sort((a, b) => {
    if(a.id%2 == 0 && b.id%2 != 0){
        return 1;
     };
     if(a.id%2 != 0 && b.id%2 == 0){
        return -1;
     };
     return a.id - b.id;
})

const slider = document.querySelector(".slider");
const item = document.querySelector(".slider-item");
let itemWidth = item ? item.scrollWidth : 400; //css
let gap = 20; //css
const progress = document.querySelector(".progress");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");

displaySlider(data)

slider.addEventListener("click", function(e){
    clearInterval(interval);
    console.log(e.target);
})

prevButton.addEventListener("click", function(e) {
    slider.scrollLeft -= itemWidth + gap;
    displayProgress();
    displayControlButton();
    clearInterval(interval);
})

nextButton.addEventListener("click", function(e) {
    slider.scrollLeft += itemWidth + gap;
    displayProgress();
    displayControlButton();
    clearInterval(interval);
})

slider.addEventListener("wheel", function(e){
    if(getDeviceType() === "desktop" && window.innerWidth > 1023.98) 
        e.preventDefault();
    this.scrollLeft += e.deltaY;
    clearInterval(interval);
})

slider.addEventListener("scroll", function() {
    displayProgress();
    displayControlButton();
    clearInterval(interval);
})

window.addEventListener("")

window.addEventListener("resize", debounceFn(function(){
    slider.style = "";
    let item = document.querySelector(".slider-item");
    itemWidth = item ? item.scrollWidth : 400; //css
    slider.style = `grid-template-columns: repeat(${Math.round(data.length / 2)}, ${itemWidth}px);`;
}, 200))

function createSliderItem({id, src, title, desc}){
    const template = 
    `<div class="slider-item" data-id="${id}">
        <img src="${src}" alt="">
        <div class="content">
            <h2 class="title">${title}</h2>
            <p class="desc">${desc}</p>
        </div>
    </div>`;
    slider.insertAdjacentHTML("beforeend", template);
}

function displayControlButton(){
    if (progress.style.width === "100%"){
        nextButton.classList.add("disabled")
        prevButton.classList.remove("disabled")
    }else if (progress.style.width === `${Math.round(slider.clientWidth / slider.scrollWidth * 100)}%`) {
        nextButton.classList.remove("disabled")
        prevButton.classList.add("disabled")
    }else {
        nextButton.classList.remove("disabled")
        prevButton.classList.remove("disabled")
    }
}

function displayProgress(){
    pos = slider.scrollLeft + slider.clientWidth;
    let width = slider.scrollWidth;
    let length = Math.round((pos / width) * 100);
    progress.style.width = `${length}%`;
}



let interval = setInterval(function(){
    slider.scrollLeft += itemWidth + 20;
    displayProgress()
    if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth){
        slider.scrollLeft = 0;
    }
}, 3000);

function displaySlider(data){
    slider.style = `grid-template-columns: repeat(${Math.round(data.length / 2)}, ${itemWidth}px);`;
    slider.innerHTML = "";
    data.forEach(item => {
        createSliderItem(item);
    })
    displayProgress()
    prevButton.classList.add("disabled")
}

function getDeviceType() {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return "tablet";
    }
    if (
      /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua
      )
    ) {
      return "mobile";
    }
    return "desktop";
};

function debounceFn(func, wait, immediate) {
    let timeout;
    return function () {
      let context = this,
        args = arguments;
      let later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      let callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
}