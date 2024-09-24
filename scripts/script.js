let colorArray = []
// Cache at least one element using getElementById
let inputForm = document.getElementById('input-form')
// Cache at least one element using querySelector or querySelectorAll
let colorContainer = document.querySelector('#color-container')
inputForm.addEventListener('submit', function(e){
    e.preventDefault();
    let newColorObj = {}
    newColorObj.firstNum = document.querySelector('#num1').value
    newColorObj.secondNum = document.querySelector('#num2').value
    newColorObj.thirdNumb = document.querySelector('#num3').value
    console.log(newColorObj)
    
})
