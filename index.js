document.addEventListener('DOMContentLoaded', () => {
    //functions go here
    displayDrinks()
})

function displayDrinks(){
    fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=red_wine')
    .then((response) => response.json())
    .then((drinkData) => console.log(drinkData))
}