let colorArray = JSON.parse(window.localStorage.getItem('savedColors')) || [];
let tempArray = [];

// Cache at least one element using getElementById
let inputForm = document.getElementById('input-form');

// Cache at least one element using querySelector or querySelectorAll
let colorContainer = document.querySelector('#color-container');

// Create a template for color display using cloneNode
let colorTemplate = document.createElement('div');
colorTemplate.classList.add('color-display-template');
colorTemplate.innerHTML = `<span class="color-info"></span>`;
colorTemplate.style.width = '200px';
colorTemplate.style.height = '50px';
colorTemplate.style.margin = '10px 0';

inputForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Checking to make sure only one entry per RGB combination can be entered
    try {
        for (let color of tempArray) {
            if (color.firstNum === document.querySelector('#num1').value &&
                color.secondNum === document.querySelector('#num2').value &&
                color.thirdNum === document.querySelector('#num3').value) {
                window.alert('This combination of colors is already saved. Please do not try to add duplicate colors.');
                return;
            }
        }
        let savedColors = localStorage.getItem('savedColors');
        if (savedColors) {
            try {
                savedColors = JSON.parse(savedColors) || [];
            } catch (err) {
                console.error('Error parsing saved colors:', err);
                savedColors = []; 
            }
        } else {
            savedColors = [];
        }
        for (let color of savedColors) {
            if (color.firstNum === document.querySelector('#num1').value &&
                color.secondNum === document.querySelector('#num2').value &&
                color.thirdNum === document.querySelector('#num3').value) {
                window.alert('This combination of colors is already saved. Please do not try to add duplicate colors.');
                return;
            }
        }
    } catch (err) {
        // Use at least two Browser Object Model (BOM) properties or methods
        window.alert(err.message);
        return;
    }

    let newColorObj = {
        firstNum: document.querySelector('#num1').value,
        secondNum: document.querySelector('#num2').value,
        thirdNum: document.querySelector('#num3').value
    };

    console.log(newColorObj);
    tempArray.push(newColorObj);

    // Use the DocumentFragment interface or HTML templating with the cloneNode method to create templated content
    let fragment = document.createDocumentFragment();


    let clonedColorDiv = colorTemplate.cloneNode(true);
    clonedColorDiv.style.backgroundColor = `RGB(${newColorObj.firstNum}, ${newColorObj.secondNum}, ${newColorObj.thirdNum})`;
    clonedColorDiv.querySelector('.color-info').textContent = `RGB: (${newColorObj.firstNum}, ${newColorObj.secondNum}, ${newColorObj.thirdNum})`;

    // Append cloned node to the fragment
    fragment.appendChild(clonedColorDiv);

    let namingForm = document.createElement('form');
    let namingInput = document.createElement('input');
    namingInput.type = 'text';
    namingInput.placeholder = 'Type in a name for your new color';

    let namingSubmit = document.createElement('input');
    namingSubmit.type = 'submit';
    namingForm.appendChild(namingInput);
    namingForm.appendChild(namingSubmit);

    namingForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Checking to make sure any name is entered only once
        for (let color of colorArray) {
            if (color.name === namingInput.value) {
                window.alert(`You already have a color named ${namingInput.value}, please pick another name.`);
                return;
            }
        }

        newColorObj.name = namingInput.value;
        colorArray.push(newColorObj);

        // Use at least two Browser Object Model (BOM) properties or methods
        window.localStorage.setItem('savedColors', JSON.stringify(colorArray));

        let colorDisplayDiv = clonedColorDiv;
        colorDisplayDiv.querySelector('.color-info').textContent = `Color: ${namingInput.value} (RGB: ${newColorObj.firstNum}, ${newColorObj.secondNum}, ${newColorObj.thirdNum})`;

        colorContainer.appendChild(colorDisplayDiv);

        namingForm.parentNode.removeChild(namingForm);

        let message = document.createElement('div');
        message.textContent = `You have named your color: ${namingInput.value}`;
        document.body.appendChild(message);

        inputForm.reset();
    });

    document.body.appendChild(fragment);
    document.body.appendChild(namingForm);
});

// Function to display saved colors from localStorage
function displaySavedColors() {
    colorContainer.innerHTML = '';
    let savedColors = JSON.parse(window.localStorage.getItem('savedColors')) || [];
    savedColors.forEach((color, index) => {
        let clonedColorDiv = colorTemplate.cloneNode(true);
        clonedColorDiv.style.backgroundColor = `RGB(${color.firstNum}, ${color.secondNum}, ${color.thirdNum})`;
        clonedColorDiv.querySelector('.color-info').textContent = `Color ${index + 1}: RGB(${color.firstNum}, ${color.secondNum}, ${color.thirdNum}) - Name: ${color.name || 'Unnamed'}`;

        colorContainer.appendChild(clonedColorDiv);
    });
}

// Call the function to display saved colors when needed
document.getElementById('display-colors-button').addEventListener('click', displaySavedColors);

