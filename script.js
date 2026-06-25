const canvas=document.getElementById("game");
const ctx=canvas.getContext("2d");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let score=0;
let vie=3;

const avion={
    x:canvas.width/2,
    y:canvas.height-120,
    size:25
};

const bullets=[];
const enemies=[];

function tirer(){

bullets.push({
x:avion.x,
y:avion.y,
speed:12
});

}

setInterval(tirer,180);

function ennemi(){

enemies.push({
x:Math.random()*canvas.width,
y:-30,
speed:2+Math.random()*4
});

}

setInterval(ennemi,700);

canvas.addEventListener("touchmove",e=>{

const t=e.touches[0];

avion.x=t.clientX;
avion.y=t.clientY;

});

canvas.addEventListener("mousemove",e=>{

avion.x=e.clientX;
avion.y=e.clientY;

});

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height);

ctx.fillStyle="#00ffff";

ctx.beginPath();

ctx.moveTo(avion.x,avion.y-30);
ctx.lineTo(avion.x-20,avion.y+20);
ctx.lineTo(avion.x,avion.y+5);
ctx.lineTo(avion.x+20,avion.y+20);

ctx.fill();

ctx.fillStyle="yellow";

bullets.forEach(b=>{

b.y-=b.speed;

ctx.beginPath();

ctx.arc(b.x,b.y,4,0,Math.PI*2);

ctx.fill();

});

ctx.fillStyle="red";

enemies.forEach(e=>{

e.y+=e.speed;

ctx.beginPath();

ctx.arc(e.x,e.y,18,0,Math.PI*2);

ctx.fill();

});

for(let i=enemies.length-1;i>=0;i--){

for(let j=bullets.length-1;j>=0;j--){

const dx=enemies[i].x-bullets[j].x;
const dy=enemies[i].y-bullets[j].y;

if(Math.hypot(dx,dy)<22){

enemies.splice(i,1);
bullets.splice(j,1);

score++;

document.getElementById("score").innerHTML="Score : "+score;

break;

}

}

}

requestAnimationFrame(draw);

}

draw();
