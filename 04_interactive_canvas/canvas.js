const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//************************* INTERACTING WITH CANVAS USING CURSOR ******************************************
//*********************************************************************************************************

// to get x and y values of mouse position, we're going to create mouse object:

const mouse = {

    x: undefined,
    y: undefined

};

const maxRadius = 100; // max radius that circles will grow to

//const minRadius = 2; // min radius that circles will 'collapse' to
// this value was changed to individual (this.minRadius = radius) in later stage

const colorArray = [ // stores all the colors we'd like our circles to have
    '#247BA0',
    '#70C1B3',
    '#B2DBBF',
    '#F3FFBD',
    '#FF1654',
];

// ************************* DETECTING MOUSE MOVEMENT: ***********************************

window.addEventListener('mousemove',
    function (event) { // whenever we move mouse across canvas, this anonymous function is going to be called

        // coordinates for mouse object are going to be equal to mouse coord. from event listener:

        mouse.x = event.x;
        mouse.y = event.y;
        //console.log(mouse);
        // if we test this with console.log, it will return object with current mouse coord.

});

// ************************ RESPONSIVE CANVAS: *********************************

window.addEventListener('resize', function () {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // we set width and height of canvas every time the browser is resized

    init(); // we call this each time we resize canvas to generate circles on whole screen during resizing

});

// ************************ CONSTRUCTOR ****************************************

function Circle(x, y, dx, dy, radius) {

    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    // this will cause the circle to return to its original radius after collapsing
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    // we fill circles with random colors from colorArray (Math.random to get random index)
    // color is random, so ofk we don't add color to constructor's parameters

    this.draw = function () {

        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    };

    this.update = function () {

        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        // interactivity:

        if (mouse.x - this.x < 50
            // if mouse and circle are at similar coordinates, within 50px
            && mouse.x - this.x > -50
            // also, compare to negative value to prevent growing of other circles on the other side
            && mouse.y - this.y < 50
            && mouse.y - this.y > -50
            // finally, we compare values in y axis in similar way to prevent growing
            // of other circles above and below
        ) {
            if (this.radius < maxRadius) { // prevents circles from growing infinitely
                this.radius += 1; // if conditions are fulfilled, the circle touch by the mouse will grow
            }

        } else if (this.radius > this.minRadius) // prevents other circles from totally disappearing, they're stopped at original radius
            {
                this.radius -= 1; // other circles (not touched by mouse) will get smaller
            }


        this.draw()
    }

};

//********************** Generating objects based on constructor **************************************

let circleArray = [];

function init() { // everything is set within init function because of RWD (see RWD section above)
    // only circleArray declaration must be left outside because otherwise the scope will cause error

    circleArray = []; // at the start circleArray is reset to an empty array, so new circles won't
    //be generated with every window resize

    for (let i = 0; i < 1000; i++) { // define the number of circles by changing loop's end value here

        let radius = Math.random() * 3 + 1; // define the size of each circle
        // we add 1 at the end in case of getting 0 from Math.random, than will at least get 1
        let x = Math.random() * (innerWidth - radius * 2) + radius;
        let y = Math.random() * (innerHeight - radius * 2) + radius;
        let dx = (Math.random() - 0.5) * 3;
        let dy =  (Math.random() - 0.5) * 3;

        circleArray.push(new Circle(x, y, dx, dy, radius));

    };
}


// ******************* Animating the whole thing *********************************************

function animate() {

    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    };

}

// Finally, everything runs one we call init and animate functions:

init();
animate();