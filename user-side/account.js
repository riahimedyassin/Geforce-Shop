
let myBurgerShow=document.querySelector(".burger-show")
let myBurgerHide=document.querySelector(".burger-toggle");
myBurgerHide.addEventListener("click",e=> {
    myBurgerHide.parentElement.classList.add("hideAside");
    myBurgerShow.parentElement.classList.add(("showBurger"));
    document.querySelector("main").style.cssText="width:95%"
})
myBurgerShow.addEventListener("click",e=> {
    myBurgerHide.parentElement.classList.remove("hideAside");
    myBurgerShow.parentElement.classList.remove(("showBurger"));
    document.querySelector("main").style.cssText="width:80%"
})

