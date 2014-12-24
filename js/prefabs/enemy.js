var SpaceShooter = SpaceShooter || {};
SpaceShooter.Prefabs = SpaceShooter.Prefabs || {};

// enemy constructor
SpaceShooter.Prefabs.Enemy = function(state) {
  this.state = state;
};

// enemy prototype
SpaceShooter.Prefabs.Enemy.prototype = {

  preload: function() {

    SpaceShooter.Game.load.image('enemy1', 'assets/enemy.png');
    SpaceShooter.Game.load.image('enemy2', 'assets/enemy2.png');
    SpaceShooter.Game.load.spritesheet('enemyParticle', 'assets/enemyParticle.png', 2, 2, 7);
    SpaceShooter.Game.load.audio('impact', 'assets/impact.mp3');

  },

  create: function() {

    this.createGreenEnemies();

    // create orange enemy sprite
    // this.state.enemy = SpaceShooter.Game.add.sprite(SpaceShooter.Game.world.centerX+100, SpaceShooter.Game.world.centerY, 'enemy1');
    // SpaceShooter.Game.physics.p2.enable(this.state.enemy);
    // this.state.enemy.body.setCircle(60);
    // this.state.enemy.body.kinematic = true;
    // this.state.enemy.body.collideWorldBounds = false;
    // this.state.enemy.body.setCollisionGroup(this.state.enemyCollisionGroup);
    // this.state.enemy.body.collides(this.state.bulletCollisionGroup);
    // this.state.enemy.health = 10;
    // this.state.enemy.foregroundId = 1;
    // this.state.enemy.particleArray = [0,4,5,6];
    // this.state.enemy.anchor.setTo(0.5, 0.5);

    // create green enemy sprite
    // this.state.enemy2 = SpaceShooter.Game.add.sprite(SpaceShooter.Game.world.centerX-100, SpaceShooter.Game.world.centerY, 'enemy2');
    // SpaceShooter.Game.physics.p2.enable(this.state.enemy2);
    // this.state.enemy2.body.setCircle(60);
    // this.state.enemy2.body.kinematic = true;
    // this.state.enemy2.body.collideWorldBounds = false;
    // this.state.enemy2.body.setCollisionGroup(this.state.enemyCollisionGroup);
    // this.state.enemy2.body.collides(this.state.bulletCollisionGroup);
    // this.state.enemy2.health = 10;
    // this.state.enemy2.foregroundId = 0;
    // this.state.enemy2.particleArray = [0,1,2,3];
    // this.state.enemy2.anchor.setTo(0.5, 0.5);

    // create enemy impact sound
    this.state.enemyImpact = SpaceShooter.Game.add.sound('impact');
    this.state.enemyImpact.allowMultiple = true;
    this.state.enemyImpact.volume = 0.2;

    // create enemy particle emitter
    this.state.enemyEmitter = SpaceShooter.Game.add.emitter(0, 0, 100);
    this.state.enemyEmitter.makeParticles('enemyParticle', [0,1,2,3,4,5,6]);
    this.state.enemyEmitter.gravity = 75;
    this.state.enemyEmitter.minParticleScale = 1.0;
    this.state.enemyEmitter.maxParticleScale = 1.8;
    this.state.enemyEmitter.minParticleSpeed.setTo(-750, -750);
    this.state.enemyEmitter.maxParticleSpeed.setTo(750, 750);
    this.state.enemyEmitter.minRotation = 0;
    this.state.enemyEmitter.maxRotation = 90;

  },

  update: function() {

    // fade out and slow down particles from the enemy emitter
    this.state.enemyEmitter.forEachAlive(function(p) {
      p.alpha = p.lifespan / 1600;
      p.body.velocity.x = p.body.velocity.x * 0.94;
      p.body.velocity.y = p.body.velocity.y * 0.94;
    });

    // update player movement
    this.state.greenEnemies.forEachAlive(this.move, this);

    // get a dead instance
    var greenEnemy = this.state.greenEnemies.getFirstDead();
    if (greenEnemy) {greenEnemy.reset(100, 100, 10)};

  },

  move: function(enemy) {
    enemy.body.angle += 6;
    this.accelerateToObject(enemy, this.state.player, enemy.speed);
  },

  accelerateToObject: function(obj1, obj2, speed) {

    var angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
    obj1.body.x += Math.cos(angle) * speed;
    obj1.body.y += Math.sin(angle) * speed;

  },

  createGreenEnemies: function() {

    // green enemies group
    this.state.greenEnemies = SpaceShooter.Game.add.group();

    // create 10 green enemies
    for (var i = 0; i < 1; i++) {
      var enemy = this.state.greenEnemies.create(100, 100, 'enemy2', 0, true);
      SpaceShooter.Game.physics.p2.enable(enemy, false);
      enemy.body.setCircle(60);
      enemy.body.kinematic = true;
      enemy.body.collideWorldBounds = false;
      enemy.body.setCollisionGroup(this.state.enemyCollisionGroup);
      enemy.body.collides(this.state.bulletCollisionGroup);
      enemy.anchor.setTo(0.5, 0.6);
      enemy.health = 10;
      enemy.speed = 1.3;
      enemy.type = 0;
    };

  },

};