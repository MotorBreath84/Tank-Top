const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width=800;
canvas.height=300;

let intervalId=0;
let isGameOver=false;
let score=0;
let time=0;
let nIntervId;

let background = new Image();
background.src = "images/background.jpg";

let tank =new Image();
tank.src="images/tank.png";
let tankWidth=50;
let tankHeight=30;
let tankX=0;
let tankY=270;

let pipe =new Image();
pipe.src="images/pipe.png";
let pipeWidth=80;
let pipeHeight=15;
let pipeX=0;
let pipeY=280;
let angle=45;

let circle =new Image();
circle.src="images/circle.png";
let circleWidth=10;
let circleHeight=10;
let circleX=0;
let circleY=270;
let circleSpeed=0;
let circleSpeedX=0;
let circleSpeedY=0;

let bomb =new Image();
bomb.src="images/bomb.png";
let bombWidth=70;
let bombHeight=40;
let bombX=800;
let bombY=150;
let bombSpeed=0.1;
let bombStart=800;

window.onload =() => {

    document.getElementById('up-angle').onclick = () => {
        if(angle<85){
            angle+=5;
        }
        document.querySelector('#angle').innerHTML=angle;
      };

      document.getElementById('down-angle').onclick = () => {
        if(angle>5){
            angle-=5;
        }
        document.querySelector('#angle').innerHTML=angle;
      };

    document.getElementById('shoot').onclick = () => {
        circleX=0;
        circleY=270;
        time=0;
        circleSpeed=110;
        circleSpeedX=Math.cos(angle*Math.PI/180)*circleSpeed;
        circleSpeedY=Math.sin(angle*Math.PI/180)*circleSpeed;
        nIntervId=setInterval(()=>time+=0.01,10);
      };

    document.getElementById('start-button').onclick = () => {
        startGame();
      };

      function startGame(){
        ctx.drawImage(background,0,0, canvas.width, canvas.height);
        ctx.drawImage(circle,circleX,circleY,circleWidth,circleHeight);
        ctx.drawImage(pipe,pipeX,pipeY,pipeWidth,pipeHeight);
        ctx.drawImage(tank,tankX,tankY,tankWidth,tankHeight);
        ctx.drawImage(bomb,bombX,bombY,bombWidth,bombHeight);
        bombX-=bombSpeed;
        circleX=circleSpeedX*time;
        circleY=270-circleSpeedY*time+(0.5*12*(time**2));

        if(circleX+circleWidth>bombX && circleX<bombX+bombWidth && circleY<bombY+bombHeight && circleY+circleHeight>bombY){
            bombX=bombStart;
            bombY=Math.floor(Math.random()*(240-10+1)+10);
            clearInterval(nIntervId);
            circleX=0;
            circleY=270;
            circleSpeed=0;
            score++;
            document.querySelector('#score').innerHTML=score;
        }

        if(bombX<20){
            isGameOver=true;
        }
        intervalId=requestAnimationFrame(startGame);
      }
}