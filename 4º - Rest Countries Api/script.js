'use strict'

const containerCountrysEl = document.querySelector('.containerCountrys')
const btnSearchEl = document.querySelector('.btnSearch')
const searchBarEl = document.querySelector('.searchBar')
const regionEl = document.querySelector('.region')
const optionAllEl = document.querySelectorAll('option')
const btnlightMode = document.querySelector('.lightMode')
const btndarkMode = document.querySelector('.darkMode')
const bodyEl = document.querySelector('.body')

let allCountrysData;


/* display html with info of countries*/

const displayHtml = function (country) {

    const html = `<div class="country">
    <div>
        <img src="${country.flags.png}" alt="country">
    </div>
    <div class="countryData">
        <span class="countryName">${country.name.common}</span>
        <p class="countryPopulation"> <span>Population:</span>${country.population
        }</p>
        <p class="countryRegion"> <span>Region:</span> ${country.region}</p>
        <p class="countryCapital"><span> Capital:</span> ${country.capital}</p>
    </div>
</div>`

    containerCountrysEl.insertAdjacentHTML('beforeend', html);
}


/* remove countrys from html  */

const removeData = function () {
    const countryAllEl = document.querySelectorAll('.country')
    countryAllEl.forEach(country => country.remove())
}


/* display all countries */

const displayCountry = async function () {

    const allCountrysRes = await fetch('https://restcountries.com/v3.1/all')

    allCountrysData = await allCountrysRes.json()

    allCountrysData.forEach(country => {
        displayHtml(country)
    })
}

displayCountry()



/* Search for country */

btnSearchEl.addEventListener('click', function (e) {
    e.preventDefault()

    const countryAllEl = document.querySelectorAll('.country')
    countryAllEl.forEach(country => country.remove())

    let searchedCountry = searchBarEl.value
    searchedCountry = searchedCountry[0].toUpperCase() + searchedCountry.slice(1)

    const country = allCountrysData.find(country => country.name.common === searchedCountry)
    

    displayHtml(country)


})



/* filter by region */

regionEl.addEventListener('change', function (e) {

    if (e.target.value === 'allCountry') {
        removeData()

        allCountrysData.forEach(val => displayHtml(val))

    }

    else {
        removeData()

        let clickedZone = e.target.value
        clickedZone = clickedZone[0].toUpperCase() + clickedZone.slice(1)
        const countrysByRegion = allCountrysData.filter(country => country.region === clickedZone)

        countrysByRegion.forEach(country => displayHtml(country))

    }

})


btnlightMode.addEventListener('click', function () {
    btnlightMode.classList.toggle('hidden')
    btndarkMode.classList.toggle('hidden')
    bodyEl.style.backgroundColor = 'white';

})

btndarkMode.addEventListener('click', function () {
    btnlightMode.classList.toggle('hidden')
    btndarkMode.classList.toggle('hidden')
    bodyEl.style.backgroundColor = 'rgb(26, 42, 51)';

})