function change_tab(){
    if(currentTab === "profile"){
        profileContent.style.display = "none"
        receiptContent.style.display = "block"

        profileBtn.style.backgroundColor = "rgb(247, 247, 247)"
        receiptBtn.style.backgroundColor = "rgb(238, 238, 238)"
        currentTab = "receipt"
    }
    else{
        profileContent.style.display = "block"
        receiptContent.style.display = "none"

        profileBtn.style.backgroundColor = "rgb(238, 238, 238)"
        receiptBtn.style.backgroundColor = "rgb(247, 247, 247)"
        currentTab = "profile"
    }
    
}

console.log("Hello")

var receiptBtn = document.querySelector(".receipt__button")
var profileBtn = document.querySelector(".profile__button")

var receiptContent = document.querySelector("#receipt__content")
var profileContent = document.querySelector("#profile__content")

var receiptHeader = document.querySelector("#receipt__header")
var profileHeader = document.querySelector("#profile__header")

var currentTab = "receipt"
window.onload = change_tab


receiptBtn.addEventListener('click', (event)=>{
    if(currentTab === "profile"){change_tab()}
})
profileBtn.addEventListener('click', (event)=>{if(currentTab==="receipt"){change_tab()}})
