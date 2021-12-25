import "https://unpkg.com/@ui5/webcomponents-fiori@1.0.2/dist/ShellBar.js?module";
import "https://unpkg.com/@ui5/webcomponents@1.0.2/dist/Panel.js?module";
import "https://unpkg.com/@ui5/webcomponents@1.0.2/dist/Input.js?module";
import "https://unpkg.com/@ui5/webcomponents@1.0.2/dist/TextArea.js?module";
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
import "https://unpkg.com/@ui5/webcomponents-icons@1.0.2/dist/error.js?module";
import "https://unpkg.com/@ui5/webcomponents@1.0.2/dist/Avatar.js?module";




// All Events
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
const newRow = document.getElementById("new-row");
const onSubmitForm = document.getElementById("button-submit");
const db = window.localStorage;

// Table template for resetting the table
const tableTemplate = `<ui5-table-column slot="columns">
<span style="line-height: 1.4rem; font-weight: var(--fontweight1);">Ingredients</span>
</ui5-table-column>

<ui5-table-column slot="columns">
<span style="line-height: 1.4rem; font-weight: var(--fontweight1);">Measure</span>
</ui5-table-column>
`;

let keys = 1;


// update the list from the local storage
// this is called when the app is loaded and when the user clicks the load button
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
    }
    keys++;
};


// Create the dialog pop up with the data from the db

