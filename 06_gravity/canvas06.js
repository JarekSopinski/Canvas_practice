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

        this.dy = - this.dy; // velocity is reversed

    };

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

function init() {

    ball = new Ball(canvas.width / 2, canvas.height / 2, 2, 30, 'red');
    console.log(ball);
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    ball.update();


}

init();
animate();