const form_element = document.querySelector('.app-form'); //Form element
const list_element  = document.querySelector('.app-list'); //List element 

let list = []; //Init list
let counter = 0; //Init counter

const loadList = (list) => { //Takes in the list from localStorage

    let placehol = document.querySelector(".app-placeholder");

    if(list.length !== 0) { //If the list is not empty

        counter = list.length; //Set counter to the length of the list

        placehol.style.display = "none"; //Hide the placeholder text

        for(let i = 0; i < list.length; i++) { //Loop through the list

            list_element.innerHTML += `
                <div class="app-list-item item-${list.length}">
                    <div class="app-list-item-text">
                        ${list[i]}
                    </div>
                    <div class="app-list-item-remove" onclick="removeItem(${list.length})">
                        x
                    </div>
                </div>
            `; //Generate a new element for each item in the list

        }

    } else { //If the list is empty

        placehol.style.display = "flex"; //Show the placeholder

    }
    
}

list = JSON.parse(localStorage.getItem("list")); //Gets the list from localStorage
loadList(list); //Calls the loadList function passing in the localStorage list

form_element.addEventListener('submit', () => { //On submit

    let placehol = document.querySelector('.app-placeholder'); //

    placehol.style.display = "none"; //Hides the placeholder

    onSubmit(); //Calls onSubmit() function

    form_element.reset(); //Resets the input field

});

const getInput = () => {

    let input = document.querySelector('.app-input').value; //The value of the input field on submit

    addToList(input); //Passes this values to the addToList() function

}

const addToList = (input) => {

    counter++; //Increments counter

    list.push(input); //Add the input to the list array
    createElements(input); //Passes the input value to the createElements() function

}

const createElements = (text) => { 

    list_element.innerHTML += `
        <div class="app-list-item item-${list.length}">
            <div class="app-list-item-text">
                ${text}
            </div>
            <div class="app-list-item-remove" onclick="removeItem(${list.length})">
                x
            </div>
        </div>
    `; //Generates a new HTML list element using the passed in data

}

const onSubmit = () => {

    getInput(); //Calls getInput()

    localStorage.setItem("list", JSON.stringify(list)); //Adds the current list to local storage

    return false; //Stops page from refreshing on form submit

}

let selectedClass; //Init
let selectedElement; //Init

const removeItem = (itemNumber) => { //Takes in the item number (called onclick)

    counter--; //Decrements counter

    list.splice(itemNumber - 1); //Removes item from list
    localStorage.setItem("list", JSON.stringify(list)); //Updates the list

    selectedClass = ".item-" + itemNumber; //Specifys the classname
    selectedElement = document.querySelector(selectedClass); //Finds the element
    selectedElement.remove(); //Removes the element from the DOM

    let placehol = document.querySelector(".app-placeholder");
    if(counter == 0) { //If the counter is 0
        placehol.style.display = "flex"; //Show placeholder
    }

}