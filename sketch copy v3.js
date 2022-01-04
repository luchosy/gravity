/* 
**** GRAVITY ****
Gravity represents the micro-interactions that occur among particles in a resistance free environment... space.

There are some issues that prevent me from calling this a perfect simulation like the particle leaps that occur every once in a while, and the gravitaitonal lines that form which seems... too perfect.

The theory is that matter of all types is inherantly attracted to each other through a gravitational force, the same kind that we feel living on a planet and keeps celestial bodies in orbit.

This gravitational force can be calculated from the equations below, and the effects applied to each particle is taken from breaking down this force into its mass and acceleration and using another set of physics equations.

The end result is sketch with circles each with their own gravitational field.

Have fun!
- Luc Hosy 
******************

Universal Gravitation Equation 

F = G((m1 * m2)/r^2)

F = gravitational force
G = gravitational constant
m1 = the mass of one object
m2 = the mass of the second object
r = the distance between the two centers of mass

Force Equation
F = ma

Centripetal Acceleration Equation
ac = v^2/r
*/

let fx; //the overall gravitational force between two objects in the x direction
let fy; // the overall gravitational force between the two objects in the y direction

let G = 0.0000000667430; //the gravitational constant... altered slightly to make the effects visible.
let counter = 1;
// let a; //acceleration of particle... dependent on the gravitational force
let velocity;

let dx;
let dy;
let m; //mass of particles
let ax;
let ay;
let acx; //this is the centripetal acceleration value that should allow for orbital mechanics
let acy;

let pull = 3;

let particles = [];
let dust =[];

class Particle { // describes properties of a single particle
  constructor(){
    this.pos = createVector(random(0, windowWidth), random(0, windowHeight)) 
    this.r = random(4, 20); // note that this r is the one controling the radius of the particles, not the distance calculation between the two centers of mass
    this.velocity = createVector(random(-0.0095, 0.0095), random(-0.0065, 0.0075))

    this.m = this.r * 1000000;
  }

  createParticle(){
    stroke(225);
    strokeWeight(2);
    circle(this.pos.x, this.pos.y, this.r);
    noFill();
  }

  createBlackHole(){
    circle(width/2, height/2, 100);

  }

  moveParticle(){
    for(let n = 0; n < particles.length; n++) {
      dx = pow((this.pos.x - particles[n].pos.x), pull); // this power plays a key role in deciding how exponentially we want the particles to be accelerating towards another particle.
      dy = pow((this.pos.y - particles[n].pos.y), pull); // distance between two centers of mass... REPLACES r!!!
      // dont need these lines of code below if the power is an odd number :)
      // if (this.pos.x < particles[n].pos.x) {
      //   dx *= -1;
      // }
      // if (this.pos.y < particles[n].pos.y) {
      //   dy *= -1;
      // }
      let totalmass = (this.m * particles[n].m); //total mass is just a variable that contains the mass multiplication calculation that occurs in the parenthesis... keeps the code cleaner for me
      fx = G * (totalmass/dx);
      fy = G * (totalmass/dy);
      ax = (fx/this.m) *1; 
      ay = (fy/this.m) *1; 
      if (abs(ax) > 1){
        ax = 0;
      }
      if (abs(ay) > 1){
        ay = 0;
      }
      // this.velocity.x += ax;
      // this.velocity.y += ay;

      //let testcounter = 4800;
      //This might be time travel low key
      ax *= counter;
      ay *= counter;
      
      // let screenCorrection = -1;
      if (this.pos.x < 0){
        this.pos.x = windowWidth;
      } // needs some help
      if (this.pos.x > windowWidth){
        this.pos.x = 0;
      } // needs some help
      if (this.pos.y < 0){
        this.pos.y = windowHeight;
      } // needs some help
      if (this.pos.y > windowHeight){
        this.pos.x = 0;
      } // needs some help



      let acx = pow(this.velocity.x, 2)/(this.pos.x - particles[n].pos.x);
      let acy = pow(this.velocity.y, 2)/(this.pos.y - particles[n].pos.y);
      if (acx == Infinity){
        acx = 0;
      }
      if (acy == Infinity){
        acy = 0;
      }

      acx *= counter;
      acy *= counter;

      this.pos.x += this.velocity.x + (0.5 * ax) //- (0.5 * acx);
      this.pos.y += this.velocity.y + (0.5 * ay) //- (0.5 * acy);

      // this.pos.x += ax;
      // this.pos.y += ay;
    };
    
    // if (this.pos.x == 0 || this.pos.x > width){
    //   this.velocity.x *= -1;
    // }

    
   
  }
}

class Dust {
  constructor(){
    this.pos = createVector(random(0, windowWidth), random(0, windowHeight)) 
    this.r = 1; 

    this.m = 1000000;
  }

