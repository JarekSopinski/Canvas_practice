const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d');

//**************** ANIMATING A CIRCLE ***************************************

let x = Math.random() * innerWidth;
// holds x position of a circle, math random so that the starting pos is random after every refresh

let y = Math.random() * innerHeight; // holds y position of a circle

let dx = (Math.random() - 0.5) * 8; // 'dx' is a standard acronym for x's velocity
// velocity is randomly generated, and with - 0.5 we get equal chance of getting negative
// or positive value (eq. 0.9 - 0.5 = 0.4 / positive, 0.4 - 0.5 = -0.1 /negative
// so, it 50% that it will move forward from the start and 50% for moving backwards

// we can also multiply the result, so that velocity will be greater than 1 (or -1)

let dy =  (Math.random() - 0.5) * 8; // y's velocity

let radius = 30; // variable for circle's radius

function animate() {

    requestAnimationFrame(animate);

    c.clearRect(0, 0, innerWidth, innerHeight); // this method clears previous drawings
    // so the animation doesn't leave trace
    // it clears the WHOLE SCREEN after every run of this function;
    // it's a bit like a screen refreshing ;)

    c.beginPath();
    c.arc(x, y, radius, 0, Math.PI * 2, false); // we pass x and y variables as coordinates
    c.strokeStyle = 'blue';
    c.stroke();

    // condition to 'bounce' element off, one it reaches right side of the screen:
    if (x + radius > innerWidth || x - radius < 0) {
        // (x + radius) means that collision happens at the edge
        // (x - radius < 0) for reversing after it reaches left side
        // less than 0, becuse 0 is the 'beginning' of the screen
        dx = -dx; // velocity is changed to negative value, so the item will move backwards
    }

    // similar condition for 'bouncing' in y axis:

    if (y + radius > innerHeight || y - radius < 0) {
        dy = -dy;
    }

    x += dx; // each time the function runs, the value will be increased by dx (velocity) value
    // the result will be movement across the x axis
    y += dy; // the same for y axis
}

animate();
