function showSlides() {
  var i;
  var slides = document.querySelectorAll(".slider__image")
  console.log(slides.length)
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 10000); // Change image every 2 seconds
}


function changeSlides(offset){
    var i;
    var slides = document.querySelectorAll(".slider__image")
    console.log(slides.length)
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex += offset;
    console.log(`offset is ${offset}`)
    console.log(`slide index is ${slideIndex}`)
    if (slideIndex > slides.length) {slideIndex = 1}
    if (slideIndex <= 0) {slideIndex = slides.length}
    slides[slideIndex-1].style.display = "block";
}


var slideIndex = 0;
showSlides();
const next_btn = document.querySelector("#next")
next_btn.addEventListener('click', function(){changeSlides(1)}, false)
const prev_btn = document.querySelector("#prev")
prev_btn.addEventListener('click', function(){changeSlides(-1)}, false)