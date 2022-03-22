const form_element = document.querySelector('.app-form'); //Form element
const list_element  = document.querySelector('.app-list'); //List element 

let list = []; //Init list
let counter = 0; //Init counter

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


    return false; //Stops page from refreshing on form submit

}

let selectedClass; //Init
let selectedElement; //Init

const removeItem = (itemNumber) => { //Takes in the item number (called onclick)

    counter--; //Decrements counter

    list.splice(itemNumber - 1); //Removes item from list

    selectedClass = ".item-" + itemNumber; //Specifys the classname
    selectedElement = document.querySelector(selectedClass); //Finds the element
    selectedElement.remove(); //Removes the element from the DOM

    let placehol = document.querySelector(".app-placeholder");
    if(counter == 0) { //If the counter is 0
        placehol.style.display = "flex"; //Show placeholder
    }

}