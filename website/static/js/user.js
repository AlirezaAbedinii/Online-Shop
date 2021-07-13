function change_tab(){
    if(currentTab === "profile"){
        profileContent.style.display = "none";
        receiptContent.style.display = "block";

        profileBtn.style.backgroundColor = "rgb(247, 247, 247)";
        receiptBtn.style.backgroundColor = "rgb(238, 238, 238)";
        currentTab = "receipt";
    }
    else{
        profileContent.style.display = "block";
        receiptContent.style.display = "none";

        profileBtn.style.backgroundColor = "rgb(238, 238, 238)";
        receiptBtn.style.backgroundColor = "rgb(247, 247, 247)";
        currentTab = "profile";
    }
    
}

console.log("Hello");

var receiptBtn = document.querySelector(".receipt__button");
var profileBtn = document.querySelector(".profile__button");

var receiptContent = document.querySelector("#receipt__content");
var profileContent = document.querySelector("#profile__content");

var receiptHeader = document.querySelector("#receipt__header");
var profileHeader = document.querySelector("#profile__header");

var currentTab = "receipt";
window.onload = change_tab;


receiptBtn.addEventListener('click', (event)=>{
    if(currentTab === "profile"){change_tab();}
});
profileBtn.addEventListener('click', (event)=>{if(currentTab==="receipt"){change_tab()}});

//profile validation
//first name box content
const fname = document.getElementById("fname");
console.log(fname);
//last name box content
const lname = document.getElementById("lname");
//pass box content
const pass= document.getElementById("pass");
//adrress box content
const address=document.getElementById("address");


//check pass content when user is typing
pass.addEventListener('keyup',(event)=>{
    //event.preventDefault();
    checkPass();
});
//check first name content when user is typing
fname.addEventListener('keyup',(event)=>{
    //event.preventDefault();
    checkName();
});
//check last name content when user is typing
lname.addEventListener('keyup',(event)=>{
    //event.preventDefault();
    checkLName();
});
//check address content when user is typing
address.addEventListener('keyup',(event)=>{
    //event.preventDefault();
    checkAddress();
});

//checks pass  box content
const checkPass=() => {
    //boolean, specifies the correctness
    let check=false;
    //box contnet value
    const passValue=pass.value;
    //check for empty
    if(passValue===''){
        setError(pass,"رمز عبور نمی‌تواند خالی باشد");
    //check for min length
    }else if(passValue.length<8){
        setError(pass,"رمز عبور باید حداقل ۸ کاراکتر باشد");
    }
    //check foprm max length
    else if(passValue.length>255){
        setError(pass,"رمز باید کمتر از ۲۵۵ کاراکتر باشد");
    }
    //chek if  itcontains  numbers
    else if(passValue.search(/\d/) == -1){
        setError(pass,'رمز عبور باید شامل اعداد نیز باشد');
    }
    //checkif  it  contains charachters
    else if(passValue.search(/[a-zA-Z]/) == -1){
        setError(pass,'رمز عبور باید شامل حروف نیز باشد');
    }else{
        setSuccess(pass);
        check=true;
    }
    return check;
}

//checks  the  name box content
const checkName = () => {
    //boolean, defines rhe  correctnes at  th end
    let check=false;
    const nameValue = fname.value.trim(); //removing whitespace from end and begining
    if (nameValue === ''){ //error if input is deleted(empty)
        setErrorName(fname,'نام نمی‌تواند خالی باشد');
    }
    else if(nameValue.length >255){//max 255 charachters
        setErrorName(fname,'نام باید کمتر از ۲۵۵ کاراکتر باشد');
    } else{
        setSuccessName(fname);
        check=true;
    }
    return check;
}

//checks lastname box content
const checkLName = () => {
    //boolean, defnes the coorecteness at the end
    let check=false;
    const lnameValue = lname.value.trim(); //removing whitespace from end and begining
    if (lnameValue === ''){ //error if input is deleted(empty)
        setErrorLName(lname,'نام خوانوادگی نمی‌تواند خالی باشد');
    }
    else if(lnameValue.length >255){//max 255 charachters
        setErrorLName(lname,'نام خوانوادگی باید کمتر از ۲۵۵ کاراکتر باشد');
    } else{
        setSuccessLName(lname);
        check=true;
    }
    return check;
}

