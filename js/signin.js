//content of form box
const form = document.getElementById('form');
//content of mail box
const email= document.getElementById('email');
//content of pass box
const pass= document.getElementById('pass');
//sign-in button
const button=document.getElementById('button');
console.log(email);
//list of users and passoword, defined for phase2
const user_pass_list=[{mail:"salva_k4@yahoo.com",password:"12345678a"},{mail:"a@b.c",password:"12345678b"},{email:"a@b.d",password:"12345678c"}];

//keyup=>check only when typing
email.addEventListener('keyup',(event)=>{
    //event.preventDefault();
    checkMail();
});
pass.addEventListener('keyup',(event)=>{
    //event.preventDefault();
    checkPass();
});

//checks mail box content
const checkMail = () => {
    //boolean, determines if password is valid or not
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
//cheching the password input box content
const checkPass=() => {
    //bollean, determines if password is valid or not at the end 
    let check=false;
    //value of the password box
    const passValue=pass.value;
    //check for empty box - deteleted after writing
    if(passValue===''){
        setError(pass,"رمز عبور نمی‌تواند خالی باشد");
    //check for length
    }else if(passValue.length<8){
        setError(pass,"رمز عبور باید حداقل ۸ کاراکتر باشد");
    }
    //check for length
    else if(passValue.length>255){
        setError(pass,"رمز باید کمتر از ۲۵۵ کاراکتر باشد");
    //password doesnt contain any numbers **persian numberas are considered charachters
    }else if(passValue.search(/\d/) == -1){
        setError(pass,'رمز عبور باید شامل اعداد نیز باشد');
    //pass doesnt contain any charachtes
    }else if(passValue.search(/[a-zA-Z]/) == -1){
        setError(pass,'رمز عبور باید شامل حروف نیز باشد');
    }else{
        setSuccess(pass);
        check=true;
    }
    return check;
}

//sets state to erroneous => red border and small message
const setError = (input, msg) => {
    const inputType = input.parentElement;
    console.log(inputType);
    const small = inputType.querySelector('small');
    console.log(small);
    //importanttt!!! changes all classes to main__form__mail.error
    inputType.className = 'main__form__mail error';
    small.innerText = msg;
    console.log("err");

}

//function vhanges state to successful=>green border and now error message
const setSuccess = (input) => {
    const inputType = input.parentElement;
    const small = inputType.querySelector('small');
    inputType.className = 'main__form__mail success';
}

//function checks email format with regex 
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
    is_valid_mail=checkMail();
    is_valid_pass=checkPass();
    passValue=pass.value;
    mailValue=email.value.trim();
    let user_pass_pair=user_pass_list.findIndex(user_pass_pair=>user_pass_pair.mail==mailValue && user_pass_pair.password==passValue);
    modal_msg=document.getElementById('modal__msg');
    //if both mail and pass are invalid
    if(is_valid_mail==false && is_valid_pass==false){
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
    //if user name and passowrd arent in the list
    else if(user_pass_pair==-1){
        modal_msg.innerHTML='کاربر وجود ندارد';
    }
    //username and password are correct and defined
    else{
        modal_msg.innerHTML='ورود موفق';
    }
    
}

