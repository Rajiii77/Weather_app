let apikey = "da3aeb45d8b009222be91aa04684d5f1";
let locinput = document.querySelector(".locinput");
let searchbtn = document.querySelector(".searchbtn");
let weatherform = document.querySelector(".weatherform");
let card = document.querySelector(".card");
let cardd = document.getElementById("cardd");
let tepid=document.getElementById("tepid");
let did=document.getElementById("did")
// let tepcon=document.getElementById("tepcon");
let loid = document.getElementById("loid");
// let locon = document.getElementById("locon");
let humid = document.getElementById("humid");
let humcon = document.getElementById("humcon");
let wid = document.getElementById("wid");
let wcon = document.getElementById("wcon");
let weathercont2=document.querySelector(".weathercont2")
weatherform.addEventListener("submit", async (event) => {
    event.preventDefault();
    const city = locinput.value;

    if (city) {
        try {
            const weatherdata = await getWeather(city);
            displayInfo(weatherdata);
        } catch (error) {
            console.error(error);
            displayError("Failed to fetch weather data.");
        }
    } else {
        displayError("Please enter a city");
    }
});

async function getWeather(city) {
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
    const response = await fetch(apiurl);

    if (!response.ok) {
        throw new Error("Couldn't fetch weather data");
    }

    return await response.json();
}

function displayInfo(data) {
    const { name: city, main: { temp, humidity }, wind:{ speed, deg },weather: [{ description, id }] } = data;
    console.log(data);
    cardd.style.display = "none";
    card.style.display = "flex";
    card.style.backgroundColor = "#71b0da";
    card.style.border = "none";
    card.style.width = "380px";
    card.style.height = "425px";
    card.textContent = ""; 
    weathercont2.style.display="block";

    const cityDisp = document.createElement("p");
    const humidityDisp = document.createElement("p");
    const tempDisp = document.createElement("p");
    const descDisp = document.createElement("p");
    const weatheremoji = document.createElement("p");

    cityDisp.classList.add("citycls");
    humidityDisp.classList.add("humcls");
    tempDisp.classList.add("tempcls");
    descDisp.classList.add("desccls");
    weatheremoji.classList.add("emojicls");

    weatheremoji.textContent = getemoji(id);
    cityDisp.textContent = `${city}`;
    humidityDisp.textContent = `Humidity: ${humidity}%`;
    tempDisp.textContent = `${temp}°C`;
    descDisp.textContent = `Description: ${description}`;
    tepid.textContent=`${temp}°C`;
    humid.textContent = `${humidity}`;
    loid.textContent=`${city}`;
    wid.textContent=`${speed}`
    did.textContent=`${description}`

    loid.style.fontSize="2rem"
    wid.style.fontSize="2.4rem"
    did.style.fontSize="2.4rem"
    tepid.style.fontSize="2.4rem"
    // tepcon.style.fontSize="2.4rem"
    humid.style.fontSize="2.4rem"
    humcon.style.fontSize="2.4rem"
     wcon.style.fontSize="2.4rem"
//    locon.style.fontSize="2.4rem"
     
wcon.style.marginTop="-15px";
    //  tepcon.style.marginTop="-15px";
    // humcon.style.marginLeft="-40px";
    card.appendChild(weatheremoji);
    card.appendChild(tempDisp);
    card.appendChild(cityDisp);
    card.appendChild(humidityDisp);
    card.appendChild(descDisp);
}

function getemoji(weatherid) {
    switch (true) {
        case (weatherid >= 200 && weatherid < 300):
            return "⛈️";
        case (weatherid >= 300 && weatherid < 600):
            return "🌧️";
        case (weatherid >= 600 && weatherid < 700):
            return "❄️";
        case (weatherid >= 700 && weatherid < 800):
            return "🌥️";
        case (weatherid === 800):
            return "☀️";
        case (weatherid > 800):
            return "☁️";
        default:
            return "❓";
    }
}

function displayError(msg) {
    cardd.style.display = "none";
    const errorMsg = document.createElement("p");
    errorMsg.textContent = msg;
errorMsg.style.fontSize="2.4rem";
errorMsg.style.color="white"
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorMsg);

    card.style.backgroundColor = "#71b0da";
    card.style.border = "none";
    card.style.width = "380px";
    card.style.height = "425px";
}
