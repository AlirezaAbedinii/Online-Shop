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

function load_products(){
    fetch(`${window.location.origin}/admin`,{
        method: "POST",
        body: JSON.stringify({"command": "get_products"}),
        headers: new Headers({"content-type" : "application/json"}),
        cache: "no-cache"
    })
    .then(function (response){
        if(response.status !== 200){
            console.log(`bad request: ${response.status}`)
            return
        }
        response.json().then(function (data){
            products = data.message
            var productContentLower = document.querySelector(".product__content__lower")
            totalProducts = products.length
            for(var i=0; i<totalProducts; i++){
                var aug_product = createAugmentedProducts(products[i])
                productContentLower.appendChild(aug_product)
            }                
        })
    })
}


function createAugmentedProducts (data){
    var augmentedProduct = document.createElement("div")
    augmentedProduct.className = "augmented-product"

    var sold_btn = document.createElement("button")
    sold_btn.className = "product__sold"
    sold_btn.textContent = data.sold_number

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
    img.src = data.image

    var productDetailsName = document.createElement("p")
    productDetailsName.innerHTML = data.name
    productDetailsName.className = "product__details--name"

    var productDetailsCategory = document.createElement("p")
    productDetailsCategory.innerHTML = data.category
    productDetailsCategory.className = "product__details--category"

    var productPrice = document.createElement("p")
    productPrice.innerHTML = `${data.price} تومان`
    productPrice.className = "product__price"

    var productButton = document.createElement("button")
    productButton.textContent = "ویرایش محصول"
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

    augmentedProduct.appendChild(product)
    augmentedProduct.appendChild(sold_btn)

    return augmentedProduct

}

window.onload = load_products