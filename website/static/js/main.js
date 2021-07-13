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

function createProducts(i){
  var product = document.createElement("div")
    product.className = "product"
    var productUpper = document.createElement('div')
    productUpper.className = "product__upper"
    var productImage = document.createElement('div')
    productImage.className = "product__image"
    var productDetails = document.createElement('div')
    productDetails.className = "product__details"
    var productLower = document.createElement('div')
    productLower.className = "product__lower"

    var img = document.createElement("img")    
    img.src = products[i].img

    var productDetailsName = document.createElement("p")
    productDetailsName.innerHTML = products[i].name
    productDetailsName.className = "product__details--name"

    var productDetailsCategory = document.createElement("p")
    productDetailsCategory.innerHTML = products[i].category
    productDetailsCategory.className = "product__details--category"

    var productPrice = document.createElement("p")
    productPrice.innerHTML = `${products[i].price} تومان`
    productPrice.className = "product__price"

    var productButton = document.createElement("button")
    productButton.textContent = "خرید محصول"
    productButton.className = "product__button"

    productDetails.appendChild(productDetailsName)
    productDetails.appendChild(productDetailsCategory)

    productImage.appendChild(img)

    productUpper.appendChild(productImage)
    productUpper.appendChild(productDetails)
    
    productLower.appendChild(productButton)
    productLower.appendChild(productPrice)

    product.appendChild(productUpper)
    product.appendChild(productLower)

    return product
}

function createPagingButtons(){
  var paging = document.querySelector(".paging")
  paging.innerHTML = ''
  var prevPage = document.createElement("button")
  prevPage.className = "prev-page__btn"
  prevPage.textContent = "صفحه قبل"
  prevPage.addEventListener('click', function(){changePage(pageIndex-1)}, false)
  var nextPage = document.createElement("button")
  nextPage.className = "next-page__btn"
  nextPage.textContent = "صفحه بعد"
  nextPage.addEventListener('click', function(){changePage(pageIndex+1)}, false)
  var pagingButtons = document.createElement("div")
  pagingButtons.className = "page__buttons"
  pagingButtons.innerHTML = '';

  for(var i =0; i< Math.ceil(totalProducts / itemPerPage); i++){
    var btn = document.createElement("button")  
    btn.textContent = i+1
    btn.addEventListener('click', function(){changePage(parseInt(this.textContent))}, false)
    if(i+1===pageIndex){btn.style.backgroundColor = "rgb(249, 89, 58)"}
    pagingButtons.appendChild(btn)
  }


  if(pageIndex === Math.ceil(totalProducts / itemPerPage)){nextPage.style.display = "none"}
  else if(pageIndex === 1){prevPage.style.display = "none"}

  paging.appendChild(prevPage)
  paging.appendChild(pagingButtons)
  paging.appendChild(nextPage)
  

}

function pagging(){
  console.log(`pagging`)
  for(var i=0; i<totalProducts; i++){
    var product = createProducts(i)

    mainBottomLowerProduct.appendChild(product)



    if(i >= pageIndex*itemPerPage){
      product.style.display = "none"}
    if(i < (pageIndex-1)*itemPerPage){
      product.style.display = "none"}
  }
  createPagingButtons()
}

function changePage(index){
  console.log(index)
  pageIndex = index
  mainBottomLowerProduct.innerHTML = ''
  pagging()
}

function changeItemPerPage(value){
  itemPerPage = value
  if(totalProducts<itemPerPage*pageIndex){pageIndex=1}
  console.log(`item per page is ${itemPerPage}`)
  mainBottomLowerProduct.innerHTML = ''
  pagging()
}

var slideIndex = 0;
totalProducts = 40
var pageIndex = 1
var itemPerPage = 15
showSlides();
const next_btn = document.querySelector("#next")
next_btn.addEventListener('click', function(){changeSlides(1)}, false)
const prev_btn = document.querySelector("#prev")
prev_btn.addEventListener('click', function(){changeSlides(-1)}, false)


