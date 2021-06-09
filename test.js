
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
	function death() {}
	// this function is to take user input and move the snake in that direction
	function move(event) {
		switch(event.code) {
			case "KeyA":
				doSomething();
				break;
			case "ArrowUp":
				doSomethingElse();
				break;
		}
	}
	// this function is to check whether the snake has hit an apple or not
	function collisionCheck() {}
	// this function is to set the score and set the high score
	function highScore() {}
	// this function is to set the speed according to the difficulty
	function setSpeed() {}
});

