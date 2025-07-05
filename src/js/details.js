function initApp() {
    const image = document.querySelector('#country-image')
    const title = document.querySelector('#title')
    const name = document.querySelector('#name')
    const population = document.querySelector('#population')
    const region = document.querySelector('#region')
    const subregion = document.querySelector('#subregion')    
    const capital = document.querySelector('#capital') 
    const tld = document.querySelector('#tld')
    const currency = document.querySelector('#currency')
    const language = document.querySelector('#language')
    
    const searchParams = new URLSearchParams(window.location.search)
    const countryName = searchParams.get('name')
    
    getContryByName(countryName)

    function getContryByName(name) {
        fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
            .then(resp => resp.json())
            .then(res => showContry(res[0]))
    }

    function showContry(country) {
        image.src = country.flags.png
        title.textContent = country.name.common
        name.textContent = country.name.common
        population.textContent = formatPopulation(country.population)
        region.textContent = country.region 
        subregion.textContent = country.subregion    
        capital.textContent = country.capital ? country.capital[0] : '-' 
        tld.textContent = country.tld ? country.tld[0] : '-' 
        currency.textContent = Object.values(country.currencies).map(currency => currency.name).join(', ')
        language.textContent = Object.values(country.languages).join(', ')
    }

    function formatPopulation(value) {
        return new Intl.NumberFormat('en-US').format(value);
    }

}
document.addEventListener('DOMContentLoaded', initApp)