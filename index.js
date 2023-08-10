// firebase settings
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";

import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://wishlistappdb-default-rtdb.firebaseio.com",
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const wishListDB = ref(database, "wishListItems");

//my js code below
const inputEl = document.getElementById('wishinput-el');
const btnEl = document.getElementById('add-btn');
const unorderListEl = document.getElementById('list-el');

function cleanInputElement() {
    inputEl.value = "";
}

function createListItem(listObject) {

    let listValue = listObject[1];
    let listId = listObject[0];

    let newlistEl = document.createElement('li');
    newlistEl.textContent = listValue;

    newlistEl.addEventListener("click", function () {
        let dbIdOfItemToDelete = ref(database, `wishListItems/${listId}`);
        remove(dbIdOfItemToDelete);
    })
    unorderListEl.append(newlistEl);
}

function displayList(wishListArr) {
    let wishListli = "";
    for (let i = 0; i < wishListArr.length; i++) {

        createListItem(wishListArr[i]);
    }
}

onValue(wishListDB, function (snapshot) {

    unorderListEl.innerHTML = "";

    if (snapshot.exists()) {

        let wishListArr = Object.entries(snapshot.val());
        displayList(wishListArr);
    }
})


btnEl.addEventListener('click', function () {

    let userInput = inputEl.value;
    if (userInput)
        push(wishListDB, userInput); // this will insert items in DB

    cleanInputElement();
})

