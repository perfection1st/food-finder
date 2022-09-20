/// Empty user object to store methods and user location data
// Strict mode
"use strict";

// Empty object to store user data
let user = {};
let map = document.getElementById('map');
// Create container
let container = document.getElementById('container');

// Instantiate current food
let currentFood = "mexican";

introJs().setOptions({
  steps: [
  {
    title: `Ahoy mate!`,
    intro: `<p>I'm captain Jeff! Here to steer you on the right course to find some delicious food!</p><p>First things first, share your location so I can use my telescope!<img src="images/cpt-jeff.png"></p>`
  },
  {
    title: 'Hoist your sails!',
    element: document.querySelector('#container'),
    intro: `
    <div class="bubble bubble-bottom-left">
    <p>Excellent!</p><p>Select your favorite kind of food and I'll AskJeff&#8482; to see what I can find!</p>
    </div>
        
    <img src="images/cpt-jeff.png">
    `,
    position: 'left'
  }]
}).start();

// Request user's location
getLocation();

function getLocation() {
  (navigator.geolocation) ? navigator.geolocation.getCurrentPosition(drawMap, deniedLocation) : alert("Sorry, browser does not support geolocation!");
}

// User accepts GPS location
function drawMap(position) {
  // Populate user object with provided location data
  user.lat = position.coords.latitude;
  user.long = position.coords.longitude;
  user.acc = position.coords.accuracy;
  user.locationType = "GPS";


// Create and append heading
let heading = document.createElement('h4');
heading.innerText = "Pick your favorite!";
container.appendChild(heading);

// List of food buttons (property is food type, value is HTML icon code)

let foods = {
  mexican: "&#129361;",
  chinese: "&#129377;",
  italian: "&#129366;",
  american: "&#127828;",
  seafood: "&#127844;",
  fastfood: "&#127839;"
}

let foodButtonList = document.createElement('ul');
foodButtonList.setAttribute('id', 'select-food');
foodButtonList.setAttribute('data-intro', `Hello step one!`);
for(let food in foods) {
  let list = document.createElement('li');
  list.innerHTML = `
  <button id="${food}" type="button" class="btn btn-light">${food} <span class="icon">${foods[food]}</span></button>
  `;
  foodButtonList.appendChild(list);
}
container.appendChild(foodButtonList);

let buttons = document.querySelectorAll('ul#select-food li button');

for(let button of buttons) {
  button.addEventListener('click', function() {
    currentFood = this.id;
    getMap();
  });
}

  // Generate google map with user's food choice
  function getMap() {
    map.src = `https://www.google.com/maps/embed/v1/search?key=AIzaSyAhaRS-k3_apEbPTMy-e4KQYdqhLjkF1rc&q=${currentFood}+food+near+${user.lat} + ${user.long}&zoom=12`;
    document.body.style.backgroundImage = "none";
  }

    // Display user provided data
    let userdata = document.createElement('div');
    userdata.innerHTML = `
    <ul class="list-group">
      <li class="list-group-item d-flex justify-content-between align-items-center">Coordinates:&nbsp; <span class="badge bg-primary rounded-pill">${user.lat}, ${user.long}</span></li>
      <li class="list-group-item d-flex justify-content-between align-items-center">Location method: <span class="badge bg-primary rounded-pill">${user.locationType}</span></li>
      <li class="list-group-item d-flex justify-content-between align-items-center">Location accuracy: <span class="badge bg-${user.acc > 200 ? 'danger' : 'success'} rounded-pill">${user.acc > 200 ? 'Low' : 'Hi'}</span></li>
    </ul>
    `;
  
  container.append(userdata);


} // /end accepted location

// User denies GPS location error handler
function deniedLocation(err) {
  if(err.code == 1) {
     getLocation();
  } else if( err.code == 2) {
     alert("Error: Position is unavailable!");
  }

}