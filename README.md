# Tank Top

[Click here to see deployed game](https://motorbreath84.github.io/Tank-Top/)

## Description

Tank Top is a game where the player command a tank deployed on the begining of the screen. On the left of the screen are the controls to select the angle of the shot and the shoot button, which can also be controlled with the up and down arrows and the spacebar. The objective of the game is to shoot down the enemies that comes to your direction and resist as much as you can.


## MVP

- game has one deployed tank that only moves its cannon up and down
- tank shoots bombs up
- enemies appear randomly on the right of the screen
- any enemy that reaches your side will end the game
- the bombs destroys the enemies
- the bomb makes a curve trajectory
- 5 levels, each levels can increase the number of enemies and the speed


## Backlog

- add scoreboard

## Data Structure

- Enemy()
- move()

## States y States Transitions

- splashScreen
- gameScreen
- gameOverScreen


## Task

- main - buildDom
- main - buildSplashScreen
- main - addEventListener
- main - buildGameScreen
- main - buildGameOverScreen
- game - startLoop
- game - buildCanvas
- game - updateCanvas
- game - drawCanvas
- game - addEventListener
- tank - draw
- tank - move
- tank - shoot
- enemy - draw
- enemy - move
- bomb - draw
- bomb - move
- game - checkCollision
- game - GameOver



## Links

- [Slides Link](http://slides.com)
- [Github repository Link](https://github.com/MotorBreath84/Tank-Top)
- [Deployment Link](https://motorbreath84.github.io/Tank-Top/)