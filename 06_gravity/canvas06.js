// Built on a canvas template by Christopher Lis (Chris Courses)

// Initial Setup
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

// Variables
const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
};

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

// !!!variables used for gravity:
let gravity = 1;
let friction = 0.99;

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY
});

addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init()
});

// Utility Functions
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1;
    const yDist = y2 - y1;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

// Objects
function Ball(x, y, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dy = dy; // y velocity
    this.radius = radius;
    this.color = color
}

Object.prototype.update = function() {

    if (this.y + this.radius > canvas.height) {
        // if object fall behind bottom of the screen

        this.dy = - this.dy * friction; // velocity is reversed
        // friction represents 'energy' which the object loses every time it touches bottom
        // so the bigger friction, the slower it will stop bouncing

    } else {

        this.dy += gravity; // object accelerates while falling
        //console.log(this.dy); <--- see how velocity is increased and reversed

    }

    this.y += this.dy; // object constantly falls towards bottom
    this.draw()
};

Object.prototype.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath()
};

// Implementation

let ball;
let ballArray = [];

function init() {

    for (let i = 0; i < 500; i++) { // loop used to generate some number of objects

        const x = randomIntFromRange(0, canvas.width); // getting random x using function from template
        const y = randomIntFromRange(0, canvas.height); // getting random y using function from template
        ballArray.push(new Ball(x, y, 2, 30, 'red')); // creating new object within a loop

    }

}

// Animation Loop
function animate() {

    requestAnimationFrame(animate);

    c.clearRect(0, 0, canvas.width, canvas.height); // clearing canvas after every 'frame'

    for (let i = 0; i < ballArray.length; i++) {

        ballArray[i].update(); // see Object.prototype.update

    }

}

init();
animate();