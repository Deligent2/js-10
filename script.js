const row = document.querySelector('.row')
const all = document.querySelector('#all')
const search = document.querySelector('#search')
const searchBox = document.querySelector('.search-wrapper')
const searchInput = document.querySelector('#searchinput')
const submit = document.querySelector('#submit')
const name = document.querySelector('#name')
const valut = document.querySelector('#valut')
const symbol = document.querySelector('#symbol')
const flag = document.querySelector('#flag')
const language = document.querySelector('#language')
const capital = document.querySelector('#capital')
const region = document.querySelector('#region')
const text = document.querySelector('#text')
const maps = document.querySelector('#maps')
const text1 = document.querySelector('#text1')
console.log(all.checked)
console.log(search.checked)

const handleGetCountries = () => {
    fetch(`https://restcountries.com/v3.1/all`)
        .then(res => res.json())
        .then(data => {
            data.forEach(country => {
                row.innerHTML += `
                <div class="col-4">
                    <div class="card">
                        <img src="${country.flags.png}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h3 class="class-card">${country.translations.rus.official}</h3>
                                <p class="card-text"> ${country.capital}</p>
                            </div>
                    </div>
                </div >
`
            })
        })
}
handleGetCountries()

all.addEventListener('change', () => {
    if (all.checked) {
        row.classList.remove('hidden')
        searchBox.classList.add('hidden')
    }
})

search.addEventListener('change', () => {
    if (search.checked) {
        searchBox.classList.remove('hidden')
        row.classList.add('hidden')
        text.classList.add('hidden')
    }
})


submit.addEventListener('click', () => {
    let value = searchInput.value
    fetch(`https://restcountries.com/v3.1/all${value}`)
        .then(res => res.json())
        .then(json => {
            console.log(json)
            valut.innerHTML = Object.values(json[0].currencies).map(el => el.name)
            name.innerHTML = json[0].translations.rus.common
            capital.innerHTML = json[0].capital
            symbol.innerHTML = Object.values(json[0].currencies).map(el => el.symbol)
            flag.src = json[0].flags.png
            language.innerHTML = Object.values(json[0].languages).map(el => el)
            region.innerHTML = json[0].region
            maps.href = json[0].maps.googleMaps
            maps.innerHTML = json[0].maps.googleMaps

            let values1 = json[0].capital[0]
            fetch(`http://api.weatherapi.com/v1/current.json?key=82b0db98f6ea4728b0860820230811&q=${values1}`)
                .then(data => data.json())
                .then(json => {
                    console.log(json)
                    temp.innerHTML = json.current.temp_c
                    city.innerHTML = json.location.region
                    text1.innerHTML = json.current.condition.text
                })
        })
})
searchInput.addEventListener('keypress', () => {
    if (event.key === 'Enter') {
        event.preventDefault()
        submit.click()
    }
})