  createDust(){
    stroke(225);
    strokeWeight(2);
    noFill();
    circle(this.pos.x, this.pos.y, this.r);
  }
moveDust(){
  for(let n = 0; n < particles.length; n++) {
    dx = pow((this.pos.x - particles[n].pos.x), pull); // this power plays a key role in deciding how exponentially we want the particles to be accelerating towards another particle.
    dy = pow((this.pos.y - particles[n].pos.y), pull); // distance between two centers of mass... REPLACES r!!!
    // dont need these lines of code below if the power is an odd number :)
    // if (this.pos.x < particles[n].pos.x) {
    //   dx *= -1;
    // }
    // if (this.pos.y < particles[n].pos.y) {
    //   dy *= -1;
    // }
    let totalmass = (this.m * particles[n].m); //total mass is just a variable that contains the mass multiplication calculation that occurs in the parenthesis... keeps the code cleaner for me
    fx = G * (totalmass/dx);
    fy = G * (totalmass/dy);
    ax = (fx/this.m) *1; 
    ay = (fy/this.m) *1; 
    if (abs(ax) > 1){
      ax = 0;
    }
    if (abs(ay) > 1){
      ay = 0;
    }
    // this.velocity.x += ax;
    // this.velocity.y += ay;

    //let testcounter = 4800;
    //This might be time travel low key
    ax *= counter;
    ay *= counter;
    
    // let screenCorrection = -1;
    if (this.pos.x < 0){
      this.pos.x = windowWidth;
    } // needs some help
    if (this.pos.x > windowWidth){
      this.pos.x = 0;
    } // needs some help
    if (this.pos.y < 0){
      this.pos.y = windowHeight;
    } // needs some help
    if (this.pos.y > windowHeight){
      this.pos.x = 0;
    } // needs some help

    this.pos.x += (0.5 * ax) //- (0.5 * acx);
    this.pos.y += (0.5 * ay) //- (0.5 * acy);

    // this.pos.x += ax;
    // this.pos.y += ay;
  }

  for(let n = 0; n < dust.length; n++) {
    dx = pow((this.pos.x - dust[n].pos.x), pull); // this power plays a key role in deciding how exponentially we want the particles to be accelerating towards another particle.
    dy = pow((this.pos.y - dust[n].pos.y), pull); // distance between two centers of mass... REPLACES r!!!
    // dont need these lines of code below if the power is an odd number :)
    // if (this.pos.x < particles[n].pos.x) {
    //   dx *= -1;
    // }
    // if (this.pos.y < particles[n].pos.y) {
    //   dy *= -1;
    // }
    let totalmass = (this.m * dust[n].m); //total mass is just a variable that contains the mass multiplication calculation that occurs in the parenthesis... keeps the code cleaner for me
    fx = G * (totalmass/dx);
    fy = G * (totalmass/dy);
    ax = (fx/this.m) *1; 
    ay = (fy/this.m) *1; 
    if (abs(ax) > 1){
      ax = 0;
    }
    if (abs(ay) > 1){
      ay = 0;
    }
    // this.velocity.x += ax;
    // this.velocity.y += ay;

    //let testcounter = 4800;
    //This might be time travel low key
    ax *= counter;
    ay *= counter;
    
    // let screenCorrection = -1;
    if (this.pos.x < 0){
      this.pos.x = windowWidth;
    } // needs some help
    if (this.pos.x > windowWidth){
      this.pos.x = 0;
    } // needs some help
    if (this.pos.y < 0){
      this.pos.y = windowHeight;
    } // needs some help
    if (this.pos.y > windowHeight){
      this.pos.x = 0;
    } // needs some help

    this.pos.x += (0.5 * ax) //- (0.5 * acx);
    this.pos.y += (0.5 * ay) //- (0.5 * acy);

    // this.pos.x += ax;
    // this.pos.y += ay;
  };
  
  };
}

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch");
  frameRate(240);
  background(255);
  for(let i = 0;i<width/60;i++){
    particles.push(new Particle());
  }
  for(let i = 0;i<width/15;i++){
    dust.push(new Dust());
  }
}

function draw() {
  background("rgba(45, 45, 45, 1)");
  for (let i = 0; i < particles.length; i++){
    particles[i].createParticle();
    // particles[i].createBlackHole();
    particles[i].moveParticle();
  }
  for (let t = 0; t < dust.length; t++){
    dust[t].createDust();
    dust[t].moveDust();
  }
  counter += 1;
}

function displayInfo() {
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

// unique each time 
//variables
// functions
// custom classes
// quality of emergence
//something should be constructed over time


/*
*****SOURCES*****
Learning about how forces could be applied to a sketch — https://p5js.org/examples/simulate-forces.html
How to formulate particles, move them, and measure the distance between them... My base code is also taken mostly from here, but the gravity engine was built from scratch — https://p5js.org/examples/simulate-particles.html 
Learned how to remove the object path here — https://www.youtube.com/watch?v=vqE8DMfOajk 
Learned how to calculate the distance between two points here using the dist() method— https://p5js.org/reference/#/p5/dist 
Learned how to use Vectors in my code here — https://p5js.org/reference/#/p5.Vector 
Orbital mechanics... tried to get the particles to orbit using some of the information here but that was not very successful — https://en.wikipedia.org/wiki/Orbital_mechanics 
Learned more about how to implement rgba and how it works from here — https://p5js.org/reference/#/p5/background 
Jerk Mechanics... this is the reason I think why some particles leap off the screen when they approach too close to another particle. This is also part of the onion skinning problem that occurs— https://en.wikipedia.org/wiki/Jerk_(physics) 
To get a better understanding about forces in p5.js I took a glance at this chapter of Code Train's book — https://natureofcode.com/book/chapter-2-forces/ 
The equation and the concept of gravitational force came from one of the lectures given by my AP Physics Teacher in high school.
I used this website to learn more about the absolute value function in p5.js — https://p5js.org/reference/#/p5/abs
*/