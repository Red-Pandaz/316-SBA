let colorArray = []
// Cache at least one element using getElementById
let inputForm = document.getElementById('input-form')
// Cache at least one element using querySelector or querySelectorAll
let colorContainer = document.querySelector('#color-container')
// Register at least two different event listeners and create the associated event handler functions
inputForm.addEventListener('submit', function(e){
    e.preventDefault();
    // Include at least one form and/or input with DOM event-based validation
    try{
        for(let color of colorArray){
            if(color.firstNum === document.querySelector('#num1').value && color.secondNum === document.querySelector('#num2').value && color.thirdNum === document.querySelector('#num3').value){
                throw new Error ('This combination of colors is already saved. Please do not try to add duplicate colors.')
            }
        }
    }catch(err){
        alert(err)
        return
    }
  
    let newColorObj = {}
    newColorObj.firstNum = document.querySelector('#num1').value
    newColorObj.secondNum = document.querySelector('#num2').value
    newColorObj.thirdNum = document.querySelector('#num3').value
    console.log(newColorObj)
    colorArray.push(newColorObj)
    // Create at least one element using createElement
    let namingForm = document.createElement('form')
    let newColorDiv = document.createElement('div')
    // Modify the style and/or CSS classes of an element in response to user interactions using the style or classList properties
    newColorDiv.classList.add('color-div')
    namingForm.classList.add('naming-form')
    newColorDiv.style.backgroundColor = `RGB(${newColorObj.firstNum}, ${newColorObj.secondNum}, ${newColorObj.thirdNum})`
    // Use appendChild and/or prepend to add new elements to the DOM
    namingForm.appendChild(newColorDiv)
    let namingInput = document.createElement('input')
    namingInput.type = 'text'
    namingInput.placeholder = 'Type in a name for your new color'
    let namingSubmit = document.createElement('input')
    namingSubmit.type = 'submit'
    namingForm.appendChild(namingInput)
    namingForm.appendChild(namingSubmit)
    namingForm.addEventListener('submit', function(e){
        e.preventDefault()
        for(let color of colorArray){
            if(color.name === namingInput.value){
                alert(`You already have a color named ${namingInput.value}, please pick another name`)
                return
            }
        }
        
        newColorObj.name = namingInput.value
        colorArray.push(newColorObj)
        namingForm.style.display = 'none'
    })
document.body.append(namingForm)
})