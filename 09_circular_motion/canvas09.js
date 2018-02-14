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

const colors = ['#00BDFF', '#4D39C', '#088EFF'];

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
function Particle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radians = Math.random() * Math.PI * 2;
    // randomized radiance for each particle
    // Pi*2 is a full circle, so particles will appear at random 'points' within full circle
    this.velocity = 0.05;
    this.distanceFromCenter = randomIntFromRange(50, 120);
    // randomized distance from center for each particle
    this.lastMousePos = {x: x, y: y};


    this.update = function () {

        const lastPoint = {
            x: this.x,
            y: this.y
        };

        // Move points over time, based on incrementing radians
        this.radians += this.velocity;

        // Mouse drag effect
        this.lastMousePos.x += (mouse.x - this.lastMousePos.x) * 0.05;
        this.lastMousePos.y += (mouse.y - this.lastMousePos.y) * 0.05;

        //Circular motion
        // we need to use cosinus for x and sinus for y
        // we're referencing random distance from center for x and y
        this.x = this.lastMousePos.x + Math.cos(this.radians) * this.distanceFromCenter;
        this.y = this.lastMousePos.y + Math.sin(this.radians) * this.distanceFromCenter;

        this.draw(lastPoint)
    };

    this.draw = lastPoint => {
        c.beginPath();
        c.strokeStyle = this.color;
        c.lineWidth = this.radius;
        c.moveTo(lastPoint.x, lastPoint.y);
        c.lineTo(this.x, this.y);
        c.stroke();
        c.closePath()
    };

}

// Implementation
let particles;

function init() {
    particles = [];

    for (let i = 0; i < 50; i++) {
        const radius = (Math.random() * 2) + 1; // random radius between 1 and 2
        particles.push(new Particle(canvas.width / 2, canvas.height / 2, radius, randomColor(colors)));
    };

    console.log(particles);
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    // below clearRect (from template) is changed to fillRect (witch uses previously definied fillStyle)
    // so we can get a 'trail effect'
    c.fillStyle = 'rgba(255, 255, 255, 0.05)';
    c.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
    });

}

init();
animate();
