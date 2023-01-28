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
        myUp.style.cssText = "visibility: visible;transition: 0.2s;"
    }
    else {
        myUp.style.cssText = "visibility: hidden;"
    }
})
//SCROLL TO TOP BUTTON
let myUp = document.querySelector(".toUp");
myUp.addEventListener("click", e => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
})
//END OF SCROLL

//SHOW PANIER ELEMENTS 
function showPanierItems(arr) {
    let itemNumber = document.querySelector(".item-added-number")
    itemNumber.innerHTML = `${myLocalArray.length}`
    document.querySelector(".added-item").innerHTML=""
    arr.forEach(el => {
        createShopElement(el);
    })
}
//END
//CHECK IF LOCAL STORAGE HAVE EXISTING ELEMENTS OR NOT & SHOW ELEMENTS//
let myLocalArray = [];

if (localStorage.shopList) {
    myLocalArray = JSON.parse(localStorage.shopList);
    showPanierItems(myLocalArray)

}
else {
    localStorage.shopList = []; 
}
let myItem = {
    name: "",
    id: "",
    image: ""
}
//ADD TO LOCAL STORAGE
function addToLocal(item) {
    let myLocalArray=JSON.parse(localStorage.shopList);
    myLocalArray.push(item);
    console.log(myLocalArray)
    localStorage.shopList = JSON.stringify(myLocalArray);
    showPanierItems(myLocalArray)
}
function removeFromLocal(el) {
    let myLocalArray=JSON.parse(localStorage.shopList);
    myLocalArray = myLocalArray.filter(e => {
        if (e.id != el) {
            return e
        }
    })
    localStorage.shopList = JSON.stringify(myLocalArray);
    showPanierItems(myLocalArray)

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
    myDescreption.appendChild(myTitle)
    myDescreption.appendChild(myId);
    myDiv.appendChild(myDescreption);
    myPanier.appendChild(myDiv);
    //Delete Button
    let myDelete = document.createElement("span")
    myDelete.classList.add("delete-item");
    let myCross = document.createElement("img")
    myCross.src = "ressource/icons/close.png"
    myCross.classList.add("icon");
    myCross.classList.add("delete-button");
    myDelete.appendChild(myCross)
    myPanier.appendChild(myDelete)
    // <span class="delete-item"><img src="ressource/icons/close.png" alt="" class="icon" style="filter: none;width: 20px;height: 20px;"></span>
    document.querySelector(".added-item").appendChild(myPanier);
}
//END

//ADD TO LOCAL STORAGE AND TO SHOP LIST
let addButton = document.querySelectorAll(".add-to-cart");
addButton.forEach(el => {
    el.addEventListener("click", e => {
        let myNewItem = myItem;
        myNewItem.name = el.parentElement.children[1].children[0].innerHTML;
        myNewItem.id = el.parentElement.children[1].getAttribute("data-product");
        myNewItem.image = el.parentElement.children[0].getAttribute("src");
        addToLocal(myNewItem);
        createShopElement(myNewItem)
    })
})

let myDeleteItem = document.querySelectorAll(".delete-item");
        myDeleteItem.forEach(el => {
            el.addEventListener("click", e => {
                let myFdeleteItem = el.parentElement.children[1].children[0].children[1].innerHTML
                el.parentElement.remove()
                removeFromLocal(myFdeleteItem);
                
            })
})