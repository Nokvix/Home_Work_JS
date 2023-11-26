const api = {
    base: 'https://api.openweathermap.org/data/2.5/',
    key: '254238e2e9f3918993f1bd85abb2c6e3',
};

const dateBuilder = (d) => {
    // d = new Date();
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
}

const input = document.querySelector('.searchbar');
const container = document.querySelector('.location-container');

let city = localStorage.getItem('city') || 'Ekaterinburg';
let store = {};

input.addEventListener('keyup', (e) => {

    const value = e.target.value;
    if (e.key == 'Enter' && value) {
        city = value;
        localStorage.clear();
        localStorage.setItem('city', city);
        fetchData();
        e.target.value = '';
    }
});

const fetchData = async () => {
    getLoader();
    const response = await fetch(`${api.base}weather?q=${city}&appid=${api.key}`).then(res => res.json());
    const { name, weather, main: { temp }, sys: { country } } = response;
    store = {
        name,
        weather: weather[0].main,
        temp: (temp - 273.15).toFixed(2), // Реализовал расчёт температуры в градусах цельсия и округлил до 2 знаков (0°C = 273,15°К)
        country,
    };
    renderComponent();
};

const getLoader = () => {
    container.innerHTML = `<span class="loader"></span>`;
}

const renderComponent = () => {
    container.innerHTML = getContent();

}

const getContent = () => {

    const {name, weather, temp, country} = store;

    return `<div class="location-box">
    <div class="location">
        ${name}, ${country}
    </div>
    <div class="date">${dateBuilder(new Date())}</div>
</div>

<div class="weather-box">
    <div class="temp">${temp}°C</div>
    <div class="weather">${weather}</div>
</div>`
}

fetchData();