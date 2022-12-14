document.addEventListener('DOMContentLoaded', () => {
    enableLiquorForm()
})

//global variables
let header = document.getElementById('header')
let drinkForm = document.getElementById('drink-select')
let liquorForm = document.getElementById('liquor-selector')
let liquorSelect = document.getElementById('liquor')
let drinkDisplay = document.getElementById('drinkDisplay')
let recipeDisplay = document.getElementById('recipeDisplay')
let h3 = document.createElement('h3')

function enableLiquorForm(){
    liquorForm.addEventListener('submit', (e) => {
        e.preventDefault()
        while (drinkDisplay.lastElementChild){
            drinkDisplay.removeChild(drinkDisplay.firstChild)
        }
        while (recipeDisplay.lastElementChild){
            recipeDisplay.removeChild(recipeDisplay.firstChild)
        }
        let liquorValue = liquorSelect.options[liquorSelect.selectedIndex].value
        displayLiquorImage(liquorValue)
        h3.innerText = 'Click a drink icon and your recipe will be displayed below'
        header.appendChild(h3)
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${liquorValue}`)
        .then((response) => response.json())
        .then((drinkData) => createDrinkCards(drinkData))
    })
}

function displayLiquorImage(liquorValue){
    let drinkFormImg = drinkForm.querySelector('img')
    drinkFormImg.remove()
    let img = document.createElement('img')
    switch(liquorValue){
        case 'Tequila':
            img.src = "images/patron.png"
            drinkForm.appendChild(img)
            break;
        case 'Vodka':
            img.setAttribute('class', 'smaller')
            img.src = 'images/grey_goose.png'
            drinkForm.appendChild(img)
            break;
        case 'Gin':
            img.src = 'images/gin.png'
            drinkForm.appendChild(img)
            break;
        case 'Red_Wine':
            img.src = "images/wine.png"
            drinkForm.appendChild(img)
            break;
        case 'Bourbon':
            img.src = "images/bourbon.png"
            drinkForm.appendChild(img)
            break;
    }
}

function createDrinkCards(drinkData){
    for(let i = 0; i < 9; i++){
        //drinkData.drinks[i].whatever is how we access properties with this api
        let div = document.createElement('div')
        let img = document.createElement('img')
        let name = document.createElement('h3')
        img.src = drinkData.drinks[i].strDrinkThumb
        name.innerText = drinkData.drinks[i].strDrink
        div.setAttribute("id", `${drinkData.drinks[i].idDrink}`)
        div.setAttribute('class', 'card')
        drinkDisplay.appendChild(div)
        div.append(img, name)
        div.addEventListener('click', () => getRecipe(div.id))
    }
}

function getRecipe(divId){
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${divId}`)
    .then((response) => response.json())
    .then((drinkData) => displayRecipe(drinkData))
}

function displayRecipe(drinkData){
    let drink = drinkData.drinks[0]
    let name = drink.strDrink
    let instructions = drink.strInstructions
    let ingredientsArray = []
    if(drink.strIngredient1 !== null){
        ingredientsArray.push(drink.strIngredient1)
    }
    if(drink.strIngredient2 !== null){
     ingredientsArray.push(drink.strIngredient2)
    }
    if(drink.strIngredient3 !== null){
     ingredientsArray.push(drink.strIngredient3)
    }
    if(drink.strIngredient4 !== null){
        ingredientsArray.push(drink.strIngredient4)
    }
    if(drink.strIngredient5 !== null){
    ingredientsArray.push(drink.strIngredient5)
    }
    if(drink.strIngredient6 !== null){
    ingredientsArray.push(drink.strIngredient6)
    }
    if(drink.strIngredient7 !== null){
    ingredientsArray.push(drink.strIngredient7)
    }
    if(drink.strIngredient8 !== null){
    ingredientsArray.push(drink.strIngredient8)
    }
    if(drink.strIngredient9 !== null){
        ingredientsArray.push(drink.strIngredient9)
    }
    if(drink.strIngredient10 !== null){
        ingredientsArray.push(drink.strIngredient10)
    }
    while (recipeDisplay.lastElementChild){
        recipeDisplay.removeChild(recipeDisplay.firstChild)
    }
    let drinkName = document.createElement('h2')
    drinkName.innerText = name
    let recipe = document.createElement('p')
    recipe.innerText = instructions
    let ul = document.createElement('ul')
    for(let x = 0; x < ingredientsArray.length; x++){
        let li = document.createElement('li')
        li.innerText = ingredientsArray[x]
        ul.appendChild(li)
    }
    recipeDisplay.append(drinkName, ul, recipe)
}
