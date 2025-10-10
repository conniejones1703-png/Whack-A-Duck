let score = 0;
let timeLeft = 30;
let moleTimer = null;
let gameTimer = null;
let activeMole = null;
let level = 1;
let scoreGoal = 10;
let moleSpeed = 900;

function randomHole() {
    const holes = document.querySelectorAll(".hole");
    console.log("Holes found:", holes); // Debugging
    if (holes.length === 0) {
        console.error("No holes found in the DOM!");
        return null;
    }
    const randomIndex = Math.floor(Math.random() * holes.length);
    return holes[randomIndex];
}

function showMole() {
    if (activeMole && activeMole.parentNode) {
        activeMole.remove();
    }

    const mole = document.createElement("div"); 
    mole.classList.add("mole");
    mole.onclick = hitMole;

    const hole = randomHole();
    if (!hole) {
        console.error("No valid hole found!");
        return;
    }

    console.log("Adding mole to hole:", hole); // Debugging
    hole.appendChild(mole);
    activeMole = mole;
}

function startGame() {
    if (moleTimer) clearInterval(moleTimer);
    if (gameTimer) clearInterval(gameTimer);

    score = 0;
    timeLeft = 30;
    level = 1;
    scoreGoal = 10;
    moleSpeed = 900;
    document.getElementById("score").textContent = score;
    document.getElementById("time-left").textContent = timeLeft;
    document.getElementById("level").textContent = level;

    moleTimer = setInterval(showMole, moleSpeed);
    gameTimer = setInterval(countdown, 1000);
}

function hitMole() {
    score++;
    document.getElementById("score").textContent = score;
    if (activeMole && activeMole.parentNode) {
        activeMole.remove();
    }
    activeMole = null;

    if (score >= scoreGoal) {
        nextLevel();
    }
}

function countdown() {
    timeLeft--;
    document.getElementById("time-left").textContent = timeLeft;

    if (timeLeft === 0) {
        clearInterval(moleTimer);
        clearInterval(gameTimer);
        alert(`Game Over! Final Score: ${score} (Level ${level})`);
    }
}

function nextLevel() {
    clearInterval(moleTimer);
    clearInterval(gameTimer);
    level++;
    document.getElementById("level").textContent = level;
    moleSpeed = Math.max(400, moleSpeed - 150);
    scoreGoal += 10;
    score = 0;
    timeLeft = 30;
    document.getElementById("score").textContent = score;
    document.getElementById("time-left").textContent = timeLeft;

    alert(`Level ${level}! Ducks are faster!`);
    moleTimer = setInterval(showMole, moleSpeed);
    gameTimer = setInterval(countdown, 1000);
}