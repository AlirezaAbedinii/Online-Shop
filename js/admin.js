var receiptBtn = document.querySelector(".tab__receipt__button")
var productBtn = document.querySelector(".tab__product__button")
var categoryBtn = document.querySelector(".tab__category__button")

var receiptContent = document.querySelector("#receipt__content")
var productContent = document.querySelector("#product__content")
var categoryContent = document.querySelector("#category__content")


receiptBtn.addEventListener('click',(event)=>{
    console.log("sth clicked")
    productContent.style.display = "none"
    categoryContent.style.display = "none"
    receiptContent.style.display = "block"
    productBtn.style.backgroundColor = "rgb(247, 247, 247)"
    categoryBtn.style.backgroundColor = "rgb(247, 247, 247)"
    receiptBtn.style.backgroundColor = "rgb(238, 238, 238)"
})

productBtn.addEventListener('click',(event)=>{
    console.log("sth clicked")
    productContent.style.display = "block"
    categoryContent.style.display = "none"
    receiptContent.style.display = "none"

    productBtn.style.backgroundColor = "rgb(238, 238, 238)"
    categoryBtn.style.backgroundColor = "rgb(247, 247, 247)"
    receiptBtn.style.backgroundColor = "rgb(247, 247, 247)"
})

categoryBtn.addEventListener('click',(event)=>{
    console.log("sth clicked")
    productContent.style.display = "none"
    categoryContent.style.display = "block"
    receiptContent.style.display = "none"

    productBtn.style.backgroundColor = "rgb(247, 247, 247)"
    categoryBtn.style.backgroundColor = "rgb(238, 238, 238)"
    receiptBtn.style.backgroundColor = "rgb(247, 247, 247)"
})