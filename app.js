                                                    // dayTime

// la fonction affiche la date et l'heure
function afficheLaDate(){
    let jour = document.querySelector(".date")
    let heure = document.querySelector(".heure")
    let D = new Date()
    let date = D.toLocaleDateString()
    let time = D.toLocaleTimeString()
    jour.innerHTML =`<p>${date}</p>`
    heure.innerHTML =`<p>${time}</p>`
    requestAnimationFrame(afficheLaDate)
}
afficheLaDate()


                                                    // jourNuit

// la fonction affiche si c'est le jour ou la nuit
function jourNuit(){
    let moment = document.getElementById("moment")
    let D = new Date()
    let time = D.toLocaleTimeString()
    let T = time.split(":")
    let J = T[0]
        if(J>=8 && J<=20){
            moment.classList.add("iconeJour")
        }else{
            moment.classList.add("iconeNuit")
        }
}
jourNuit()

// background dynamique
function background(code){
    let bg = document.querySelector(".grid")
    if(code === 0){
        bg.classList.add("bgSoleil")
    }else if(code>=1 && code<=3){
        bg.classList.add("bgCouvert")
    }else if(code>=45 && code<=48){
        bg.classList.add("bgNuageux")
    }else if(code>=51 && code<=67 || code>=80 && code<=82){
        bg.classList.add("bgPluvieux")
    }else if(code>=95 && code<=99){
        bg.classList.add("bgOrageux")
    }else if(code>=71 && code<=77 || code>=85 && code<=86){
        bg.classList.add("bgNeigeux")
    }
}


                                                    // currentWeather

// la fonction affiche l'appelation et le picto du temps actuel
function tempsDuJour(code){
    let temps = document.querySelector(".tempsActuel")
    let picto = document.querySelector(".pictoWeather")
    if(code === 0){
            temps.innerHTML = `<p class="tempsActuel">Ensoleillé</p>`
            picto.classList.add("soleil")
    }else if(code>=1 && code<=3){
            temps.innerHTML = `<p class="tempsActuel">Couvert</p>`
            picto.classList.add("couvert")
    }else if(code>=45 && code<=48){
        temps.innerHTML = `<p class="tempsActuel">Nuageux</p>`
        picto.classList.add("nuageux")
    }else if(code>=51 && code<=67 || code>=80 && code<=82){
        temps.innerHTML = `<p class="tempsActuel">Pluvieux</p>`
        picto.classList.add("pluvieux")
    }else if(code>=95 && code<=99){
        temps.innerHTML = `<p class="tempsActuel">Orageux</p>`
        picto.classList.add("orageux")
    }else if(code>=71 && code<=77 || code>=85 && code<=86){
        temps.innerHTML = `<p class="tempsActuel">Neigeux</p>`
        picto.classList.add("neigeux")
    }
}

// la fonction affiche la température actuelle
function temperatureDuJour(code){
    let temps = document.querySelector(".temperatureActuelle")
    temps.innerHTML = `<p class="temperatureActuelle">${code}°C</p>`
}

                                                    //boussole

// la fonction affiche la direction du vent
function directionVent(code){
    let vent = document.querySelector(".arrow")
    vent.style.rotate = `${code}deg`
}

// la fonction affiche le vitesse du vent
function vitesseVent(code){
    let vent = document.querySelector(".vitesseVent")
    vent.innerHTML = `<p class="vitesseVent">${code} km/h</p>`
}


                                                    // weatherPerHour

// la fonction ajoute les cartes weatherPerHour

