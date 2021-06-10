
document.addEventListener("DOMContentLoaded", () => {
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");

	// this function is to draw the whole canvas
	function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		ctx.rect(0, 0, 50, 50);
		ctx.fillStyle = "red";
		ctx.fill();
		
		ctx.closePath();
	}
	// this function is to handle the event when the snake is dead
	function death() {
		alert("YOU DIED");
	}
	// this function is to take user input and move the snake in that direction
	function move(event) {

		if(event.code == "ArrowRight") {
				rightPressed = true;
				leftPressed = false;
				upPressed = false;
				downPressed = false;
		}

		switch(event.code) {
			case "KeyA":
				doSomething();
				break;
			case "ArrowUp":
				doSomethingElse();
				break;
		}
	}
	// this function is to set the speed of the snake
	function setSpeed() {function setSpeed(spd) {
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
	}}
	// this function is to check whether the snake has hit an apple or not
	function collisionCheck() {
		if(snakeX[0] == appleX & snakeY[0] == appleY){
			score++;
			create apple on a random coordinate;
			add the length of the snake;

		}
	}
	// this function is to set the score and set the high score
	function highScore() {}
	// this function is to set the speed according to the difficulty
	function setSpeed() {}
});

