import "https://unpkg.com/@ui5/webcomponents-fiori@1.0.2/dist/ShellBar.js?module";
import "https://unpkg.com/@ui5/webcomponents@1.0.2/dist/Panel.js?module";
import "https://unpkg.com/@ui5/webcomponents@1.0.2/dist/Input.js?module";
import "https://unpkg.com/@ui5/webcomponents@1.0.2/dist/List.js?module";
import "https://unpkg.com/@ui5/webcomponents@1.0.2/dist/Dialog.js?module";
import "https://unpkg.com/@ui5/webcomponents@1.0.2/dist/CustomListItem.js?module";
import "https://unpkg.com/@ui5/webcomponents@1.0.2/dist/StandardListItem.js?module";
import "https://unpkg.com/@ui5/webcomponents@1.0.2/dist/Table.js?module";
import "https://unpkg.com/@ui5/webcomponents@1.0.2/dist/TableColumn.js?module";
import "https://unpkg.com/@ui5/webcomponents@1.0.2/dist/TableRow.js?module";
import "https://unpkg.com/@ui5/webcomponents@1.0.2/dist/TableCell.js?module";
import "https://unpkg.com/@ui5/webcomponents-icons@1.0.2/dist/hint.js?module";
import "https://unpkg.com/@ui5/webcomponents-icons@1.0.2/dist/add.js?module";
import "https://unpkg.com/@ui5/webcomponents-icons@1.0.2/dist/delete.js?module";
import "https://unpkg.com/@ui5/webcomponents-icons@1.0.2/dist/refresh.js?module";
import "https://unpkg.com/@ui5/webcomponents-icons@1.0.2/dist/hide.js?module";
import "https://unpkg.com/@ui5/webcomponents@1.0.2/dist/Avatar.js?module";





const list = document.getElementById("myList");
const dialog = document.getElementById("hello-dialog");
const dialogAdd = document.getElementById("add-recipe");
const dialogCloser = document.getElementById("closeDialogButton");
const dialogCloserAdd = document.getElementById("closeDialogButton2");
const filterByName = document.getElementById("filter-by-name");
const filterByRegion = document.getElementById("filter-by-region");
const filterByCategory = document.getElementById("filter-by-category");
const clearButton = document.getElementById("clear");
const hideButton = document.getElementById("hide");
const loadButton = document.getElementById("load");
const addButton = document.getElementById("add");
const db = window.localStorage;


let keys = 1;
let id = 0;

let updateFromStorage = async () => {

    keys = db.length;
    for (let i = 1; i < keys; i++) {
        let key = db.key(i);
        let meal = JSON.parse(db.getItem(key));
        const listItem = document.createElement("ui5-li");
        listItem.setAttribute("image", meal.image);
        listItem.setAttribute("icon", "hint");
        listItem.setAttribute("icon-end", true);
        listItem.setAttribute("description", meal.category + ", " + meal.region);
        listItem.setAttribute("data-category", meal.category);
        listItem.setAttribute("data-region", meal.region);
        listItem.setAttribute("data-name", meal.name);
        listItem.setAttribute("data-id", meal.id);
        listItem.innerHTML = `${meal.name}`;
        list.appendChild(listItem);
        id = meal.id;
    }
};

let createDialog = (id) => {
    let meal = JSON.parse(db.getItem(id));
    dialog.setAttribute("header-text", meal.name);
    document.getElementById("myImage").setAttribute("src", meal.image);
    document.getElementById("desc").innerHTML = meal.description;
    const table = document.getElementById("table");
    for (let i = 0; i < meal.ingredients.length; i++) {
        let row = document.createElement("ui5-table-row");
        let cell1 = document.createElement("ui5-table-cell");
        let cell2 = document.createElement("ui5-table-cell");
        cell1.innerHTML = meal.ingredients[i].name;
        cell2.innerHTML = meal.ingredients[i].measure;
        row.appendChild(cell1);
        row.appendChild(cell2);
        table.appendChild(row);
    }
}


