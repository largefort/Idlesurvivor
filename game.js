// Game variables
let resources = {
    food: 0,
    water: 0,
    health: 100,
};

let day = 1;
let timeOfDay = 'Day';

// Game loop
function gameLoop() {
    // Update game elements
    updateResources();
    updateDayNightCycle();

    // Render game elements
    render();

    // Repeat the game loop
    requestAnimationFrame(gameLoop);
}

// Update resources
function updateResources() {
    resources.food += 0.5; // Increment food over time
    resources.water += 0.5; // Increment water over time
    resources.health -= 0.05; // Health gradually decreases

    // Ensure health doesn't go below 0
    resources.health = Math.max(resources.health, 0);
}

// Update the day-night cycle
function updateDayNightCycle() {
    // Each day lasts for 60 seconds, divided into day and night
    const secondsPerDay = 60;
    const secondsPerHalfDay = secondsPerDay / 2;

    // Calculate the current time of day
    const currentTime = (day - 1) * secondsPerDay + (performance.now() % secondsPerDay);
    timeOfDay = currentTime < secondsPerHalfDay ? 'Day' : 'Night';

    // If the day ends, reset resources
    if (currentTime >= secondsPerDay) {
        day++;
        resources.food = 0;
        resources.water = 0;
        resources.health = 100;
    }
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

    resources.food += randomFood;
    resources.water += randomWater;
}

// Render game elements
function render() {
    // Display resources and stats on the screen
    document.getElementById('food-stat').innerText = `Food: ${Math.floor(resources.food)}`;
    document.getElementById('water-stat').innerText = `Water: ${Math.floor(resources.water)}`;
    document.getElementById('health-stat').innerText = `Health: ${resources.health.toFixed(2)}%`;
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
