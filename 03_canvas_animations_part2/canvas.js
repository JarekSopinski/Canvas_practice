const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d');

//**************** ANIMATING MULTIPLE CIRCLES WITH OBJECTS ***************************************

// we create 'Circle' constructor object:

function Circle(x, y, dx, dy, radius) {
    // we create variables with .this, so each new object can get it's own unique values:
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    // now, every time we will use this values inside a constructor,
    // they must be prepended with .this
    
    this.draw = function () {
        // we are going to draw a circle whenever this function is called
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = 'blue';
        c.stroke();
        c.fill(); // this can optionally fill every circle, switch that off for
        // empty circles effect :)
    };

    this.update = function () {
        // method for 'bouncing' (reversing velocity)
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw() // we do a callback to draw() method inside update(), so that when we call update(),
        // it will work 'hand in hand' with draw() method
    }

}; // end of 'Circle' constructor



const circleArray = []; // this array will store multiple circles built inside a loop

for (let i = 0; i < 100; i++) {
    // this loop will create multiple circles based on above constructor

    // every new circle object will get random values:

    let radius = 30; // only radius is hard coded
    // also, below we're using radius to fix problem of circles spawning and blocking themselves on the edges

    let x = Math.random() * (innerWidth - radius * 2) + radius;
    //[- radius * 2) + radius] fixes problem with spawning on edges

    let y = Math.random() * (innerHeight - radius * 2) + radius;
    // we use the same trick as abode to fix edges spawning problem, only this time for top & bottom

    let dx = (Math.random() - 0.5) * 8;
    let dy =  (Math.random() - 0.5) * 8;

    circleArray.push(new Circle(x, y, dx, dy, radius));
    // each time new circle object (based on 'Circle' constructor) is created, we push it to circleArray
    // it gets randomized values from above

};


function animate() {

    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    // we run a loop inside animate() so that we can draw and animate all circles created in previous loop
    for (let i = 0; i < circleArray.length; i++) {

        circleArray[i].update();
        // we run update() method on every iteration;
        // remember, that draw() method already runs inside update() method!

    };

}

animate();