let addMeal = (meal) => {
    const listItem = document.createElement("ui5-li");
    listItem.setAttribute("image", meal.image);
    listItem.setAttribute("icon", "hint");
    listItem.setAttribute("icon-end", true);
    listItem.setAttribute("description", meal.category + ", " + meal.region);
    listItem.setAttribute("data-category", meal.category);
    listItem.setAttribute("data-region", meal.region);
    listItem.setAttribute("data-name", meal.name);
    listItem.setAttribute("data-id", id);
    listItem.innerHTML = `${meal.name}`;
    let item = {
        id: id++,
        name: meal.name,
        description: meal.instruction,
        image: meal.image,
        ingredients: meal.ingredients,
        category: meal.category,
        region: meal.region,
    };

    db.setItem(keys++, JSON.stringify(item));
    list.appendChild(listItem);

};

const loadAPI = async () => {
    const mealsResponse = await fetch(
        "https://api.npoint.io/51ed846bdd74ff693d7e"
    );
    const meals = await mealsResponse.json();

    for (const meal of meals.meals) {
        addMeal(meal);
    }

    // set that the data is stored in the db, no need to invoke the API again
    db.setItem(0, "true");

};

const onInitialLoad = async () => {
    let isLoaded = JSON.parse(db.getItem(0));
    console.log(isLoaded);
    if (!isLoaded) {
        await loadAPI();
    } else {
        updateFromStorage();
    }
};

onInitialLoad();

list.addEventListener("click", (event) => {
    const element = event.target;
    createDialog(parseInt(element.getAttribute("data-id")));
    dialog.show();
});

dialogCloser.addEventListener("click", () => {
    dialog.close();
});

filterByName.addEventListener("keyup", () => {

    const filter = filterByName.value.toUpperCase();
    const listItems = list.querySelectorAll("ui5-li");
    Array.prototype.forEach.call(listItems, (element) => {
        const name = element.getAttribute("data-name");
        if (name.toUpperCase().indexOf(filter) > -1 && (element.classList.contains("filter2") || element.classList.contains("filter3"))) {
            element.classList.remove("filter1");
        } else if (name.toUpperCase().indexOf(filter) > -1) {
            element.classList.remove("filter1");
            element.removeAttribute("hidden");
        } else {
            element.classList.add("filter1");
            element.setAttribute("hidden", true);
        }
    });

});

filterByRegion.addEventListener("keyup", () => {

    const filter = filterByRegion.value.toUpperCase();
    const listItems = list.querySelectorAll("ui5-li");
    Array.prototype.forEach.call(listItems, (element) => {
        const region = element.getAttribute("data-region");
        if (region.toUpperCase().indexOf(filter) > -1 && (element.classList.contains("filter1") || element.classList.contains("filter3"))) {
            element.classList.remove("filter2");
        } else if (region.toUpperCase().indexOf(filter) > -1) {
            element.classList.remove("filter2");
            element.removeAttribute("hidden");
        } else {
            element.classList.add("filter2");
            element.setAttribute("hidden", true);
        }
    });

});

filterByCategory.addEventListener("keyup", () => {

    const filter = filterByCategory.value.toUpperCase();
    const listItems = list.querySelectorAll("ui5-li");
    Array.prototype.forEach.call(listItems, (element) => {
        const category = element.getAttribute("data-category");
        if (category.toUpperCase().indexOf(filter) > -1 && (element.classList.contains("filter1") || element.classList.contains("filter2"))) {
            element.classList.remove("filter3");
        } else if (category.toUpperCase().indexOf(filter) > -1) {
            element.classList.remove("filter3");
            element.removeAttribute("hidden");
        } else {
            element.classList.add("filter3");
            element.setAttribute("hidden", true);
        }
    });

});

clearButton.addEventListener("click", () => {
    list.innerHTML = "";
    db.clear();
    keys = 0;
    id = 0;
});

hideButton.addEventListener("click", () => {
    hideButton.parentElement.style.display = "none";
});

loadButton.addEventListener("click", () => {
    if(!JSON.parse(db.getItem(0))){
        onInitialLoad();
    }
    else {
        alert("Data already loaded");
    }
});


addButton.addEventListener("click", () => {
    dialogAdd.show();

});


dialogCloserAdd.addEventListener("click", () => {
    dialogAdd.close();
});