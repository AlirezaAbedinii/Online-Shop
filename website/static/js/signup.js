//first name box content
const fname = document.getElementById('name');
//last name box content
const lname = document.getElementById('lname');
//email box content
const email= document.getElementById('email');
//pass box content
const pass= document.getElementById('pass');
//adrress box content
const address=document.getElementById('address');
//list of users and passoword, defined for phase2
const user_pass_list=[{mail:"salva_k4@yahoo.com",password:"12345678a"},{mail:"a@b.c",password:"12345678b"},{email:"a@b.d",password:"12345678c"}];

//check mail content when user is typing
email.addEventListener('keyup',(event)=>{
    //event.preventDefault();
    checkMail();
});
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

//checks mail box content
const checkMail = () => {
    //boolean,return the correcness of box
    let check=false;
    const emailValue = email.value.trim(); //removing whitespace from end and begining
    if (emailValue === ''){ //error if input is deleted(empty)
        setError(email,'ایمیل نمی‌تواند خالی باشد');
    }else if (ValidateEmail(emailValue)===false) { //email structure validation
        setError(email,'ایمیل نامعتبر');
    }
    else if(emailValue.length >255){//max 255 charachters
        setError(email,'ایمیل باید کمتر از ۲۵۵ کاراکتر باشد');
    } else{
        setSuccess(email);
        check=true;
    }
    return check;
}
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
        setError(fname,'نام نمی‌تواند خالی باشد');
    }
    else if(nameValue.length >255){//max 255 charachters
        setError(fname,'نام باید کمتر از ۲۵۵ کاراکتر باشد');
    } else{
        setSuccess(fname);
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
        setError(lname,'نام خوانوادگی نمی‌تواند خالی باشد');
    }
    else if(lnameValue.length >255){//max 255 charachters
        setError(lname,'نام خوانوادگی باید کمتر از ۲۵۵ کاراکتر باشد');
    } else{
        setSuccess(lname);
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
        setErrorAddress(address,'آدرس نمی‌تواند خالی باشد');
    }
    else if(addressValue.length >1000){//max 1000 charachters
        setErrorAddress(address,'آدرس باید کمتر از ۱۰۰۰ کاراکتر باشد');
    } else{
        setSuccessAddress(address,"success");
        check=true;
    }
    return check;
}

//change state to erroneous=>red border and small message
const setError = (input, msg) => {
    const inputType = input.parentElement;
    const small = inputType.querySelector('small');
    //importanttt! changes all classes to main__from__mail error
    inputType.className = 'main__form__mail error';
    small.innerText = msg;
    console.log("err");

}
const setErrorAddress = (input, msg) => {
    const inputType = input.parentElement;
    const small = inputType.querySelector('small');
    //importanttt! changes all classes to main__from__mail error
    inputType.className = 'main__form__address error';
    small.innerText = msg;
    console.log("err");

}

//sets state to correct=> green border and no message
const setSuccess = (input) => {
    const inputType = input.parentElement;
    const small = inputType.querySelector('small');
    inputType.className = 'main__form__mail success';
}
const setSuccessAddress = (input,msg) => {
    const inputType = input.parentElement;
    const small = inputType.querySelector('small');
    inputType.className = 'main__form__address success';
    small.innerText = msg;
}

//checks email format by comparing tho regex
function ValidateEmail(mail) 
{
 if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
  {
    return (true);
  }
    //alert("You have entered an invalid email address!")
    return (false);
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
//the sign up button
var btn = document.getElementById("button");

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
    is_valid_mail=checkMail();
    is_valid_pass=checkPass();
    is_valid_name=checkName();
    is_valid_lname=checkLName();
    is_valid_address=checkAddress();

    //finding number of falses
    const validation_arr=[is_valid_mail,is_valid_pass,is_valid_name,is_valid_lname,is_valid_address];
    let false_num=0;
    for(let i=0;i<validation_arr.length;i++){
        if(validation_arr[i]===false){
            false_num++;
        }
    }

    //value of the boxes
    passValue=pass.value;
    mailValue=email.value.trim();
    nameValue=fname.value.trim();
    lnameValue=lname.value.trim();
    addressValue=address.value;

    //if username doesnt alrady exist, dublicate_user=-1
    let duplicate_user=user_pass_list.findIndex(duplicate_user=>duplicate_user.mail==mailValue);
    modal_msg=document.getElementById('modal__msg');
    //more than two boxes or wrong
    if(false_num>1){
        modal_msg.innerHTML='فیلدهای مشخص شده را کامل کنید';
    }
    //if only mail is invalid
    else if(is_valid_mail==false){
        modal_msg.innerHTML='فیلد ایمیل را کامل کنید'; 
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
    //if user name and passowrd arent in the list
    else if(duplicate_user>-1){
        modal_msg.innerHTML='ایمیل قبلا ثبت شده‌است';
    }
    //username and password are correct and defined
    else{
        modal_msg.innerHTML='ثبت نام موفق';
    }
    
}

