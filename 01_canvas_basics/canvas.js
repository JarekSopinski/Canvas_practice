const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');
// in further exercises, 'c' will always stand for 'context'
// within 'c' we're creating a sort of 'super-object', we're creating a lot o methods,
// which we can use to actually draw within a canvas.

//************ DRAWING SQUARES ******************************************

c.fillStyle = 'rgba(255, 0, 0, 0.5)'; // we color the squares
c.fillRect(100, 100, 100, 100);
// this creates and object within canvas and always takes 4 values: x, y, width and height,
// x and y determine object placement and width / height determine object size.
// so, this time we created a 100x100 px square, set 100 px from top and 100px from left

//now, by changing values passed to fillRect, we can create multiple boxes:
c.fillStyle = 'rgba(0, 0, 255, 0.5)';
c.fillRect(400, 100, 100, 100);
c.fillStyle = 'rgba(0, 255, 0, 0.5)';
c.fillRect(300, 300, 100, 100);

//************ DRAWING LINES *********************************************

c.beginPath(); // starts a new line
c.moveTo(50, 300); // takes x and y as values, at which the line will begin
c.lineTo(300, 100); // x and y at which the line will end
c.lineTo(400, 300); // we continue drawing, the line expands to another point
c.strokeStyle = '#fa34a3'; // we add color to the line
c.stroke(); // now we can see the line

//************ DRAWING ARCS / CIRCLES ************************************

c.beginPath(); // starts a new path and prevents circle from connecting with prev creates line
c.arc(300, 300, 30, 0, Math.PI * 2, false);
//arguments: x, y, radius, startAngle, endAngle
// (in radiance; start as 0 and end as PI2 will create full circle),drawing direction (optional)
c.strokeStyle = 'blue';
c.stroke(); // now we can see te circle

//************** DRAWING MULTIPLE CIRCLES USING LOOPS *********************

for (let i = 0; i < 3; i++) {
    // we use math random to place circles at random coordinates on each iteration:
    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;
    c.beginPath();
    c.arc(x, y, 30, 0, Math.PI * 2, false); // we pass variables with random values as coordinates
    c.strokeStyle = 'blue';
    c.stroke();
};

//************ DRAWING MULTIPLE CIRCLES WITH RANDOM COLORS *********************

for (let i = 0; i < 100; i++) {
    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;

    // variables below will generate random number for rgb:

    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    let rgb = 'rgba('+r+ ', ' +g+ ', ' +b+ ', ' +0.9+ ')';

    c.beginPath();
    c.arc(x, y, 30, 0, Math.PI * 2, false);
    c.strokeStyle = rgb;
    c.stroke();
};