const solarSystem = document.getElementById('solar-system');
const planetData = document.querySelector('.planet-data');
const planetImg = document.querySelector('.planet-img');
const planetInfo = document.querySelector('.planet-info');

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
                planet.style.minHeight = `${data[i].diameter/1000}px`;
                planet.style.minWidth = `${data[i].diameter/1000}px`;
                planet.style.backgroundImage = `url('./img/shadow.png'), url('./img/tex-${data[i].name}.png`;
                planet.classList.add('planet');
                planet.classList.add(`gravitate${random(1,4)}`);
                planetData.style.display = 'none';
                planetInfo.innerHTML = `Order: ${data[i].order}<br />
                                        Name: ${data[i].name}<br />
                                        Mass compared to Earth: ${parseFloat(data[i].mass)}<br />
                                        Volume compared to Earth: ${parseFloat(data[i].volume)}<br />
                                        Gravity compared to Earth: ${parseFloat(data[i].gravity)}<br />
                                        Distance to Sun: ${parseFloat(data[i].distance)}<br />
                                        Average temperature: ${(data[i].temperature)}<br />
                                        Rotation period: ${(data[i].rotation)}<br />
                                        Revolution period around the Sun: ${(data[i].translation)}<br />
                                        `;
                // planet.addEventListener('click', showInfo);
                solarSystem.appendChild(planet);

            }
        })
        .catch(e => console.log("Erro: " + e.message));
    ;
}

function showInfo() {
    planetData.style.display = 'block';
}

function closeData() {
    this.style.display = 'none';
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}


getPlanets();   
