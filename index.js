/* inställningar för stjärnorna*/
tsParticles.load("tsparticles", {
  background: {
    color: "#000"
  },
  particles: {
    number: {
      value: 120
    },
    size: {
      value: 2
    },
    move: {
      enable: true,
      speed: 0.5
    },
    opacity: {
      value: 0.8
    },
    color: {
      value: "#ffffff"
    },
    shape: {
      type: "circle"
    }
  }
});


const API_URL_KEY = "https://4a6l0o1px9.execute-api.eu-north-1.amazonaws.com";
let solarisKey = "";
let planets = [];
/* Container där all innehåll läggs*/
const planetsContainer = document.getElementById("planets");
console.log("Skapad av Hosein Moustafa");



/* Hämtar api nyckeln*/ 
const getAPIKey = async () => {
        const response = await fetch(`${API_URL_KEY}/key`);
    const data = await response.json();
    solarisKey = data.key;
    return data;
}   

// Hämta planeter med API-nyckeln
const getPlanets = async () => {
    let response = await fetch(`${API_URL_KEY}/bodies`, {
    method: 'GET',
headers: {'x-zocom':  `${solarisKey}` }
});
    const data = await response.json();
    planets = data.bodies;
    return data;
}   
/*Klicka på en planet för att få dess information, körs när man väljer en planet */
const planetClick =(planet)=>{
  /* Sparar informationen här*/
let planetInfo =planets.filter(p => {
    if(p.name === planet){
       return p; 
    }
}
)
console.log(planetInfo);
  planetsContainer.innerHTML = `<div  class="planet-info">
  <img src="./images/${planetInfo[0].name}.webp" alt=${planetInfo[0].name} width="150px" />
       <h2>${planetInfo[0].name} (${planetInfo[0].latinName})</h2>  
         <p>${planetInfo[0].desc} </p>
          <p><strong>Omkrets:</strong> ${planetInfo[0].circumference} km</p>
        <button onclick="location.reload()">Tillbaka</button>
        </div>`;

}



getAPIKey()
  .then(() => getPlanets())              // vänta på nyckeln, hämta planeter
  .then(() => {
    planets.map(planet => {
       /* mappar över alla planeter, lägger en onclick på planeterna så att jag vet vilken som väljs och skriver över nya informationen på sidan */
        planetsContainer.innerHTML += `<div onclick="planetClick('${planet.name}')" id="${planet.name}" class="planet">
       <h2>${planet.name} </h2>
       <img src="./images/${planet.name}.webp" alt=${planet.name} width="150px" />
        
        </div>`;    
    });
  })
  .catch(err => console.error("Fel:", err));


  

 