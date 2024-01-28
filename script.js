import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const Btn = document.querySelector("#btn");
const Search = document.querySelector("#Search");
const list = document.querySelector("#list");




const appSettings = {
    databaseURL : "https://playground-b23e8-default-rtdb.europe-west1.firebasedatabase.app/"
}




const app = initializeApp(appSettings);
const Database = getDatabase(app);

const ItemsinDB = ref(Database, "Items") //Referencing Items to Database for adding


Btn.addEventListener("click", function(){
    let inputValue = Search.value;
    
    
    clearSearch();
    
    
    // AppendLi(inputValue);

    push(ItemsinDB, inputValue);
    
    console.log(`${inputValue} was added to database`)
})



Btn.addEventListener("click", function(){
    let Li = document.createElement("li");
    
    // list.appendChild(Li);
})

onValue(ItemsinDB , function(snaphshot){

    if(snaphshot.exists()){
        let ValArray = Object.entries(snaphshot.val());
    

    ClearShopList();

    for(let i =0; i<ValArray.length; i++){
        let CurrentItem = ValArray[i];
        let CurrentItemID = CurrentItem[0];
        let CurrentItemValue = CurrentItem[1];
        AppendLi(CurrentItem);
    }

        
    } else {
        list
        list.innerHTML = "No items added yet..."
        list.style.color = "white";
        list.style.fontFamily = "'Sixtyfour', sans-serif";
        list.fontSize = "2px";
    }
    
})



function clearSearch(){
    Search.value = '';

}

function AppendLi(Item){

    let itemID = Item[0];
    let itemValue = Item[1];
    const Li = document.createElement("li");

    Li.style.color = "black";
    Li.style.fontFamily = "'Sixtyfour', sans-serif";
    Li.style.fontSize = "15px"

    Li.innerText = Item[1];
    list.appendChild(Li);

    Li.addEventListener("dblclick", function(){
        let ExactLocItem = ref(Database, `Items/${itemID}`)

        remove(ExactLocItem)
    })


}

function ClearShopList(){
    list.innerHTML = "";
}