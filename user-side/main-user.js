let mySign=document.querySelector(".sign-up-button");
mySign.addEventListener("click",e=>{
    mySign.parentElement.classList.toggle("showSignUp");
    let mySignAnimation=document.querySelector(".sign-in");
    mySign.innerHTML=="Sign-up" ? mySign.innerHTML="Sign-in":mySign.innerHTML="Sign-up";
    mySignAnimation.classList.toggle("moveSignIn")
});
