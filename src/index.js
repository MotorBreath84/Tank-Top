const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width=800;
canvas.height=300;
let startScreen = document.querySelector("#start-screen");
let gameOver = document.querySelector("#gameover");
let ul = document.querySelector('ul');
let pName ="";
let arr=[];

let powaudio=new Audio('sounds/explosion.mp3');
let theme = new Audio('sounds/jaws.mp3');

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
let tankX=-20;
let tankY=260;

let pipe =new Image();
pipe.src="images/pipe.png";
let pipeWidth=30;
let pipeHeight=10;
let pipeX=0;
let pipeY=250;
let angle=45;

let circle =new Image();
circle.src="images/circle.png";
let circleWidth=10;
let circleHeight=10;
let circleX=0;
let circleY=350;
let circleSpeed=0;
let circleSpeedX=0;
let circleSpeedY=0;

class Enemy{
  constructor(width,height,x,y){
    this.width=width;
    this.height=height;
    this.x=x;
    this.y=y;
  }

  move(speed){
    return this.x-=speed;}

}

let bomb =new Image();
bomb.src="images/bomb.png";
const bombP=new Enemy(70,40,800,150);
let bombSpeed=0.1;
let bombStart=800;

let bomb2 =new Image();
bomb2.src="images/bomb.png";
const bombP2=new Enemy(70,40,800,150);
let bombSpeed2=0;

let ltan =new Image();
ltan.src="images/ltan.gif";
const ltanP=new Enemy(85,55,900,235);
let ltanSpeed=0;

let pow =new Image();
pow.src="images/pow.png";
let powX=820;
let powY=0;

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
        if(event.code === "Space"){
            event.preventDefault();
            document.querySelector('#shoot').click();
        }

      });

    document.getElementById('shoot').onclick = () => {
        circleX=0;
        circleY=300;
        clearInterval(nIntervId);
        time=0;
        circleSpeed=800;
        circleSpeedX=Math.cos(angle*Math.PI/180)*circleSpeed;
        circleSpeedY=Math.sin(angle*Math.PI/180)*circleSpeed;
        nIntervId=setInterval(()=>time+=0.01,10);
      };


    document.getElementById('start-button').onclick = () => {
        pName = String(document.querySelector('#pname').value);
        document.querySelector('#pname2').value=pName;
        gameOver.style.display="none";
        startScreen.style.display="none";
        canvas.style.display="block";
        startGame();
      };

      document.getElementById('restart').onclick = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        gameOver.style.display="none";
        [bombP.x,bombP.y]=[800,150];
        [bombSpeed,bombSpeed2, ltanSpeed]=[0.1,0,0];
        ltanP.x=900;
        [bombP2.x,bombP2.y]=[800,0];
        score=0;
        document.querySelector('#score').innerHTML=score;
        document.querySelector('#Level').innerHTML=1;
        isGameOver=false;
        canvas.style.display="block";
        pName = String(document.querySelector('#pname2').value);
        startGame();

      };

      function explode(x,y){
        powX=x;
        powY=y;
        powaudio.play();
        setTimeout(() => {powX=820;
          powY=0;},1000);
        
          setTimeout(() => {
            powaudio.pause();
            powaudio.currentTime = 0;},1000);
      }

      function drawRotated(degrees){
        
        ctx.save();
        ctx.translate(canvas.width/35,canvas.height/1.1);
        ctx.rotate(-degrees*Math.PI/180);
        ctx.drawImage(pipe,-pipeWidth/2,-pipeWidth/3,pipeWidth,pipeHeight);
        ctx.restore();
    }
      
      function startGame(){
        theme.play();
        ctx.drawImage(background,0,0, canvas.width, canvas.height);
        ctx.drawImage(circle,circleX,circleY,circleWidth,circleHeight);
        drawRotated(angle);
        ctx.drawImage(tank,tankX,tankY,tankWidth,tankHeight);
        ctx.drawImage(bomb,bombP.x,bombP.y,bombP.width,bombP.height);
        ctx.drawImage(bomb2,bombP2.x,bombP2.y,bombP2.width,bombP2.height);
        ctx.drawImage(ltan,ltanP.x,ltanP.y,ltanP.width,ltanP.height);
        ctx.drawImage(pow,powX,powY,bombP.width,bombP.height);
        bombP.move(bombSpeed);
        bombP2.move(bombSpeed2);
        ltanP.move(ltanSpeed);
        circleX=circleSpeedX*time;
        circleY=270-circleSpeedY*time+(0.5*600*(time**2));

        function clearcircle(){
          clearInterval(nIntervId);
          circleX=0;
          circleY=300;
          ctx.drawImage(circle,circleX,circleY,circleWidth,circleHeight);
        }

        if(circleX>=790){
          clearcircle();
        }

        switch(score){
          case 10:
            bombSpeed2=bombSpeed;
            document.querySelector('#Level').innerHTML=2;
            break;
          case 20:
            bombSpeed=0.4;
            bombSpeed2=bombSpeed;
            ltanSpeed=0.15;
            document.querySelector('#Level').innerHTML=3;
            break;
          case 30:
            bombSpeed=0.8;
            bombSpeed2=bombSpeed;
            document.querySelector('#Level').innerHTML=4;
            break;
          case 40:
            bombSpeed=2;
            bombSpeed2=bombSpeed;
            document.querySelector('#Level').innerHTML=5;
            break;
        }

        function sortscore(arr){
          arr.sort((a, b) => {
            if (a.score < b.score) {
              return 1;
            } else if (a.score > b.score) {
              return -1;
            } else {
              return 0;
            }
          })
          .map((e) => e.score)
          .slice(0, 10);
          return arr;
        }

        function lastScores() {
          let arr2=[];
          let li =document.createElement('li');
          let obj={'name':pName, 'score':score};
          arr.unshift(obj);
          arr2=sortscore(arr);
          let arr1="";
          arr2.forEach( e => {
            if(e){
              li.innerText=`${e.name} - ${e.score}`;
              arr1+=li.outerHTML;}
          });
          ul.innerHTML=arr1;
        }

        if(bombP.x<1 || bombP2.x<1 || ltanP.x<30){
          theme.pause();
          isGameOver=true;
        }



        if(circleX+circleWidth>bombP.x && circleX<bombP.x+bombP.width && circleY<bombP.y+bombP.height && circleY+circleHeight>bombP.y){
          explode(bombP.x,bombP.y);
          bombP.x=bombStart;
          bombP.y=Math.floor(Math.random()*(240-10+1)+10);
          score++;
          document.querySelector('#score').innerHTML=score;
      }

      if(circleX+circleWidth>bombP2.x && circleX<bombP2.x+bombP2.width && circleY<bombP2.y+bombP2.height && circleY+circleHeight>bombP2.y){
        explode(bombP2.x,bombP2.y);
        bombP2.x=bombStart;
        bombP2.y=Math.floor(Math.random()*(240-10+1)+10);
        score++;
        document.querySelector('#score').innerHTML=score;
    }

      if(circleX+circleWidth>ltanP.x && circleX<ltanP.x+ltanP.width && circleY<ltanP.y+ltanP.height && circleY+circleHeight>ltanP.y){
        explode(ltanP.x,ltanP.y);
        ltanP.x=900;
        score++;
        document.querySelector('#score').innerHTML=score;
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