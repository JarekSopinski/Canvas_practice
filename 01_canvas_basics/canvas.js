const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');
// in further exercises, 'c' will always stand for 'context'
// within 'c' we're creating a sort of 'super-object', we're creating a lot o methods,
// which we can use to actually draw within a canvas.

c.fillRect(100, 100, 100, 100);
// this creates and object within canvas and always takes 4 values: x, y, width and height,
// x and y determine object placement and width / height determine object size.
// so, this time we created a 100x100 px square, set 100 px from top and 100px from left

//now, by changing values passed to fillRect, we can create multiple boxes:

c.fillRect(300, 500, 50, 50);
c.fillRect(700, 200, 150, 200);
c.fillRect(400, 300, 200, 200);