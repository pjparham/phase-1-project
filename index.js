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
let drinkDisplay = document.getElementById('drinkDisplay')
// console.log(liquorSelect)

function enableLiquorForm(){
    liquorForm.addEventListener('submit', (e) => {
        e.preventDefault()
        while (drinkDisplay.lastElementChild){
            drinkDisplay.removeChild(drinkDisplay.firstChild)
        }
        let liquorValue = liquorSelect.options[liquorSelect.selectedIndex].value
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${liquorValue}`)
        .then((response) => response.json())
        .then((drinkData) => handleDrinkData(drinkData))
    })
}

function handleDrinkData(drinkData){
    for(let i = 0; i < 6; i++){
        //drinkData.drinks[i].whatever is how we access properties with this api
        let div = document.createElement('div')
        let img = document.createElement('img')
        let name = document.createElement('h3')
        // let picAddress = drinkData.drinks[i].st
        img.src = drinkData.drinks[i].strDrinkThumb
        name.innerText = drinkData.drinks[i].strDrink
        div.setAttribute("id", `${drinkData.drinks[i].idDrink}`)
        drinkDisplay.appendChild(div)
        div.append(img, name)
        console.log(name)
    }
}