let createDialog = (id) => {
    let meal = JSON.parse(db.getItem(id));

    dialog.setAttribute("header-text", meal.name);
    document.getElementById("myImage").setAttribute("src", meal.image);
    document.getElementById("desc").innerHTML = (meal.description ? meal.description : "No description");
    const table = document.getElementById("table"); 
    let rows = table.getElementsByTagName("ui5-table-row");
    table.innerHTML = tableTemplate;
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

// Adding a recipe to the local storage
// either called from initial task and the API
// or called from the add button

let addMeal = (meal) => {
    const listItem = document.createElement("ui5-li");
    listItem.setAttribute("image", meal.image);
    listItem.setAttribute("icon", "hint");
    listItem.setAttribute("icon-end", true);
    listItem.setAttribute("description", meal.category + ", " + meal.region);
    listItem.setAttribute("data-category", meal.category);
    listItem.setAttribute("data-region", meal.region);
    listItem.setAttribute("data-name", meal.name);
    listItem.setAttribute("data-id", keys);
    listItem.innerHTML = `${meal.name}`;
    
    // Create an object with the values
    let item = {
        id: keys,
        name: meal.name,
        description: meal.instruction,
        image: meal.image,
        ingredients: meal.ingredients,
        category: meal.category,
        region: meal.region,
    };

    // Inserting it into the local storage(DB)
    db.setItem(keys++, JSON.stringify(item));
    list.appendChild(listItem);

};

// Loading the API data

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

// On first load of the app, check if the data is already in the db
// if not, load the API
// if yes, update the list from the db
const onInitialLoad = async () => {
    let isLoaded = JSON.parse(db.getItem(0));
    if (!isLoaded) {
        await loadAPI();
    } else {
        updateFromStorage();
    }
};

onInitialLoad();


// Open personal dialog pop up for the current item

list.addEventListener("click", (event) => {
    const element = event.target;
    createDialog(parseInt(element.getAttribute("data-id")));
    dialog.show();
});

// Close the pop up dialog

dialogCloser.addEventListener("click", () => {
    dialog.close();
});

// Filter the list by name

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

// Filter the list by Region

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

// Filter the list by Category

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

// Clear button, reset the page

clearButton.addEventListener("click", () => {
    list.innerHTML = "";
    db.clear();
    keys = 1;
});

// Hide button
// Hide the buttons, if you don't want to see them

hideButton.addEventListener("click", () => {
    hideButton.parentElement.style.display = "none";
});

// Load button
// Load the API data if the page has been cleared
// If there is a at least one item, you can't load the API

loadButton.addEventListener("click", () => {
    if (!JSON.parse(db.getItem(0))) {
        onInitialLoad();
    } else {
        alert("Data already loaded");
    }
});


// Add button
// Add a new item to the list

addButton.addEventListener("click", () => {
    dialogAdd.show();

});


// Close the Add dialog pop up

dialogCloserAdd.addEventListener("click", () => {
    dialogAdd.close();
});

// Adding a new row in the add pop up
// When you add ingredient, it will be added a new row to the table
// If the input is empty, error prompt will be shown

newRow.addEventListener("change", () => {
    const ingredients = document.getElementById("form-ingredient1");
    const measure = document.getElementById("form-measure1");
    const formTable = document.getElementById("form-table");

    if (measure.value === "" && ingredients.value === "") {
        ingredients.setAttribute("value-state", "None");
        measure.setAttribute("value-state", "None");
    } else if (ingredients.value === "") {
        ingredients.setAttribute("value-state", "Error");
    } else if (measure.value === "") {
        measure.setAttribute("value-state", "Error");
    } else {
        ingredients.setAttribute("value-state", "None");
        measure.setAttribute("value-state", "None");
    }

    if (ingredients.value !== "" && measure.value !== "") {
        let row = document.createElement("ui5-table-row");
        let cell1 = document.createElement("ui5-table-cell");
        let cell2 = document.createElement("ui5-table-cell");
        cell1.innerHTML = ingredients.value;
        cell2.innerHTML = measure.value;
        row.appendChild(cell1);
        row.appendChild(cell2);
        formTable.insertBefore(row, newRow);
        ingredients.value = "";
        measure.value = "";
    }
});

// When submit button is clicked,
// we check if the input values after valid
// if yes, the item is added to the list
// if not, error prompt will be shown to the appropriate input

onSubmitForm.addEventListener("click", () => {
    if (validateForm()) {
        dialogAdd.close();
        db.setItem(0, "true");
    }

});

// Validing the form
// Checking for valid inputs and send them to the DB

const validateForm = () => {
    const formName = document.getElementById("form-name");
    const formRegion = document.getElementById("form-region");
    const formCategory = document.getElementById("form-category");
    const formImage = document.getElementById("form-image");
    const formInstructions = document.getElementById("form-instructions");
    const formTable = document.getElementById("form-table");

    // If any of the field is empty, error prompt will be shown
    if (formName.value === "") {
        formName.setAttribute("value-state", "Error");
        return false;
    } else if (formRegion.value === "") {
        formRegion.setAttribute("value-state", "Error");
        return false;
    } else if (formCategory.value === "") {
        formCategory.setAttribute("value-state", "Error");
        return false;
    } else if (formImage.value === "") {
        formImage.setAttribute("value-state", "Error");
        return false;
    } else {
        formName.setAttribute("value-state", "None");
        formRegion.setAttribute("value-state", "None");
        formCategory.setAttribute("value-state", "None");
        formImage.setAttribute("value-state", "None");

        let rows = formTable.getElementsByTagName("ui5-table-row");

        let ingredients = [];

        for (let row of rows) {
            let cell1 = row.getElementsByTagName("ui5-table-cell")[0];
            let cell2 = row.getElementsByTagName("ui5-table-cell")[1];
            let temp = {
                "name": cell1.innerHTML,
                "measure": cell2.innerHTML
            };
            ingredients.push(temp);
        }

        ingredients.pop();

        // Object with the values from inputs
        let item = {
            name: formName.value,
            description: formInstructions.value,
            image: formImage.value,
            category: formCategory.value,
            region: formRegion.value,
            ingredients: ingredients,
        };


        // Adding the item to the list and DB
        addMeal(item);

        // Clearing the inputs
        formName.value = "";
        formRegion.value = "";
        formCategory.value = "";
        formImage.value = "";
        formInstructions.value = "";
        rows = formTable.getElementsByTagName("ui5-table-row");
        for(let i = rows.length - 2; i >= 0; i--) {
            rows[i].remove();
        }
        
        return true;
    }

}