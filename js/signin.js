const form = document.getElementById('form');
const email= document.getElementById('email');
const pass= document.getElementById('pass');
const button=document.getElementById('button');
console.log(email);

email.addEventListener('keyup',(event)=>{
    //event.preventDefault();
    checkMail();
});
pass.addEventListener('keyup',(event)=>{
    //event.preventDefault();
    checkPass();
});

const checkMail = () => {
    const emailValue = email.value.trim(); //removing whitespace from end and begining
    if (emailValue === ''){ //error if input is deleted(empty)
        setError(email,'ایمیل نمی‌تواند خالی باشد');
    }else if (ValidateEmail(emailValue)===false) { //email structure validation
        setError(email,'ایمیل نامعتبر');
    }
    else if(emailValue.length >255){//max 255 charachters
        setError(email,'ایمیل باید کمتر از ۲۵۵ کاراکتر باشد')
    } else{
        setSuccess(email)
    }


}
const checkPass=() => {
    const passValue=pass.value;
    if(passValue===''){
        setError(pass,"رمز عبور نمی‌تواند خالی باشد")
    }else if(passValue.length<8){
        setError(pass,"رمز عبور باید حداقل ۸ کاراکتر باشد")
    }
    else if(passValue.length>255){
        setError(pass,"رمز باید کمتر از ۲۵۵ کاراکتر باشد")
    }else if(passValue.search(/\d/) == -1){
        setError(pass,'رمز عبور باید شامل اعداد نیز باشد')
    }else if(passValue.search(/[a-zA-Z]/) == -1){
        setError(pass,'رمز عبور باید شامل حروف نیز باشد')
    }else{
        setSuccess(pass)
    }
}

const setError = (input, msg) => {
    const inputType = input.parentElement;
    console.log(inputType)
    const small = inputType.querySelector('small');
    console.log(small)
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


