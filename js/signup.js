const fname = document.getElementById('name');
const lname = document.getElementById('lname');
const email= document.getElementById('email');
const pass= document.getElementById('pass');
const address=document.getElementById('address');


email.addEventListener('keyup',(event)=>{
    //event.preventDefault();
    checkMail();
});
pass.addEventListener('keyup',(event)=>{
    //event.preventDefault();
    checkPass();
});
fname.addEventListener('keyup',(event)=>{
    //event.preventDefault();
    checkName();
});
lname.addEventListener('keyup',(event)=>{
    //event.preventDefault();
    checkLName();
});
address.addEventListener('keyup',(event)=>{
    //event.preventDefault();
    checkAddress();
});

const checkMail = () => {
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
    }
}
const checkPass=() => {
    const passValue=pass.value;
    if(passValue===''){
        setError(pass,"رمز عبور نمی‌تواند خالی باشد");
    }else if(passValue.length<8){
        setError(pass,"رمز عبور باید حداقل ۸ کاراکتر باشد");
    }
    else if(passValue.length>255){
        setError(pass,"رمز باید کمتر از ۲۵۵ کاراکتر باشد");
    }else if(passValue.search(/\d/) == -1){
        setError(pass,'رمز عبور باید شامل اعداد نیز باشد');
    }else if(passValue.search(/[a-zA-Z]/) == -1){
        setError(pass,'رمز عبور باید شامل حروف نیز باشد');
    }else{
        setSuccess(pass);
    }
}
const checkName = () => {
    const nameValue = fname.value.trim(); //removing whitespace from end and begining
    if (nameValue === ''){ //error if input is deleted(empty)
        setError(fname,'نام نمی‌تواند خالی باشد');
    }
    else if(nameValue.length >255){//max 255 charachters
        setError(fname,'نام باید کمتر از ۲۵۵ کاراکتر باشد');
    } else{
        setSuccess(fname);
    }
}

const checkLName = () => {
    const lnameValue = lname.value.trim(); //removing whitespace from end and begining
    if (lnameValue === ''){ //error if input is deleted(empty)
        setError(lname,'نام خوانوادگی نمی‌تواند خالی باشد');
    }
    else if(lnameValue.length >255){//max 255 charachters
        setError(lname,'نام خوانوادگی باید کمتر از ۲۵۵ کاراکتر باشد');
    } else{
        setSuccess(lname);
    }
}

const checkAddress = () => {
    const addressValue = address.value; 
    if (addressValue === ''){ //error if input is deleted(empty)
        setError(address,'آدرس نمی‌تواند خالی باشد');
    }
    else if(addressValue.length >1000){//max 1000 charachters
        setError(address,'آدرس باید کمتر از ۱۰۰۰ کاراکتر باشد');
    } else{
        setSuccess(address);
    }
}


const setError = (input, msg) => {
    const inputType = input.parentElement;
    const small = inputType.querySelector('small');
    inputType.className = 'main__form__mail error';
    small.innerText = msg;
    console.log("err");

}

const setSuccess = (input) => {
    const inputType = input.parentElement;
    const small = inputType.querySelector('small');
    inputType.className = 'main__form__mail success';
}
function ValidateEmail(mail) 
{
 if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
  {
    return (true);
  }
    //alert("You have entered an invalid email address!")
    return (false);
}


