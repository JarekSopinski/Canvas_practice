const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//****************** Setting up cursor *****************************************

const mouse = {

    x: undefined,
    y: undefined

};

const maxRadius = 10;

//******************* Adding title *******************************************


function addTitle() {

    const titleInterval = 100;
    const mobileResolution = 576;

    // main title
    window.innerWidth > mobileResolution ? c.font = '100px Quicksand' : c.font = '50px Quicksand';
    c.fillStyle = "white";
    c.textAlign = "center";
    c.fillText("Meet me", canvas.width/2, canvas.height/2.5);

    // subtitles
    window.innerWidth > mobileResolution ? c.font = '50px Quicksand' : c.font = '25px Quicksand';
    c.fillStyle = "white";
    c.textAlign = "center";
    c.fillText("John Doe", canvas.width/2, canvas.height/2.5 + titleInterval);
    c.fillText("Full-stack developer", canvas.width/2, canvas.height/2.5 + (titleInterval * 2));

}

// ************************* DETECTING MOUSE MOVEMENT: ***********************************

window.addEventListener('mousemove',
    function (event) {

        mouse.x = event.x;
        mouse.y = event.y;

    });

// ************************ RESPONSIVE CANVAS: *********************************

window.addEventListener('resize', function () {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();

});

// ************************ CONSTRUCTOR ****************************************

function Circle(x, y, dx, dy, radius) {

    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    radius = 1;
    this.minRadius = radius;

    this.draw = function () {

        c.beginPath();
        c.arc(this.x, this.y, radius, 0, Math.PI * 2, false);
        c.strokeStyle = 'white';
        c.stroke();
    };

    this.update = function () {

        if (this.x + radius > innerWidth || this.x - radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + radius > innerHeight || this.y - radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        // interactivity:

        if (mouse.x - this.x < 50
            && mouse.x - this.x > -50
            && mouse.y - this.y < 50
            && mouse.y - this.y > -50
        ) {
            if (radius < maxRadius) {
                radius += 1;
            }

        } else if (radius > this.minRadius)
        {
            radius -= 1;
        }

        this.draw()
    }

};

//********************** Generating objects based on constructor **************************************

let circleArray = [];

function init() {

    circleArray = [];

    for (let i = 0; i < 800; i++) { // more than 800 can be to heavy for most computers

        let radius = Math.random() * 3 + 1;
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

    addTitle();

}


init();
animate();
