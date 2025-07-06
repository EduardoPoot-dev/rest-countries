function initApp() {
    getCoutries()

    const countriesContainer = document.querySelector('#countries')
    const regionSelect = document.querySelector('#region-select')
    const countrySearch = document.querySelector('#country-search')
    
    let timeOut

    regionSelect.addEventListener('input', onSelectCountry)
    countrySearch.addEventListener('input', onSearchCountry)

    function getCoutries() {
        fetch('https://restcountries.com/v3.1/all?fields=name,capital,region,flags,population')
            .then(resp => resp.json())
            .then(res => showContries(res))
    }

    function getCountriesByRegion(region) {
        fetch(`https://restcountries.com/v3.1/region/${region}`)
            .then(resp => resp.json())
            .then(res => showContries(res))
    }

    function getContryByName(name) {
        fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
            .then(resp => resp.json())
            .then(res => showContries(res))
    }

    function onSelectCountry(e) {
        const region = e.target.value

        if(region === '') {
            getCoutries()
        } else {
            getCountriesByRegion(region)
        }
    }

    function onSearchCountry(e) {
        clearTimeout(timeOut)

        const query = e.target.value
        
        timeOut = setTimeout(() => {
            if(!query) {
                getCoutries()
            } else {
                getContryByName(query)
            }
        }, 500)
    }

    function showContries(countries) {
        clearHtml(countriesContainer)

        countries.forEach(country => {
            const card = document.createElement('A')
            card.href = `/details.html?name=${country.name.common}`
            card.classList.add('rounded-md', 'overflow-hidden', 'hover:scale-105', 'transition-transform', 'shadow-md')

            //IMAGE
            const imageContainer = document.createElement('DIV')
            imageContainer.classList.add('w-full', 'h-52')
            const image = document.createElement('IMG')
            image.classList.add('w-full', 'h-52', 'object-cover', )
            image.src = country.flags.png
            image.alt = country.flags.alt
            imageContainer.appendChild(image)

            const description = document.createElement('DIV')
            description.classList.add('bg-white', 'dark:bg-midnight-blue', 'p-7', 'pb-12', 'text-input-gray', 'dark:text-white')
            
            //NAME
            const name = document.createElement('H2')
            name.textContent = country.name.common
            name.classList.add('font-extrabold', 'text-xl', 'mb-3', 'text-text-grey', 'dark:text-white')
            description.appendChild(name)

            //POPULATION
            const population = document.createElement('P')
            population.classList.add('font-light', 'text-sm', 'mt-1', 'font-semibold')
            population.textContent = 'Population: '

            const populationSpan = document.createElement('SPAN')
            populationSpan.classList.add('font-light')
            populationSpan.textContent = formatPopulation(country.population)
            population.appendChild(populationSpan)
            description.appendChild(population)
            
            //REGION
            const region = document.createElement('P')
            region.classList.add('font-light', 'text-sm', 'mt-1', 'font-semibold')
            region.textContent = 'Region: '

            const regionSpan = document.createElement('SPAN')
            regionSpan.classList.add('font-light')
            regionSpan.textContent = country.region
            region.appendChild(regionSpan)
            description.appendChild(region)

            //CAPITAL
            const capital = document.createElement('P')
            capital.classList.add('font-light', 'text-sm', 'mt-1', 'font-semibold')
            capital.textContent = 'Capital: '

            const capitalSpan = document.createElement('SPAN')
            capitalSpan.classList.add('font-light')
            capitalSpan.textContent = country.capital?.[0] || '-'
            capital.appendChild(capitalSpan)
            description.appendChild(capital)

            card.appendChild(imageContainer)
            card.appendChild(description)

            countriesContainer.appendChild(card)

        });
    }

    function formatPopulation(value) {
        return new Intl.NumberFormat('en-US').format(value);
    }

    function clearHtml(el) {
        while(el.firstChild) {
            el.removeChild(el.firstChild)
        }
    }
}
document.addEventListener('DOMContentLoaded', initApp)
