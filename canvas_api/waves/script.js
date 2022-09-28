// import * as dat from 'dat.gui';

// const { GUI } = require("dat.gui");

// const gui = new dat.GUI();
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const wave = {
    y: 304,
    length: 0.01,
    amplitude: 100,
    frequency: 0.01,
}

// GUI.add(wave, 'y', 0, canvas.height)
// GUI.add(wave, 'length', 0, canvas.height)
// GUI.add(wave, 'amplitude', 0, canvas.height)
// GUI.add(wave, 'frequency', 0, canvas.height) 

const strokeColor = {
    h: 200,
    s: 50,
    l: 50
}

const background = {
    r: 255,
    g: 135, 
    b: 165, 
    a: 0.01
}
// ['#010e1f', '#3c6287', '#98dab4', '#8ec975', '#068b49']

addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    
})

let increment = wave.frequency

function animate() {
    
    requestAnimationFrame(animate);
    
    c.fillStyle = `rgba(${background.r}, ${background.g}, ${background.b}, ${background.a})`
    c.fillRect(0, 0, canvas.width, canvas.height)
    c.beginPath();
    c.moveTo(0, innerHeight )
    
    for (let i = 0; i < canvas.width; i++) {
        c.lineTo(i, 
            wave.y + 
            Math.sin(i * wave.length + increment) * 
            wave.amplitude * 
            Math.sin(increment) / increment * increment)

           
    }
    
    c.strokeStyle = `hsl(${Math.abs(strokeColor.h * Math.sin(increment))}, ${strokeColor.s}%, ${strokeColor.l}%)`
     
    c.stroke()
    
    increment += wave.frequency
    
}

animate()