function tempsParHeure(codes){
    let item = document.querySelector(".parHeure")
        for (let i = 0; i <= 23; i++) {
            const temp = codes.temperature_2m[i];
            const preci = codes.rain[i]
            let T = codes.time[i].split("T")
            const heure = T[1]
            item.innerHTML+= `<div class="carouselItem glassItem flex">
            <div class="slide flex">
                <div class="picto"><img class="pictoTemp" src="./img/thermometer.png" alt=""></div><p>${temp}°C</p>
            </div>
            <div class="slide flex">
                <div class="picto"><img class="pictoPara" src="./img/umbrella.png" alt=""></div><p>${preci}mm</p>
            </div>
            <div class="heureSlide"><p>${heure}</p></div>
        </div>`            
        }
}

                                                    // weatherPerDay


// la fonction lit le daily.weather-code pour retourner une classe utilisable par la fonction tempsParJour
function dailyPicto (code){
    let pictoPetit = ""
    if(code === 0){
        return pictoPetit = "soleilPetit"
    }else if(code>=1 && code<=3){
        return pictoPetit = "couvertPetit"
    }else if(code>=45 && code<=48){
        return pictoPetit = "nuageuxPetit"
    }else if(code>=51 && code<=67 || code>=80 && code<=82){
        return pictoPetit = "pluvieuxPetit"
    }else if(code>=95 && code<=99){
        return pictoPetit = "orageuxPetit"
    }else if(code>=71 && code<=77 || code>=85 && code<=86){
        return pictoPetit = "neigeuxPetit"
    } 
}
// la fonction ajoute les carte weatherPerDay

function tempsParJour(codes){
    let item = document.querySelector(".parJour")
        for (let i = 1; i < codes.time.length; i++) {
            let picto = dailyPicto(codes.weather_code[i])
            const tempMax = codes.temperature_2m_max[i];
            const tempMin = codes.temperature_2m_min[i]
            const heure = codes.time[i] 
            item.innerHTML+= `<div class="dayContainer glassItem flex">
            <p class="dayDate">${heure}</p>
            <div class="pictoPetit ${picto}"></div>
            <p class="dayTempMax">${tempMax}°C</p>
            <p class="dayTempMin">${tempMin}°C</p>
            </div>`      
        }
}

//GEOLOC
// La méthode Geolocation.getCurrentPosition() fournit la position actuelle de l'appareil.
// on applique la methode sur le navigateur qui prend la fonction position comme argument
navigator.geolocation.getCurrentPosition(position => {
    // sur l'objet position on recupere la latitude et la longitude 
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    // appel de la fonction fetch via la fonction url
    // asynchrone : tant que les données ne sont pas disponibles la suite n'est pas executé
    url(latitude, longitude);
    //loca commune
    let urlCommune = `https://geo.api.gouv.fr/communes?lat=${latitude}&lon=${longitude}&fields=code,nom,codesPostaux,surface,population,centre,contour`
    fetch(urlCommune)
    .then(res=>{
        return res.json()
    })
    .then(rep=>{
        addVille(rep[0].nom,rep[0].codesPostaux[0])
    })
});
/** recupération des données open meteo via fonction fetch/json
@param {number} latitude 
@param {number} longitude 
*/
function url(latitude, longitude) { 
// recuperation des données au format json
fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=weather_code,temperature_2m,precipitation,is_day,snowfall,cloud_cover,wind_speed_10m,wind_direction_10m&hourly=weather_code,temperature_2m,rain,cloud_cover,wind_speed_80m,wind_direction_80m,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,snowfall_sum&timezone=auto`)
.then(data =>{
    return data.json()
})
.then(weather =>{
    // temps en direct
    background(weather.current.weather_code)
    tempsDuJour(weather.current.weather_code)
    temperatureDuJour(weather.current.temperature_2m)
    directionVent(weather.current.wind_direction_10m)
    vitesseVent(weather.current.wind_speed_10m)

    // temps par heure
    tempsParHeure(weather.hourly)

    // temps pour les 6 prochains jours
    dailyPicto(weather.daily.weather_code)
    tempsParJour(weather.daily)
})
}

let vide = document.querySelector(".vide2")

function addVille(X,Y) {
    vide.innerHTML = `<p>${Y} ${X}</p>` 
}
