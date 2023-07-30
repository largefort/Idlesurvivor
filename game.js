// Game variables
let resources = {
    food: 0,
    water: 0,
    health: 100,
    wood: 0,
    stone: 0,
};

let day = 1;
let timeOfDay = 'Day';

// Load game data from local storage, if available
if (localStorage.getItem('idleSurvivorGame')) {
    resources = JSON.parse(localStorage.getItem('idleSurvivorGame'));
}

// Game loop
function gameLoop() {
    // Update game elements
    updateResources();
    updateDayNightCycle();

    // Render game elements
    render();

    // Save game data to local storage
    saveGame();

    // Repeat the game loop
    requestAnimationFrame(gameLoop);
}

// Update resources
function updateResources() {
    resources.food += 0.5; // Increment food over time
    resources.water += 0.5; // Increment water over time
    resources.health -= 0.05; // Health gradually decreases

    // Ensure health doesn't go below 0 or above 100
    resources.health = Math.min(Math.max(resources.health, 0), 100);
}

// Update the day-night cycle
function updateDayNightCycle() {
    // Each day lasts for 60 seconds, divided into day and night
    const secondsPerDay = 60;
    const secondsPerHalfDay = secondsPerDay / 2;

    // Calculate the current time of day
    const currentTime = (day - 1) * secondsPerDay + (performance.now() % secondsPerDay);
    timeOfDay = currentTime < secondsPerHalfDay ? 'Day' : 'Night';

    // If the day ends, reset resources and trigger events
    if (currentTime >= secondsPerDay) {
        day++;
        resources.food = 0;
        resources.water = 0;
        resources.health = 100;

        // Random event: Day-end event
        const dayEndEvent = Math.random();
        if (dayEndEvent < 0.2) {
            // 20% chance of a positive event
            resources.wood += 5;
            resources.stone += 5;
            showEventMessage("You found some resources in the forest!");
        } else if (dayEndEvent < 0.4) {
            // 20% chance of a negative event
            resources.health -= 10;
            showEventMessage("You caught a cold during the night!");
        }
    }
}

// Show event message
function showEventMessage(message) {
    const eventElement = document.getElementById('event-message');
    eventElement.innerText = message;
    eventElement.style.visibility = 'visible';

    // Hide the event message after 3 seconds
    setTimeout(() => {
        eventElement.style.visibility = 'hidden';
    }, 3000);
}

// Collect food
function collectFood() {
    resources.food += 10;
}

// Collect water
function collectWater() {
    resources.water += 10;
}

// Craft items
function craftItems() {
    if (resources.food >= 5 && resources.water >= 5) {
        resources.food -= 5;
        resources.water -= 5;
        resources.health += 10;
    }
}

// Explore for resources
function explore() {
    const randomFood = Math.random() * 5 + 1;
    const randomWater = Math.random() * 5 + 1;
    const randomWood = Math.random() * 3 + 1;
    const randomStone = Math.random() * 2 + 1;

    resources.food += randomFood;
    resources.water += randomWater;
    resources.wood += randomWood;
    resources.stone += randomStone;
}

// Render game elements
function render() {
    // Display resources and stats on the screen
    document.getElementById('food-stat').innerText = `Food: ${Math.floor(resources.food)}`;
    document.getElementById('water-stat').innerText = `Water: ${Math.floor(resources.water)}`;
    document.getElementById('health-stat').innerText = `Health: ${resources.health.toFixed(2)}%`;
    document.getElementById('wood-stat').innerText = `Wood: ${Math.floor(resources.wood)}`;
    document.getElementById('stone-stat').innerText = `Stone: ${Math.floor(resources.stone)}`;
    document.getElementById('day-stat').innerText = `Day: ${day}`;
    document.getElementById('time-stat').innerText = `Time: ${timeOfDay}`;
}

// Add event listeners to resource buttons and explore button
document.getElementById('food-btn').addEventListener('click', collectFood);
document.getElementById('water-btn').addEventListener('click', collectWater);
document.getElementById('craft-btn').addEventListener('click', craftItems);
document.getElementById('explore-btn').addEventListener('click', explore);

// Start the game loop
gameLoop();
