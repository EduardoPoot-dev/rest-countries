function initApp() {
    const searchParams = new URLSearchParams(window.location.search)
    const countryName = searchParams.get('name')
    
    getContryByName(countryName)

    function getContryByName(name) {
        fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
            .then(resp => resp.json())
            .then(res => showContry(res[0]))
    }

    async function getCountryByCode(code) {
        return fetch(`https://restcountries.com/v3.1/alpha/${code}?fields=name`)
            .then(resp => resp.json())
            .then(res => res.name.common)
    }

    function showContry(country) {
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

        showBorders(country.borders)
    }

    function showBorders(borders) {
        const bordersContainer = document.querySelector('#borders')

        borders.forEach(async border => {
            const country = await getCountryByCode(border)
            const li = document.createElement('LI')
            li.classList.add('inline', 'py-2', 'px-4', 'bg-white', 'dark:bg-midnight-blue', 'w-auto', 'shadow-2xl', 'text-sm')
            li.textContent = country

            bordersContainer.appendChild(li)
        });
    }

    function formatPopulation(value) {
        return new Intl.NumberFormat('en-US').format(value);
    }

}
document.addEventListener('DOMContentLoaded', initApp)