//checks address bo  content
const checkAddress = () => {
    //boolean, defines correctness at the end
    let check=false;
    //address bax value without beginning or ending spaces
    const addressValue = address.value; 
    if (addressValue === ''){ //error if input is deleted(empty)
        setError(address,'آدرس نمی‌تواند خالی باشد');
    }
    else if(addressValue.length >1000){//max 1000 charachters
        setError(address,'آدرس باید کمتر از ۱۰۰۰ کاراکتر باشد');
    } else{
        setSuccess(address);
        check=true;
    }
    return check;
}

//change state to erroneous=>red border and small message
const setError = (input, msg) => {
    const inputType = input.parentElement;
    const small = inputType.querySelector('small');
    //importanttt! changes all classes to main__from__mail error
    inputType.className = 'profile__password error';
    small.innerText = msg;
    console.log("err");

}
const setErrorName = (input, msg) => {
    const inputType = input.parentElement;
    const small = inputType.querySelector('small');
    //importanttt! changes all classes to main__from__mail error
    inputType.className = 'profile__fname error';
    small.innerText = msg;
    console.log("err");

}
const setErrorLName = (input, msg) => {
    const inputType = input.parentElement;
    const small = document.getElementById('lname_small');
    //importanttt! changes all classes to main__from__mail error
    inputType.className = 'profile__lname error';
    small.innerText = msg;
    console.log("err");

}

//sets state to correct=> green border and no message
const setSuccess = (input) => {
    const inputType = input.parentElement;
    const small = inputType.querySelector('small');
    inputType.className = 'profile__password success';
}
//sets state to correct=> green border and no message
const setSuccessName = (input) => {
    const inputType = input.parentElement;
    const small = inputType.querySelector('small');
    inputType.className = 'profile__fname success';
}
const setSuccessLName = (input) => {
    const inputType = input.parentElement;
    const small = inputType.querySelector('small');
    inputType.className = 'profile__lname success';
}


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
//the edit button
var btn = document.getElementById("edit");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal and display specified message
btn.onclick = function() {
  modal.style.display = "block";
  setMessage();
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
//vhanging the message displayed in modal
function setMessage(){
    //correctness of boxes
    is_valid_pass=checkPass();
    is_valid_name=checkName();
    is_valid_lname=checkLName();
    is_valid_address=checkAddress();

    //finding number of falses
    const validation_arr=[is_valid_pass,is_valid_name,is_valid_lname,is_valid_address];
    let false_num=0;
    for(let i=0;i<validation_arr.length;i++){
        if(validation_arr[i]===false){
            false_num++;
        }
    }

    //value of the boxes
    passValue=pass.value;
    nameValue=fname.value.trim();
    lnameValue=lname.value.trim();
    addressValue=address.value;

    modal_msg=document.getElementById('modal__msg');
    //more than two boxes or wrong
    if(false_num>1){
        modal_msg.innerHTML='فیلدهای مشخص شده را کامل کنید';
    }
    //if only pass is invalid
    else if(is_valid_pass==false){
        modal_msg.innerHTML='فیلد رمز عبور را کامل کنید'; 
    }
    //if only name is invalid
    else if(is_valid_name==false){
         modal_msg.innerHTML='فیلد نام را کامل کنید'; 
    }
    //if only pass is invalid
    else if(is_valid_lname==false){
        modal_msg.innerHTML='فیلد نام خوانوادگی را کامل کنید'; 
    }
    //if only pass is invalid
    else if(is_valid_address==false){
        modal_msg.innerHTML='فیلد آدرس را کامل کنید'; 
    }
    //username and password are correct and defined
    else{
        modal_msg.innerHTML='ویرایش با موفقیت انجام شد';
    }
    
}
