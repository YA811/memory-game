//constants
const tilesContainer = document.querySelector(".tiles");
const colors = ["aqua", "aquamarine", "crimson", "blue", "dodgerblue", "gold", "greenyellow", "teal"];
const colorsPicklist = [...colors, ...colors];
const tileCount = colorsPicklist.length;

//variables
let revealedCount = 0;
let activeTile = null;
let awaitingEndOfMove = false;
let timerInterval;
let timeRemaining = 60;




// Game state
function buildTile(color) {
	const element = document.createElement("div");

	element.classList.add("tile");
	element.setAttribute("data-color", color);
	element.setAttribute("data-revealed", "false");

	element.addEventListener("click", () => {
		const revealed = element.getAttribute("data-revealed");

		if (
			awaitingEndOfMove
			|| revealed === "true"
			|| element == activeTile
		) {
			return;
		}

		// Reveal this color
		element.style.backgroundColor = color;

		if (!activeTile) {
			activeTile = element;

			return;
		}

		const colorToMatch = activeTile.getAttribute("data-color");

		if (colorToMatch === color) {
			element.setAttribute("data-revealed", "true");
			activeTile.setAttribute("data-revealed", "true");

			activeTile = null;
			awaitingEndOfMove = false;
			revealedCount += 2;

			if (revealedCount === tileCount) {
				stopTimer();
				alert("You win! Click reset to start again.");
			}

			return;
		}

		awaitingEndOfMove = true;

		setTimeout(() => {
			activeTile.style.backgroundColor = null;
			element.style.backgroundColor = null;

			awaitingEndOfMove = false;
			activeTile = null;
		}, 1000);
	});

	return element;
}

// Start timer
function startTimer(){
	timeRemaining= 60;
	document.getElementById('timer').innerText = `Time: ${timeRemaining}s`;

	timerInterval = setInterval(()=>{
		timeRemaining--;
		document.getElementById('timer').innerText = `Time: ${timeRemaining}s`;

		if(timeRemaining<=0){
			clearInterval(timerInterval);
			endGame();
		}
	}, 1000);
}

function stopTimer(){
	clearInterval(timerInterval);
}

function endGame(){
    stopTimer();
    alert("Time's up! you lost!");
}



// Build up tiles
for (let i = 0; i < tileCount; i++) {
	const randomIndex = Math.floor(Math.random() * colorsPicklist.length);
	const color = colorsPicklist[randomIndex];
	const tile = buildTile(color);

	colorsPicklist.splice(randomIndex, 1);
	tilesContainer.appendChild(tile);
}


//buttons
document.getElementById('startButton').addEventListener('click',()=>{
	startTimer();
	
});

document.getElementById('resetButton').addEventListener('click',()=>{
    window.location.reload();
});