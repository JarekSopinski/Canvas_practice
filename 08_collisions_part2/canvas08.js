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
function Particle(x, y, radius, color) {
    this.x = x;
    this.y = y;

    this.velocity = {
        // random velocities in x & y axis

        x: Math.random() - 0.5,
        y: Math.random() - 0.5

    };

    this.radius = radius;
    this.color = color;

    this.update = particles => { // particles are passed as parameter to update method

        this.draw();

        // we check for collisions between one particle and all the others:
        for (let i = 0; i < particles.length; i++) {

            if (this === particles[i]) continue;
            // we don't want to compare a particle to itself, so we skip using continue;

            if (distance(this.x, this.y, particles[i].x, particles[i].y) - this.radius * 2 < 0) {
                // on every loop iteration we get distance between this particle and all the surrounding particles

                console.log('has collided');

            }

        }

        // preventing particles from drifting off screen:

        // left and right:
        if (this.x - this.radius <= 0 || this.x + this.radius >= innerWidth) {
            this.velocity.x = -this.velocity.x // velocity is reversed if part. touches screen's edge
        }

        // top and bottom:
        if (this.y - this.radius <= 0 || this.y + this.radius >= innerHeight) {
            this.velocity.y = -this.velocity.y // velocity is reversed if part. touches screen's edge
        }

        // adding velocities for x and y axis:

        this.x += this.velocity.x;
        this.y += this.velocity.y;

    };

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = this.color;
        c.stroke();
        c.closePath()
    };

}

// Implementation
let particles;

function init() {

    particles = [];

    for (let i = 0; i < 4; i++) {

        const radius = 80;
        let x = randomIntFromRange(radius, canvas.width - radius); // random x coordinate
        let y = randomIntFromRange(radius, canvas.height - radius); // random y coordinate
        // randomInt function is used to prevent spawning on screen borders
        const color = 'blue';

        // below we prevent particles from appearing at similar coordinates
        // (if that would happen, collision would be active from the start)

        if (i !== 0) { // everything except first iteration

            for (let j = 0; j < particles.length; j++) {

                // for every newly generated particle, location will be compared to previous particles
                // to check if collision happens
                if ( distance(x, y, particles[j].x, particles[j].y) - radius * 2 < 0 ) {

                    // if collision happens, we want to recalculate particle's coordinates:
                    // this process will repeat itself until new particles does not overlap with previous ones
                    x = randomIntFromRange(radius, canvas.width - radius);
                    y = randomIntFromRange(radius, canvas.height - radius);

                    j = -1; // restarting loop

                }

            }

        }

        particles.push(new Particle(x, y, radius, color));

    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
    particle.update(particles);
    });

};

init();
animate();
