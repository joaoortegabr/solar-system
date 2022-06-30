const solarSystem = document.getElementById('solar-system');
const planetData = document.getElementById('planet-data');
const infoImg = document.querySelector('.info-img');
const infoText = document.querySelector('.info-text');

planetData.addEventListener('click', closeData);

function getPlanets() {

    const planetsList = "./planets.json";
    const options = {
        method: 'GET',
        cache: 'default'
    }

    fetch(planetsList, options)
        .then(response => response.json())
        .then(data => {

            for (let i in data) {
                const planet = document.createElement('div');
                planet.setAttribute("id", i);
                planet.style.minHeight = `${data[i].diameter/1000}px`;
                planet.style.minWidth = `${data[i].diameter/1000}px`;
                planet.style.backgroundImage = `url('./img/shadow.png'), url('./img/tex-${data[i].name}.png`;
                planet.classList.add('planet');
                planet.classList.add(`gravitate${random(1,4)}`);
                
                planet.addEventListener('click', () => {
                    showInfo(planet.getAttribute('id'));
                });
                solarSystem.appendChild(planet);
            }
        })
        .catch(e => console.log("Erro: " + e.message));
    ;
}


function showInfo(planet) {

    planetData.style.display = 'block';
    const planetsList = "./planets.json";
    const options = {
        method: 'GET',
        cache: 'default'
    }

    fetch(planetsList, options)
        .then(response => response.json())
        .then(data => {

            i = planet;
            if (data[i].name == "Saturn") {
                infoImg.classList.add('rotate');
                infoImg.innerHTML = `
                <img src="./img/ring.png" class="saturn-ring">                    
                <img src="./img/shadow.png" class="info-shadow">                    
                <img src="./img/tex-${data[i].name}.png" class="info-img" alt="${data[i].name}">
                `
            } else {
                infoImg.classList.remove('rotate');
                infoImg.innerHTML = `
                    <img src="./img/shadow.png" class="info-shadow">                    
                    <img src="./img/tex-${data[i].name}.png" class="info-img" alt="${data[i].name}">
                    `
            }

            infoText.innerHTML = `
                <h2>${data[i].name}</h2>
                <div style="text-align: left;">
                    Position: ${parseInt(i) + 1}º<br />
                    Mass compared to Earth: ${parseFloat(data[i].mass)}<br />
                    Volume compared to Earth: ${parseFloat(data[i].volume)}<br />
                    Gravity compared to Earth: ${parseFloat(data[i].gravity)}<br />
                    Distance to Sun: ${parseFloat(data[i].distance)} km<br />
                    Average temperature: ${(data[i].temperature)}<br />
                    Rotation period: ${(data[i].rotation)}<br />
                    Revolution period around the Sun: ${(data[i].translation)}
                </div>`;
            
        })
        .catch(e => console.log("Erro: " + e.message));
    ;
}





function closeData() {
    planetData.style.display = 'none';
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}


getPlanets();