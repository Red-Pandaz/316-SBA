let colorArray = [];
let tempArray = [];

// Cache at least one element using getElementById
let inputForm = document.getElementById('input-form');

// Cache at least one element using querySelector or querySelectorAll
let colorContainer = document.querySelector('#color-container');

inputForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Include at least one form and/or input with DOM event-based validation
    try {
        for (let color of tempArray) {
            if (color.firstNum === document.querySelector('#num1').value &&
                color.secondNum === document.querySelector('#num2').value &&
                color.thirdNum === document.querySelector('#num3').value) {
                throw new Error('This combination of colors is already saved. Please do not try to add duplicate colors.');
            }
        }
    } catch (err) {
        alert(err);
        return;
    }

    let newColorObj = {
        firstNum: document.querySelector('#num1').value,
        secondNum: document.querySelector('#num2').value,
        thirdNum: document.querySelector('#num3').value
    };

    console.log(newColorObj);
    tempArray.push(newColorObj)
  

    // Create a DocumentFragment to manage new elements
    let fragment = document.createDocumentFragment();

    // Create naming form and new color div
    let namingForm = document.createElement('form');
    let newColorDiv = document.createElement('div');
    newColorDiv.classList.add('color-div');
    newColorDiv.style.backgroundColor = `RGB(${newColorObj.firstNum}, ${newColorObj.secondNum}, ${newColorObj.thirdNum})`;

    // Use appendChild to add new elements to the DocumentFragment
    fragment.appendChild(newColorDiv);

    let namingInput = document.createElement('input');
    namingInput.type = 'text';
    namingInput.placeholder = 'Type in a name for your new color';

    let namingSubmit = document.createElement('input');
    namingSubmit.type = 'submit';
    namingForm.appendChild(namingInput);
    namingForm.appendChild(namingSubmit);

    namingForm.addEventListener('submit', function (e) {
        e.preventDefault();
        for (let color of colorArray) {
            if (color.name === namingInput.value) {
                alert(`You already have a color named ${namingInput.value}, please pick another name`);
                return;
            }
        }

        // Assign the name to newColorObj
        newColorObj.name = namingInput.value;

        // Only push to colorArray here
        colorArray.push(newColorObj);

        // Create a new color display element
        let colorDisplayDiv = document.createElement('div');
        colorDisplayDiv.textContent = `Color: ${namingInput.value} (RGB: ${newColorObj.firstNum}, ${newColorObj.secondNum}, ${newColorObj.thirdNum})`;
        colorDisplayDiv.style.backgroundColor = `RGB(${newColorObj.firstNum}, ${newColorObj.secondNum}, ${newColorObj.thirdNum})`;
        colorDisplayDiv.classList.add('color-display');

        // Append the color display to the color container
        colorContainer.appendChild(colorDisplayDiv);

        // Use the parent-child-sibling relationship to navigate between elements at least once
        namingForm.parentNode.removeChild(namingForm);

        // Show last added color name in a message
        let message = document.createElement('div');
        message.textContent = `You have named your color: ${namingInput.value}`;
        document.body.appendChild(message);
        
        // Clear input fields
        inputForm.reset();
    });

    // Append the fragment to the document body
    document.body.appendChild(fragment);
    document.body.appendChild(namingForm);
});

// Example of iterating over elements to display saved colors
function displaySavedColors() {
    colorContainer.innerHTML = '';
    colorArray.forEach((color, index) => {
        let colorDisplayDiv = document.createElement('div');
        colorDisplayDiv.textContent = `Color ${index + 1}: RGB(${color.firstNum}, ${color.secondNum}, ${color.thirdNum}) - Name: ${color.name || 'Unnamed'}`;
        colorDisplayDiv.style.backgroundColor = `RGB(${color.firstNum}, ${color.secondNum}, ${color.thirdNum})`;
        colorContainer.appendChild(colorDisplayDiv);
    });
}

// Call the function to display saved colors when needed
document.getElementById('display-colors-button').addEventListener('click', displaySavedColors);
