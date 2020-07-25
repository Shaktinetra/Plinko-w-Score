const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const End = 0;
const Play = 1;
 
var plinkos = [];
var divisions = [];
var particle;
var divisionHeight=300;
var score = 0;
var count = 0;
var gameState;

function setup() {
  createCanvas(800, 800);
  rectMode(CENTER);
  engine = Engine.create();
  world = engine.world;
  
//  ground = new Ground(400,height,width, 10);
  particle = null;
  gameState = Play;

   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }

    for (var j = 75; j <=width; j=j+50) {
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) {
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) {
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) {
       plinkos.push(new Plinko(j,375));
    }
    
    Engine.run(engine);
}
 
function draw() {
  background(0);
  
  Engine.update(engine)

  for (var i = 0; i < plinkos.length; i++) {   
     plinkos[i].display();
  }

  for (var k = 0; k < divisions.length; k++) {  
     divisions[k].display();
  }
  
  if (particle !== null) {
    particle.display();
    
    if (particle.body.position.y > 760) {  
    
      if (particle.body.position.x < 300) {
        score = score + 500;
        particle = null;   
    
      } else {
        if (particle.body.position.x > 301 && particle.body.position.x < 600) {
          score = score + 100;
          particle = null;
    
        } else {
          if (particle.body.position.x > 601 && particle.body.position < 800) {
            particle = null;
          }
        }
      }

      if (count >= 5) {
        gameState = End;
      }
    }
  }

  if (gameState === End) {
    textSize(50);
    text("Game Over", 300, 450);
  }

  textSize(20)
  text("Score : "+score,20,30);
  text(500, 25, 600);
  text(500, 100, 600);
  text(500, 175, 600);
  text(100, 260, 600);
  text(100, 340, 600);
  text(100, 425, 600);
  text(100, 500, 600);
  text(100, 575, 600);
  text(0, 675, 600);
  text(0, 755, 600);
}

function mousePressed() {
  if (gameState === Play) {
    count++;
    particle = new Particle (mouseX, 10, 10, 10);
  }
}
