//projects
const sliders = document.querySelectorAll(".slider");
// interval between switching images
const interval = 2800;
// set animDuration 
const animDuration = 600;

for (let i = 0; i < sliders.length; ++i) {
  const slider = sliders[i];
  const dots = slider.querySelector(".dots");
  const sliderImgs = slider.querySelectorAll(".img");

  let currImg = 0;
  let prevImg = sliderImgs.length - 1;
  let intrvl;
  let timeout;
  let startX;

  // Creates dots and add listeners to them
  for (let j = 0; j < sliderImgs.length; ++j) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dots.appendChild(dot);
    dot.addEventListener("click", dotClick.bind(null, j), false);
  }

  const allDots = dots.querySelectorAll(".dot");
  allDots[0].classList.add("active-dot");

  sliderImgs[0].style.left = "0";
  timeout = setTimeout(() => {
    animateSlider();
    sliderImgs[0].style.left = "";
    intrvl = setInterval(animateSlider, interval);
  }, interval - animDuration);

  // Animates images
  function animateSlider(nextImg, right) {
    if (nextImg === undefined)
      nextImg = currImg + 1 < sliderImgs.length ? currImg + 2 : 1;

    --nextImg;
    sliderImgs[prevImg].style.animationName = "";

    if (!right) {
      sliderImgs[nextImg].style.animationName = "leftNext";
      sliderImgs[currImg].style.animationName = "leftCurr";
    } else {
      sliderImgs[nextImg].style.animationName = "rightNext";
      sliderImgs[currImg].style.animationName = "rightCurr";
    }

    prevImg = currImg;
    currImg = nextImg;

    const currDot = allDots[currImg];
    currDot.classList.add("active-dot");
    const prevDot = allDots[prevImg];
    prevDot.classList.remove("active-dot");
  }

  // Decides if animate to left or right and highlights clicked dot
  function dotClick(num) {
    if (num === currImg) return false;

    clearTimeout(timeout);
    clearInterval(intrvl);

    if (num > currImg)
      animateSlider(num + 1);
    else
      animateSlider(num + 1, true);

    intrvl = setInterval(animateSlider, interval);
  }

  // Handle touch events for mobile devices
  slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    clearTimeout(timeout);
    clearInterval(intrvl);
  });

  slider.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    const diffX = endX - startX;

    if (diffX > 50) {
      animateSlider(currImg + 1, true);
    } else if (diffX < -50) {
      animateSlider(currImg + 1);
    }

    intrvl = setInterval(animateSlider, interval);
  });
}
