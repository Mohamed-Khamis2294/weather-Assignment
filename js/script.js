'use strict';
async function  whereAmI(){
return new Promise ((resolve,reject)=>{
  navigator.geolocation.getCurrentPosition(resolve,reject);
})
}

async function displayCurrentCity(){
  const currentposition=await whereAmI();
  const{latitude:lat,longitude:long}=currentposition.coords;
  const res=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=adef4456af434f56bee84914241806&q=${lat},${long}&days=6`)
  const data=await res.json();
  document.querySelector('.card-weather').classList.remove('d-none');
  document.querySelector('.spinner').classList.add('d-none');
  document.querySelector('.countryname').innerHTML=data.location.country;
  document.querySelector('.cityname').innerHTML=data.location.name;
  const allDays=data.forecast.forecastday;//array of objects
  const day1Date=new Date(allDays[0].date).toLocaleString('en-us',{day:"numeric",month:'short',year:'numeric'});
  document.querySelector('.date-0').innerHTML=day1Date;
  allDays.forEach((d,i)=>{
    document.querySelector(`.day-${i}`).innerHTML= new Date(d.date).toLocaleString('en-us',{weekday:'long'});
    document.querySelector(`.degree-${i}`).innerHTML=`${d.day.maxtemp_c}&deg;c`;
    document.querySelector(`.state-${i}`).innerHTML=d.day.condition.text;
    document.querySelector(`.img-${i}`).src=`https://${d.day.condition.icon}`;
  })
}

displayCurrentCity();

async function displayAnyCity(city){
  const res=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=adef4456af434f56bee84914241806&q=${city}&days=6`)
  const data=await res.json();
  document.querySelector('.countryname').innerHTML=data.location.country;
  document.querySelector('.cityname').innerHTML=data.location.name;
  const allDays=data.forecast.forecastday;//array of objects
  const day1Date=new Date(allDays[0].date).toLocaleString('en-us',{day:"numeric",month:'short',year:'numeric'});
  document.querySelector('.date-0').innerHTML=day1Date;
  allDays.forEach((d,i)=>{
    document.querySelector(`.day-${i}`).innerHTML= new Date(d.date).toLocaleString('en-us',{weekday:'long'});
    document.querySelector(`.degree-${i}`).innerHTML=`${d.day.maxtemp_c}&deg;c`;
    document.querySelector(`.state-${i}`).innerHTML=d.day.condition.text;
    document.querySelector(`.img-${i}`).src=`https://${d.day.condition.icon}`;
  })
}

document.querySelector('.search').addEventListener('input',function(e){
  displayAnyCity(e.target.value);
})