const form = document.getElementById('form');
const email= document.getElementById('email');
const pass= document.getElementById('pass');
const button=document.getElementById('button');
console.log(email);

form.addEventListener('keyup',(event)=>{
    //event.preventDefault();
    checkInputs();
});

const checkInputs = () => {
    const emailValue = email.value.trim(); //removing whitespace from end and begining
    if (emailValue === ''){
        setError(email,'ایمیل را وارد کنید');
    }else if (ValidateEmail(emailValue)===false) {
        setError(email,'ایمیل نامعتبر');
    }
    else if(emailValue.length >255){
        setError(email,'ایمیل باید کمتر از ۲۵۵ کاراکتر باشد')
    } else{
        setSuccess(email)
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
