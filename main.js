//CHECK IF LOCAL STORAGE HAVE EXISTING ELEMENTS OR NOT & SHOW ELEMENTS//

let myLocalArray = [];

if (localStorage.shopList) {
    myLocalArray = JSON.parse(localStorage.shopList);
    showPanierItems(myLocalArray)

}
else {
    localStorage.shopList = [];
}



//HEADER TO LOGIN 
let myAccount = document.querySelector(".account");
myAccount.addEventListener("click", e => {
    location.href = "user-side/login.html"
})




//DROP LISTS EFFECT
function toggleList(key, list) {
    let myKey = document.querySelector(`.${key}`);
    myKey.classList.remove("showList")
    myKey.addEventListener("click", e => {
        let myList = document.querySelector(`.${list}`)
        myList.classList.toggle("showList");
    })
}

toggleList('all-products', 'all-products-list');
toggleList('panier', 'panier-list')
//END OF EFFECT





//SCROLL TO UP VISIBILITY
window.addEventListener("scroll", e => {
    if (window.scrollY > 500) {
        myUp.style.cssText = "visibility: visible;transition: 0.2s;";
    }
    else {
        myUp.style.cssText = "visibility: hidden;"
        myUp.classList.remove("flipToUp")
    }
})
//SCROLL TO TOP BUTTON
let myUp = document.querySelector(".toUp");
myUp.addEventListener("click", e => {
    myUp.classList.add("flipToUp")
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
})
//END OF SCROLL

//SHOW PANIER ELEMENTS 
function showPanierItems(arr) {
    let itemNumber = document.querySelector(".item-added-number")
    document.querySelector(".added-item").innerHTML = ""
    arr.forEach(el => {
        createShopElement(el);
    })
    itemNumber.innerHTML = `${myLocalArray.length}`;
    
}
//END
let myItem = {
    name: "",
    id: "",
    image: "",
    price: "",
    mark:"",
    type:"",
}
//ADD TO LOCAL STORAGE
function addToLocal(item) {
    let myLocalArray = JSON.parse(localStorage.shopList)
    myLocalArray.push(item);
    console.log(myLocalArray)
    localStorage.shopList = JSON.stringify(myLocalArray);
    showPanierItems(myLocalArray);
    document.querySelector(".item-added-number").innerHTML = `${myLocalArray.length}`
}
function removeFromLocal(el) {
    let myLocalArray = JSON.parse(localStorage.shopList);
    myLocalArray = myLocalArray.filter(e => {
        if (e.id != el) {
            return e
        }
    })
    localStorage.shopList = JSON.stringify(myLocalArray);
    showPanierItems(myLocalArray);
    document.querySelector(".item-added-number").innerHTML = `${myLocalArray.length}`

}
//CREATE PANIER ELEMENT 
function createShopElement(el) {
    let myPanier = document.createElement("div")
    myPanier.classList.add("panier-item");
    myPanier.classList.add("d-flex")
    let myImage = document.createElement("img");
    myImage.src = `${el.image}`;
    myImage.classList.add("panier-item-image");
    myPanier.appendChild(myImage);
    let myDiv = document.createElement("div");
    myDiv.classList.add("d-flex");
    myDiv.classList.add("align-items-center")
    myDiv.classList.add("justify-content-between")
    let myDescreption = document.createElement("div");
    let myTitle = document.createElement("h3")
    myTitle.appendChild(document.createTextNode(`${el.name}`));
    let myId = document.createElement("p");
    myId.appendChild(document.createTextNode(`${el.id}`))
    myDescreption.appendChild(myTitle);

    myDescreption.appendChild(document.createTextNode("Reference :"))
    myDescreption.appendChild(myId);
    //Price 
    let myPrice = document.createElement("div");
    myPrice.appendChild(document.createTextNode(`Price : ${el.price}`));
    myPrice.style.cssText = "font-weight:bold;color:red"
    myDescreption.appendChild(myPrice)

    myDiv.appendChild(myDescreption);
    myPanier.appendChild(myDiv);
    //Delete Button
    let myDelete = document.createElement("span")
    myDelete.classList.add("delete-item");
    let myCross = document.createElement("img")
    myCross.src = "ressource/icons/close.png"
    myCross.classList.add("icon");
    myCross.classList.add("delete-button");
    myCross.classList.add("delete-item")
    myDelete.appendChild(myCross)
    myPanier.appendChild(myDelete);
    myPanier.style.cssText = "font-family:'Poppins'"
    // <span class="delete-item"><img src="ressource/icons/close.png" alt="" class="icon" style="filter: none;width: 20px;height: 20px;"></span>
    document.querySelector(".added-item").appendChild(myPanier);
    removeItemShop()
    
}
//END

//ADD TO LOCAL STORAGE AND TO SHOP LIST
let addButton = document.querySelectorAll(".add-to-cart");


addButton.forEach(el => {
    el.addEventListener("click", e => {
        let myNewItem = myItem;
        myNewItem.name = el.parentElement.getAttribute("data-name");
        myNewItem.id = el.parentElement.getAttribute("data-product");
        myNewItem.image = el.parentElement.getAttribute("data-image");
        myNewItem.price = el.parentElement.getAttribute("data-price"); 
        console.log(myNewItem)
        addToLocal(myNewItem);
    })
})
//REMOVE FROM SHOPPING LIST AND LOCAL STORAGE
function removeItemShop() {
    let myDeleteItem = document.querySelectorAll(".delete-item");
    myDeleteItem.forEach(el => {
        el.addEventListener("click", e => {
            let myFdeleteItem = el.parentElement.children[1].children[0].children[1].innerHTML;
            console.log("test")
            removeFromLocal(myFdeleteItem);
            el.parentElement.remove()
        })
    })
}

//DISPLAY HEADER
let myBurger = document.querySelector(".toggle-header");
myBurger.addEventListener("click", e => {
    document.querySelector("header").classList.toggle("displayHeader")
    document.querySelector(".header-elemnts").classList.toggle("displayHeaderElements")
})
//PROMO CARD SHOW
let myPromoCard=document.querySelectorAll(".promo-card"); 
myPromoCard.forEach(el=> {
    el.addEventListener("click" ,e=> {
        el.classList.toggle("showPromo")
    })
})