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
const planetsContainer = document.getElementById("planets");
let getPlanetId ="";




const getAPIKey = async () => {
        const response = await fetch(`${API_URL_KEY}/key`);
    const data = await response.json();
    solarisKey = data.key;
    console.log(data.key );
    return data;
}   

// Hämta planeter med API-nyckeln
const getPlanets = async () => {
    let response = await fetch(`${API_URL_KEY}/bodies`, {
    method: 'GET',
headers: {'x-zocom':  `${solarisKey}` }
});
    const data = await response.json();
    console.log(data);
    planets = data.bodies;
    return data;
}   

const planetClick =(planet)=>{
console.log(planet);
let planetInfo =planets.filter(p => {
    if(p.name === planet){
        console.log(p);
       return p;
        
    }
}
)
  planetsContainer.innerHTML = `<div  class="planet-info">
       <h2>${planetInfo[0].name} </h2>
         <p>${planetInfo[0].desc} </p>
    
        <button onclick="location.reload()">Tillbaka</button>
        </div>`;

}



getAPIKey()
  .then(() => getPlanets())              // vänta på nyckeln, hämta planeter
  .then(() => {
    console.log("Planeter hämtade:", planets);  
    planets.map(planet => {
        console.log(planet )
        planetsContainer.innerHTML += `<div onclick="planetClick('${planet.name}')" id="${planet.name}" class="planet">
       <h2>${planet.name} </h2>
       <img src="./images/${planet.name}.webp" alt="sun" width="150px" />
        
        </div>`;    
    });
  })
  .catch(err => console.error("Fel:", err));


  

 