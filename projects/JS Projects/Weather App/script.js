const apiKey = "a9c2b8955167c0893e999e6e4ee64c6f";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";


  const searchBox = document.querySelector('.search input');
  const searchBtn = document.querySelector('.search button');
  const weatherIcon = document.querySelector('.weather-icon')

//secondary function to fetch countries:

async function getCountries(){
  const countryApiUrl = "https://restcountries.com/v3.1/all";//1. URL
  const countryData = await fetch(countryApiUrl);//2.  the data all messed up!
  const countries = await countryData.json() // 3. jsom arrange all of it to 'countries'


  countries
  .sort((a, b) => a.name.common.localeCompare(b.name.common)) // sorting alphabetically
  .forEach(country =>{
    const option = document.createElement('option'); // the element of the coutnry, like a placeholder for the name
    option.value = country.name.common // country name
    option.textContent = country.name.common;
    countryDropdown.appendChild(option);
  });
  
}
getCountries()




// Main function to check weather
async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  if(response.status == 404){
    document.querySelector('.erorr').style.display = 'block'
    document.querySelector('.weather').style.display = 'none'
  }else{
    let data = await response.json();


  
  console.log(apiUrl + `&appid=${apiKey}`);

  //change the data inside the app
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
  document.querySelector(".humidity").innerHTML = data.main.humidity + `%`;
  document.querySelector(".wind").innerHTML = data.wind.speed + ` km/h`;



  // if and else system to change the weather icon
  if(data.weather[0].main == 'Clouds'){
    weatherIcon.src = 'images/clouds.png';

  }else if(data.weather[0].main == 'Rain'){
    weatherIcon.src = 'images/rain.png'
  }
  else if(data.weather[0].main == 'Drizzle'){
    weatherIcon.src = 'images/drizzle.png'
  
  }else if(data.weather[0].main == 'Mist'){
    weatherIcon.src = 'images/mist.png'
  
  }else if(data.weather[0].main == 'Clear'){
    weatherIcon.src = 'images/clear.png'
  }

  document.querySelector('.weather').style.display = 'block'
  document.querySelector('.erorr').style.display = 'none'

  }
  
}



searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value) // the value here goes to 'city' parameter in the function
})

countryDropdown.addEventListener('change', ()=>{
  checkWeather(countryDropdown.value)
  console.log('the country is ', countryDropdown.value);
  
})



// timed messege


const helloTime = ()=>{
const old = new Date()
const now = old.getHours() // Get the current hour (0–23)
console.log(`the current time in hours is ${now}`);

const hello = document.getElementById('hello') // get the 'hello' element
const card = document.getElementById('card')
if(now >= 6 && now < 12){
    hello.innerText = 'Good Morning Ofek!'
    card.style.backgroundImage = 'linear-gradient(135deg, #0450f3, #d7ec7b)'
}else if(now >= 12 && now < 18){
    hello.innerText = 'good Afternoon Ofek!'
    card.style.backgroundImage = 'linear-gradient(135deg, #FFD59E, #FFA07A)';
}else if(now >= 18 && now < 24){
    hello.innerText = 'good Evening Ofek!'
    card.style.backgroundImage = 'linear-gradient(135deg, #FDCBFF, #FDAB76)'
}else{
    hello.innerText = 'Good Night Ofek!'
    card.style.backgroundImage = 'linear-gradient(135deg, #203A43, #2C5364)';

}
return now
  
}

helloTime()









