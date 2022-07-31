const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width=800;
canvas.height=300;
let startScreen = document.querySelector("#start-screen");
let gameOver = document.querySelector("#gameover");
let ul = document.querySelector('ul');
let pName="";
let arr = Array.apply( null, { length: 10 } );
let arr1="";

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
let pipeWidth=60;
let pipeHeight=60;
let pipeX=0;
let pipeY=250;
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

  canvas.style.display="none";
  gameOver.style.display="none";

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

      document.addEventListener('keydown',(event) => {

        if(event.code === 'ArrowDown' && angle>5){
          angle-=5;
        }else if(event.code === 'ArrowUp' && angle<85){
          angle+=5;
        }
        document.querySelector('#angle').innerHTML=angle;

      });

    document.getElementById('shoot').onclick = () => {
        circleX=0;
        circleY=270;
        clearInterval(nIntervId);
        time=0;
        circleSpeed=800;
        circleSpeedX=Math.cos(angle*Math.PI/180)*circleSpeed;
        circleSpeedY=Math.sin(angle*Math.PI/180)*circleSpeed;
        nIntervId=setInterval(()=>time+=0.01,10);
      };

    document.getElementById('start-button').onclick = () => {
        pName = String(document.querySelector('#pname').value);
        gameOver.style.display="none";
        startScreen.style.display="none";
        canvas.style.display="block";
        startGame();
      };

      document.getElementById('restart').onclick = () => {
        bombSpeed=0.1;
        circleX=0;
        circleY=270;
        circleSpeed=0;
        circleSpeedX=0;
        circleSpeedY=0;
        bombX=800;
        gameOver.style.display="none";
        startScreen.style.display="block";
      };

      function startGame(){
        ctx.drawImage(background,0,0, canvas.width, canvas.height);
        ctx.drawImage(circle,circleX,circleY,circleWidth,circleHeight);
        ctx.drawImage(pipe,pipeX,pipeY,pipeWidth,pipeHeight);
        ctx.drawImage(tank,tankX,tankY,tankWidth,tankHeight);
        ctx.drawImage(bomb,bombX,bombY,bombWidth,bombHeight);
        bombX-=bombSpeed;
        circleX=circleSpeedX*time;
        circleY=270-circleSpeedY*time+(0.5*600*(time**2));

        if(circleX+circleWidth>bombX && circleX<bombX+bombWidth && circleY<bombY+bombHeight && circleY+circleHeight>bombY){
            bombX=bombStart;
            bombY=Math.floor(Math.random()*(240-10+1)+10);
            score++;
            document.querySelector('#score').innerHTML=score;
        }
        
        switch(score){
          case 10:
            bombSpeed=0.4;
            break;
          case 20:
            bombSpeed=0.8;
            break;
          case 30:
            bombSpeed=2;
            break;
        }

        function lastScores() {
          let li =document.createElement('li');
          li.innerText=`${pName} - ${score}`;
          arr.unshift(li);
          arr.pop();
          arr1="";
          arr.forEach( e => {
            if(e){arr1+=e.outerHTML}
          });
          
          ul.innerHTML=arr1;
        }

        if(bombX<1){
            isGameOver=true;
        }

        intervalId=requestAnimationFrame(startGame);

        if(isGameOver){
          cancelAnimationFrame(intervalId);
          lastScores();
          canvas.style.display="none";
          startScreen.style.display="none";
          gameOver.style.display="block";
        }
      }
}