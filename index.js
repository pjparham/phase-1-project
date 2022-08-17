document.addEventListener('DOMContentLoaded', () => {
    //functions go here
    // displayDrinks()
    enableLiquorForm()
})

function displayDrinks(){
    fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=red_wine')
    .then((response) => response.json())
    .then((drinkData) => console.log(drinkData))
}

let liquorForm = document.getElementById('liquor-selector')
let liquorSelect = document.getElementById('liquor')
// console.log(liquorSelect)

function enableLiquorForm(){
    liquorForm.addEventListener('submit', (e) => {
        e.preventDefault()
        let liquorValue = liquorSelect.options[liquorSelect.selectedIndex].value
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${liquorValue}`)
        .then((response) => response.json())
        .then((drinkData) => console.log(drinkData))
    })
}