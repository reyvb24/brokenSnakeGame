document.addEventListener("DOMContentLoaded", () => {

	// onclick events
	document.getElementById("easy").addEventListener("click", function() {setSpeed("easy")}, false);
	document.getElementById("medium").addEventListener("click", function() {setSpeed("medium")}, false);
	document.getElementById("hard").addEventListener("click", function() {setSpeed("hard")}, false);

	// variables declaration
	var MAXLENGTH = 30;
	var snakeX = [250];
	var snakeY = [200];
	var started = false;
	var moved = false;
	var speed = 250;

	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var snakeLength = 1;

	var appleX = Math.floor(Math.random() * ((canvas.width - 50)/50 + 1)) * 50;
	var appleY = Math.floor(Math.random() * ((canvas.height - 50)/50 + 1)) * 50;

	document.addEventListener("keydown", move, false);

	if(localStorage.getItem("snake-highscore"))
		document.getElementById("highscore").innerHTML = "High Score: " + localStorage.getItem("snake-highscore");

	var rightPressed = true;
	var leftPressed = false;
	var upPressed = false;
	var downPressed = false;

	var score = 0;

	// function to move after any event
	function move(event) {
		started = true;
		if (!moved) {
			// onclick right arrow condition 
			if(event.code == "ArrowRight" && !leftPressed) {
				rightPressed = true;
				leftPressed = false;
				upPressed = false;
				downPressed = false;
			// onclick left arrow condition
			}else if(event.code == "ArrowLeft" && !rightPressed) {
				leftPressed = true;
				rightPressed = false;
				upPressed = false;
				downPressed = false;
			// onclick down arrow condition
			}else if(event.code == "ArrowDown" && !upPressed) {
				downPressed = true;
				leftPressed = false;
				rightPressed = false;
				upPressed = false;
			// onclick up arrow condition
			}else if(event.code == "ArrowUp" && !downPressed) {
				upPressed = true;
				leftPressed = false;
				rightPressed = false;
				downPressed = false;
			}
			moved = true;
		}
	}

	// function to draw the head of the snake
	function drawHead() {
		// only run this part when the game has already started (user has made an input)
		if (started) {
			if(rightPressed){
				if(snakeX[0] != canvas.width - 50){
					snakeX.unshift(snakeX[0]+50);
					snakeY.unshift(snakeY[0]);
					if (!collisionCheck() || snakeLength>MAXLENGTH) {
						snakeX.pop();
						snakeY.pop();
					} else {
						snakeLength++;
					}
				}
				else
					death();
				
			}else if(leftPressed){
				if(snakeX[0] != 0) {
					snakeX.unshift(snakeX[0]-50);
					snakeY.unshift(snakeY[0]);
					if (!collisionCheck()) {
						snakeX.pop();
						snakeY.pop();
					} else {
						snakeLength++;
					}
				}
				else
					death();
				
			}else if(downPressed){
				if(snakeY[0] != canvas.height - 50) {
					snakeX.unshift(snakeX[0]);
					snakeY.unshift(snakeY[0]+50);
					if (!collisionCheck()) {
						snakeX.pop();
						snakeY.pop();
					} else {
						snakeLength++;
					}
				}
				else
					death();
			}else if(upPressed){
				if(snakeY[0] != 0) {
					snakeX.unshift(snakeX[0]);
					snakeY.unshift(snakeY[0]-50);
					if (!collisionCheck()) {
						snakeX.pop();
						snakeY.pop();
					} else {
						snakeLength++;
					}
				}
				else
					death();
			}
		}
		var img = document.getElementById("image");
		ctx.drawImage(img, snakeX[0], snakeY[0], 50, 50);
	}

	// function to draw the snake's body
	function drawSnake(){
		for (let i = 1; i<snakeLength; i++) {
			ctx.rect(snakeX[i], snakeY[i], 50, 50);
		}
		ctx.fillStyle = "#50C878";
		ctx.fill();

		for (let i = 0; i<snakeLength; i++) {
			if (i>0) {
				if (snakeX[0] === snakeX[i] && snakeY[0] === snakeY[i]) {
					death();
				}
			}	
		}
	}

	// function to run if snake is dead
	function death(){
		started = false;
		snakeLength = 1;
		snakeX = [snakeX[0]];
		snakeY = [snakeY[0]];
		alert("YOU DIED");
		upPressed = false;
		leftPressed = false;
		rightPressed = false;
		downPressed = false;

		highScore();
		
		document.getElementById("highscore").innerHTML =  "High Score: " + localStorage.getItem("snake-highscore");
		score = 0;
		document.getElementById("score").innerHTML =  "Score: " + score;

	}

	// function to check whether the snake has hit an apple ot not
	function collisionCheck(){
		if(snakeX[0] == appleX & snakeY[0] == appleY){
			appleX = Math.floor(Math.random() * ((canvas.width - 50)/50 + 1)) * 50;
			appleY = Math.floor(Math.random() * ((canvas.height - 50)/50 + 1)) * 50;
			score++;
			document.getElementById("score").innerHTML =  "Score: " + score;
			return true;
		}
		return false;
	}

	// function to draw apple
	function drawApple(){
		ctx.rect(appleX, appleY, 50, 50);
		ctx.fillStyle = "red";
		ctx.fill();
	}

	// function to draw the whole canvas
	function draw(){
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		ctx.beginPath();
		drawHead();
		ctx.closePath();

		ctx.beginPath();
		drawSnake();
		ctx.closePath();

		ctx.beginPath();
		drawApple();
		ctx.closePath();

		moved = false;
		
	}

	// function for setting the high score
	function highScore(){
		if(!localStorage.getItem("snake-highscore")){
			localStorage.setItem("snake-highscore", 0);
		}else{
			if(localStorage.getItem("snake-highscore") < score){
				localStorage.setItem("snake-highscore", score);
			}
		}
		
	}

	// function to set the speed of the snake game
	function setSpeed(spd) {
		if (!started) {
			if (spd === "easy") {
				document.getElementById("easy").classList.add("toggle");
				document.getElementById("medium").classList.remove("toggle");
				document.getElementById("hard").classList.remove("toggle");
				speed = 250;
				clearInterval(start);
				start = setInterval(draw, speed);
			} else if (spd === "medium") {
				document.getElementById("easy").classList.remove("toggle");
				document.getElementById("medium").classList.add("toggle");
				document.getElementById("hard").classList.remove("toggle");
				speed = 200;
				clearInterval(start);
				start = setInterval(draw, speed);
			} else if (spd === "hard") {
				document.getElementById("easy").classList.remove("toggle");
				document.getElementById("medium").classList.remove("toggle");
				document.getElementById("hard").classList.add("toggle");
				speed = 150;
				clearInterval(start);
				start = setInterval(draw, speed);
			}
		}
	}

	// start the game
	var start = setInterval(draw, speed);
	
});