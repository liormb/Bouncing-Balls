
// ------------------------
//     Global Variables
// ------------------------

var width;  // optional: default will be set to the screen width
var height; // optional: default will be set to the screen height
var ctx;
var gravity = 4;
var interval = 10;
var bounciness = 0.9;
var forceFactor = 0.3;
var mouseDown = false;
var balls = [];
var mousePos = [];
var ballSize = { min: 10, max: 20 };
var $canvas;

// ------------------------
//         Graphics
// ------------------------

// Ball graphic
function drawBall(x, y, radius, color){
	// draw a circle
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, Math.PI*2, true);
	ctx.closePath();

	// fill
	ctx.fillStyle = color;
	ctx.fill();

	// stroke
	ctx.lineWidth = radius * 0.1;
	ctx.strokeStyle = '#FFF';
	ctx.stroke();
}

// Arrow graphic
function drawArrow(fromX, fromY, toX, toY, color){
	var headLength = 10;
	var headAngle = Math.atan2(toY - fromY, toX - fromX);

	// stroke line
	ctx.beginPath();
	ctx.moveTo(fromX, fromY);
	ctx.lineTo(toX, toY);
	ctx.lineTo(toX - headLength*Math.cos(headAngle + Math.PI/6), toY - headLength*Math.sin(headAngle - Math.PI/6));
	ctx.moveTo(toX, toY);
	ctx.lineTo(toX - headLength*Math.cos(headAngle + Math.PI/6), toY - headLength*Math.sin(headAngle + Math.PI/6));

	// style
	ctx.lineWidth = 4;
	ctx.strokeStyle = color;
	ctx.lineCap = 'butt';
	ctx.stroke();
}

// Return a random Hex color
function randomColor(){
	var chars = "0123456789ABCDEF".split('');
	var color = '#';

	for (var i=0; i < 6; i++){
		color += chars[ Math.floor(Math.random() * chars.length) ];
	}

	return color;
}

// ------------------------
//          Object
// ------------------------

// Ball Constractor
function Ball(positionX, positionY, velosityX, velocityY, radius, bounciness, color){
	this.x  = positionX;
	this.y  = positionY;
	this.vx = velosityX;
	this.vy = velocityY;
	this.r  = radius;
	this.b  = bounciness;
	this.c  = color;
}
Ball.prototype.draw = function(){
	this.vy += gravity * 0.1;   // velocity = acceleration * time
	this.x  += this.vx * 0.1;   // distance = velocity * time
	this.y  += this.vy * 0.1;
	borderWidth = this.r * 0.1; // Is set by the drawBall function

	// Page border's cases
	if (this.x + this.r + borderWidth > $canvas.width){
		this.x = $canvas.width - this.r - borderWidth;
		this.vx *= -1 * this.b;
	}
	if (this.x - this.r - borderWidth < 0){
		this.x = this.r + borderWidth;
		this.vx *= -1 * this.b;
	}
	if (this.y + this.r + borderWidth > $canvas.height){
		this.y = $canvas.height - this.r - borderWidth;
		this.vy *= -1 * this.b;
	}
	if (this.y - this.r - borderWidth < 0){
		this.y = this.r + borderWidth;
		this.vy *= -1 * this.b;
	}

	drawBall(this.x, this.y, this.r, this.c);
};

// ------------------------
//        Game Logic
// ------------------------

function gameLogic(){
	ctx.clearRect(0, 0, $canvas.width, $canvas.height);
	
	// draw the arrow
	if (mouseDown){
		drawArrow(mousePos['downX'], mousePos['downY'], mousePos['currentX'], mousePos['currentY'], 'yellow');
	}

	// draw the balls
	for (var i=0; i < balls.length; i++){
		balls[i].draw();
	}

	ctx.fillStyle = '#FFF';
	ctx.font = '15px Arial';
	ctx.fillText('Total Balls: ' + balls.length, 20, 30);
}

// ------------------------
//      Event Handlers
// ------------------------

// get the starting point for the arrow
function onMouseDown(event){
	mouseDown = true;  // Telling the app to draw the arrow
	mousePos['downX'] = event.pageX;
	mousePos['downY'] = event.pageY;
}

// add and draw a ball
function onMouseUp(event){
	mouseDown = false; // Telling the app to stop drawing the arrow

	balls.push(
		new Ball(
			mousePos['downX'],
			mousePos['downY'],
			(event.pageX - mousePos['downX']) * forceFactor,
			(event.pageY - mousePos['downY']) * forceFactor,
			Math.floor(Math.random() * (ballSize.max - ballSize.min + 1)) + ballSize.min,
			bounciness,
			randomColor()
		)
	);
}

// get the current mouse position for the arrow
function onMouseMove(event){
	mousePos['currentX'] = event.pageX;
	mousePos['currentY'] = event.pageY;
}

// Setting the canvas as the size of the screen: width/height are optional
function setCanvasSize(event, w, h){
	$canvas.width  = width  || w || window.innerWidth  || documentElement.clientWidth;
	$canvas.height = height || h || window.innerHeight || documentElement.clientHeight;
}

// Handle all the app events
function eventHandlers(){
	document.addEventListener('mousedown', onMouseDown, false);
	document.addEventListener('mouseup',   onMouseUp,   false);
	document.addEventListener('mousemove', onMouseMove, false);
	window.onresize = setCanvasSize;
}

// ------------------------
//          Init
// ------------------------

function init(event){
	$canvas = document.getElementById('canvas');
	ctx = $canvas.getContext('2d');
	setCanvasSize();
	eventHandlers();
	return setInterval(gameLogic, interval);
}

// Let's play...
window.onload = init;