var products = [{"img":"/Pictures/Product sample picture.png","name":"موس گیمینگ ریزر  1","category":"دسته بندی  1","price":"10000"},{"img":"/Pictures/Product sample picture.png","name":"موس گیمینگ ریزر  2","category":"دسته بندی  2","price":"20000"},{"img":"/Pictures/Product sample picture.png","name":"موس گیمینگ ریزر  3","category":"دسته بندی  3","price":"30000"},{"img":"/Pictures/Product sample picture.png","name":"موس گیمینگ ریزر  4","category":"دسته بندی  4","price":"40000"},{"img":"/Pictures/Product sample picture.png","name":"موس گیمینگ ریزر  5","category":"دسته بندی  5","price":"50000"},{"img":"/Pictures/Product sample picture.png","name":"موس گیمینگ ریزر  6","category":"دسته بندی  6","price":"60000"},{"img":"/Pictures/Product sample picture.png","name":"موس گیمینگ ریزر  7","category":"دسته بندی  7","price":"70000"},{"img":"/Pictures/Product sample picture.png","name":"موس گیمینگ ریزر  8","category":"دسته بندی  8","price":"80000"},{"img":"/Pictures/Product sample picture.png","name":"موس گیمینگ ریزر  9","category":"دسته بندی  9","price":"90000"},{"img":"/Pictures/Product sample picture.png","name":"موس گیمینگ ریزر  10","category":"دسته بندی  10","price":"100000"},{"img":"/Pictures/Product sample picture.png","name":"موس گیمینگ ریزر  11","category":"دسته بندی  11","price":"110000"},{"img":"/Pictures/Product sample picture.png","name":"موس گیمینگ ریزر  12","category":"دسته بندی  12","price":"120000"},{"img":"/Pictures/Product sample picture.png","name":"موس گیمینگ ریزر  13","category":"دسته بندی  13","price":"130000"},{"img":"/Pictures/Product sample picture.png","name":"موس گیمینگ ریزر  14","category":"دسته بندی  14","price":"140000"},{"img":"/Pictures/Product sample picture.png","name":"موس گیمینگ ریزر  15","category":"دسته بندی  15","price":"150000"},{"img":"/Pictures/Product sample picture.png","name":"موس گیمینگ ریزر  16","category":"دسته بندی  16","price":"160000"},{"img":"/Pictures/Product sample picture.png","name":"موس گیمینگ ریزر  17","category":"دسته بندی  17","price":"170000"},{"img":"/Pictures/Product sample picture.png","name":"موس گیمینگ ریزر  18","category":"دسته بندی  18","price":"180000"},{"img":"/Pictures/Product sample picture.png","name":"موس گیمینگ ریزر  19","category":"دسته بندی  19","price":"190000"},{"img":"/Pictures/Product sample picture.png","name":"موس گیمینگ ریزر  20","category":"دسته بندی  20","price":"200000"},{"img":"/Pictures/Product sample picture.png","name":"موس گیمینگ ریزر  21","category":"دسته بندی  21","price":"210000"},{"img":"/Pictures/Product sample picture.png","name":"موس گیمینگ ریزر  22","category":"دسته بندی  22","price":"220000"},{"img":"/Pictures/Product sample picture.png","name":"موس گیمینگ ریزر  23","category":"دسته بندی  23","price":"230000"},{"img":"/Pictures/Product sample picture.png","name":"موس گیمینگ ریزر  24","category":"دسته بندی  24","price":"240000"},{"img":"/Pictures/Product sample picture.png","name":"موس گیمینگ ریزر  25","category":"دسته بندی  25","price":"250000"},{"img":"/Pictures/Product sample picture.png","name":"موس گیمینگ ریزر  26","category":"دسته بندی  26","price":"260000"},{"img":"/Pictures/Product sample picture.png","name":"موس گیمینگ ریزر  27","category":"دسته بندی  27","price":"270000"},{"img":"/Pictures/Product sample picture.png","name":"موس گیمینگ ریزر  28","category":"دسته بندی  28","price":"280000"},{"img":"/Pictures/Product sample picture.png","name":"موس گیمینگ ریزر  29","category":"دسته بندی  29","price":"290000"},{"img":"/Pictures/Product sample picture.png","name":"موس گیمینگ ریزر  30","category":"دسته بندی  30","price":"300000"},{"img":"/Pictures/Product sample picture.png","name":"موس گیمینگ ریزر  31","category":"دسته بندی  31","price":"310000"},{"img":"/Pictures/Product sample picture.png","name":"موس گیمینگ ریزر  32","category":"دسته بندی  32","price":"320000"},{"img":"/Pictures/Product sample picture.png","name":"موس گیمینگ ریزر  33","category":"دسته بندی  33","price":"330000"},{"img":"/Pictures/Product sample picture.png","name":"موس گیمینگ ریزر  34","category":"دسته بندی  34","price":"340000"},{"img":"/Pictures/Product sample picture.png","name":"موس گیمینگ ریزر  35","category":"دسته بندی  35","price":"350000"},{"img":"/Pictures/Product sample picture.png","name":"موس گیمینگ ریزر  36","category":"دسته بندی  36","price":"360000"},{"img":"/Pictures/Product sample picture.png","name":"موس گیمینگ ریزر  37","category":"دسته بندی  37","price":"370000"},{"img":"/Pictures/Product sample picture.png","name":"موس گیمینگ ریزر  38","category":"دسته بندی  38","price":"380000"},{"img":"/Pictures/Product sample picture.png","name":"موس گیمینگ ریزر  39","category":"دسته بندی  39","price":"390000"},{"img":"/Pictures/Product sample picture.png","name":"موس گیمینگ ریزر  40","category":"دسته بندی  40","price":"400000"}]
var mainBottomLowerProduct = document.querySelector(".main__bottom__lower__products")
window.onload = pagging

var select = document.querySelector("#item-per-page__select")
select.addEventListener('change',(event)=>{
  changeItemPerPage(event.target.value)
})