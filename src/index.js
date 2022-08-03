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

let bomb =new Image();
bomb.src="images/bomb.png";
let bombWidth=70;
let bombHeight=40;
let bombX=800;
let bombY=150;
let bombSpeed=0.1;
let bombStart=800;

let bomb2 =new Image();
bomb2.src="images/bomb.png";
let bombWidth2=70;
let bombHeight2=40;
let bomb2X=800;
let bomb2Y=150;
let bombSpeed2=0;

let ltan =new Image();
ltan.src="images/ltan.gif";
let ltanWidth=85;
let ltanHeight=55;
let ltanX=1200;
let ltanY=235;
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
        [bombX,bombY]=[800,150];
        [bombSpeed,bombSpeed2]=[0.1,0];
        [bomb2X,bomb2Y]=[800,0];
        [circleX,circleY]=[0,350];
        score=0;
        document.querySelector('#score').innerHTML=score;
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
        ctx.drawImage(bomb,bombX,bombY,bombWidth,bombHeight);
        ctx.drawImage(bomb2,bomb2X,bomb2Y,bombWidth2,bombHeight2);
        ctx.drawImage(ltan,ltanX,ltanY,ltanWidth,ltanHeight);
        ctx.drawImage(pow,powX,powY,bombWidth2,bombHeight2);
        bombX-=bombSpeed;
        bomb2X-=bombSpeed2;
        ltanX-=ltanSpeed;
        circleX=circleSpeedX*time;
        circleY=270-circleSpeedY*time+(0.5*600*(time**2));

        if(circleX>=780){
          clearInterval(nIntervId);
          circleX=0;
          circleY=300;
          ctx.drawImage(circle,circleX,circleY,circleWidth,circleHeight);
        }

        switch(score){
          case 10:
            bombSpeed2=bombSpeed;
            break;
          case 20:
            bombSpeed=0.4;
            bombSpeed2=bombSpeed;
            break;
          case 30:
            bombSpeed=0.8;
            bombSpeed2=bombSpeed;
            ltanSpeed=0.2;
            break;
          case 40:
            bombSpeed=2;
            bombSpeed2=bombSpeed;
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

        if(bombX<1 || bomb2X<1 || ltanX<30){
          theme.pause();
          isGameOver=true;
        }

        if(circleX+circleWidth>bombX && circleX<bombX+bombWidth && circleY<bombY+bombHeight && circleY+circleHeight>bombY){
          explode(bombX,bombY);
          bombX=bombStart+(bombSpeed*1000);
          bombY=Math.floor(Math.random()*(240-10+1)+10);
          score++;
          document.querySelector('#score').innerHTML=score;
      }

      if(circleX+circleWidth>bomb2X && circleX<bomb2X+bombWidth2 && circleY<bomb2Y+bombHeight2 && circleY+circleHeight>bomb2Y){
        explode(bomb2X,bomb2Y);
        bomb2X=bombStart+(bombSpeed*1000);
        bomb2Y=Math.floor(Math.random()*(240-10+1)+10);
        score++;
        document.querySelector('#score').innerHTML=score;
    }

      if(circleX+circleWidth>ltanX && circleX<ltanX+ltanWidth && circleY<ltanY+ltanHeight && circleY+circleHeight>ltanY){
        explode(ltanX,ltanY);
        ltanX=1200;
        score++;
        document.querySelector('#score').innerHTML=score;
    }

        intervalId=requestAnimationFrame(startGame);

        if(isGameOver){
          cancelAnimationFrame(intervalId);
          clearInterval(nIntervId);
          lastScores();
          canvas.style.display="none";
          startScreen.style.display="none";
          gameOver.style.display="block";
        }
      }
}