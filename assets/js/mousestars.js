var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var particles = [];
var isMouseDown = false;

function Particle(x, y, radius, color, velocity) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.velocity = {
    x: (Math.random() - 0.5) * velocity,
    y: (Math.random() - 0.5) * velocity
  };
  this.alpha = 1;
}

Particle.prototype.draw = function() {
  ctx.save();
  ctx.globalAlpha = this.alpha;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  ctx.fillStyle = this.color;
  ctx.shadowColor = this.color;
  ctx.shadowBlur = 10;
  ctx.fill();
  ctx.restore();
};

Particle.prototype.update = function() {
  this.x += this.velocity.x;
  this.y += this.velocity.y;
  this.alpha -= 0.01;
};

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  

  particles.forEach(function(particle, index) {
    if (particle.alpha > 0) {
      particle.draw();
      particle.update();
    } else {
      particles.splice(index, 1);
    }
  });
}

document.addEventListener('mousemove', function(e) {
  var x = e.clientX;
  var y = e.clientY;
  var radius = Math.random() * 2 + 1;
  var color = '#fff';
  var velocity = Math.random() * 5 + 2;

  particles.push(new Particle(x, y, radius, color, velocity));
});

document.addEventListener('mousedown', function(e) {
    isMouseDown = true;

    for (var i = 0; i < 10; i++) {
     
    var x = e.clientX;
    var y = e.clientY;
    var radius = Math.random() * 2 + 1;
    var color = '#fff';
    var velocity = Math.random() * 5 + 2;
  
    particles.push(new Particle(x, y, radius, color, velocity));

    }


    

  });
  
  document.addEventListener('mouseup', function(e) {
    isMouseDown = false;
  });

  

animate();

window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
