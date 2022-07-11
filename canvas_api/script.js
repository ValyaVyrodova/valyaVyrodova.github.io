const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// //fillRect()
// ctx.fillStyle = 'red';
// ctx.fillRect(20,20,150,100);
// ctx.fillStyle = 'blue';
// ctx.fillRect(200, 20, 150, 100);

// //strokeRect()
// ctx.lineWidth = 5;
// ctx.strokeStyle = 'green';
// ctx.strokeRect(100, 150, 100, 100)

// //clearRect()
// ctx.clearRect(25, 25, 140, 90);

// //fillText()
// ctx.font = '30px Arial'
// ctx.fillStyle = 'purple';
// ctx.fillText('Hello Valushka', 370, 50)

// //stokeText()
// ctx.lineWidth = 1;
// ctx.strokeStyle = 'orange'
// ctx.strokeText('Hello world!', 400, 100);

//Paths

// ctx.beginPath();
// ctx.moveTo(50, 50);
// ctx.lineTo(150, 50);
// ctx.lineTo(100, 200);
// // ctx.lineTo(50, 50);
// ctx.closePath();
// ctx.strokeStyle='green';
// ctx.fillStyle='coral';
// ctx.fill()
// ctx.stroke();

// ctx.beginPath();
// ctx.moveTo(200, 50);
// ctx.lineTo(150, 200);
// ctx.lineTo(250,200);
// ctx.closePath();
// ctx.stroke();

// ctx.beginPath();
// ctx.rect(300, 50, 150, 100);
// ctx.fillStyle='teal';
// ctx.fill();

//Arc

ctx.beginPath();

const centerX = canvas.width / 2;
const centerY = canvas.height / 2; 

//Draw head
ctx.arc(centerX, centerY, 200, 0, Math.PI * 2);

// Move to mouth 
ctx.moveTo(centerX + 100, centerY);

//Draw mouth
ctx.arc(centerX, centerY, 100, 0, Math.PI, false);

//Move to eye
ctx.moveTo(centerX - 60, centerY - 80);

//Draw left eye
ctx.arc(centerX - 80, centerY - 80, 20, 0, Math.PI * 2)

//Move to eye
ctx.moveTo(centerX + 100, centerY - 80);

//Draw right eye
ctx.arc(centerX + 80, centerY - 80, 20, 0, Math.PI * 2);

ctx.stroke();