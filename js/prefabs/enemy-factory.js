var SpaceShooter = SpaceShooter || {};
SpaceShooter.Prefabs = SpaceShooter.Prefabs || {};

// enemy factory constructor
SpaceShooter.Prefabs.EnemyFactory = function(state) {

  this.state = state;
  this.enemyGroups = [];
  this.maxEntities = [];
  this.maxLivingEntities = [];
  this.spawnCooldowns = [];
  this.spawnTimers = [];

  // maximum entities
  this.maxEntities[0] = 20;
  this.maxEntities[1] = 15;
  this.maxEntities[2] = 10;
  this.maxEntities[3] = 5;

  // maximum living entities
  this.maxLivingEntities[0] = 2;
  this.maxLivingEntities[1] = 0;
  this.maxLivingEntities[2] = 0;
  this.maxLivingEntities[3] = 0;

  // spawn cooldowns
  this.spawnCooldowns[0] = 1000;
  this.spawnCooldowns[1] = 5000;
  this.spawnCooldowns[2] = 8000;
  this.spawnCooldowns[3] = 13000;

  // spawn timers
  this.spawnTimers[0] = this.spawnCooldowns[0];
  this.spawnTimers[1] = this.spawnCooldowns[1];
  this.spawnTimers[2] = this.spawnCooldowns[2];
  this.spawnTimers[3] = this.spawnCooldowns[3];

};

// enemy factory prototype
SpaceShooter.Prefabs.EnemyFactory.prototype = {

  preload: function() {

    SpaceShooter.Game.load.image('enemy.blue.body', 'assets/enemies/blue_body.png');
    SpaceShooter.Game.load.image('enemy.blue.rotor', 'assets/enemies/blue_rotor.png');
    SpaceShooter.Game.load.image('enemy.green.body', 'assets/enemies/green_body.png');
    SpaceShooter.Game.load.image('enemy.green.rotor', 'assets/enemies/green_rotor.png');
    SpaceShooter.Game.load.image('enemy.magenta.body', 'assets/enemies/magenta_body.png');
    SpaceShooter.Game.load.image('enemy.magenta.rotor', 'assets/enemies/magenta_rotor.png');
    SpaceShooter.Game.load.image('enemy.red.body', 'assets/enemies/red_body.png');
    SpaceShooter.Game.load.image('enemy.red.rotor', 'assets/enemies/red_rotor.png');

  },

  create: function() {

    this.createBlue();
    this.createGreen();
    this.createMagenta();
    this.createRed();

  },

  createBlue: function() {

    // create all the possible entities
    this.enemyGroups[0] = SpaceShooter.Game.add.group();
    for (var i = 0; i < this.maxEntities[0]; i++) {

      // main body and physics
      var enemy = this.enemyGroups[0].create(0, 0, 'enemy.blue.body', 0, false);
      SpaceShooter.Game.physics.p2.enable(enemy, false);
      this.applyBody(enemy, 62);

      // rotor
      var rotor = SpaceShooter.Game.add.sprite(0, 0, 'enemy.blue.rotor');
      rotor.anchor.setTo(0.5 ,0.5);
      enemy.addChild(rotor);

      // enemy properties
      enemy.maxHealth = 3;
      enemy.speed = 3;
      enemy.type = 0;
      enemy.attackDamage = 5;
      enemy.score = 5;

    }

  },

  createGreen: function() {

    this.enemyGroups[1] = SpaceShooter.Game.add.group();
    for (var i = 0; i < this.maxEntities[1]; i++) {

      // main body and physics
      var enemy = this.enemyGroups[1].create(0, 0, 'enemy.green.body', 0, false);
      SpaceShooter.Game.physics.p2.enable(enemy, false);
      this.applyBody(enemy, 62);

      // rotor
      var rotor = SpaceShooter.Game.add.sprite(0, 0, 'enemy.green.rotor');
      rotor.anchor.setTo(0.5 ,0.5);
      enemy.addChild(rotor);

      // enemy properties
      enemy.maxHealth = 5;
      enemy.speed = 3.3;
      enemy.type = 1;
      enemy.attackDamage = 5;
      enemy.score = 10;

    }

  },

  createMagenta: function() {

    this.enemyGroups[2] = SpaceShooter.Game.add.group();
    for (var i = 0; i < this.maxEntities[2]; i++) {

      // main body and physics
      var enemy = this.enemyGroups[2].create(0, 0, 'enemy.magenta.body', 0, false);
      SpaceShooter.Game.physics.p2.enable(enemy, false);
      this.applyBody(enemy, 62);

      // rotor
      var rotor = SpaceShooter.Game.add.sprite(0, 0, 'enemy.magenta.rotor');
      rotor.anchor.setTo(0.5 ,0.5);
      enemy.addChild(rotor);

      // enemy properties
      enemy.maxHealth = 8;
      enemy.speed = 1.3;
      enemy.type = 2;
      enemy.attackDamage = 5;
      enemy.score = 15;

    }

  },

  createRed: function() {

    this.enemyGroups[3] = SpaceShooter.Game.add.group();
    for (var i = 0; i < this.maxEntities[3]; i++) {

      // main body and physics
      var enemy = this.enemyGroups[3].create(0, 0, 'enemy.red.body', 0, false);
      SpaceShooter.Game.physics.p2.enable(enemy, false);
      this.applyBody(enemy, 62);

      // rotor
      var rotor = SpaceShooter.Game.add.sprite(0, 0, 'enemy.red.rotor');
      rotor.anchor.setTo(0.5 ,0.5);
      enemy.addChild(rotor);

      // enemy properties
      enemy.maxHealth = 20;
      enemy.speed = 0.6;
      enemy.type = 3;
      enemy.attackDamage = 15;
      enemy.score = 20;

    }

  },

  update: function() {

    // keep the rotor rotating and the enemy moving towards the player
    for (var i = 0; i < this.enemyGroups.length; i++) {
      this.enemyGroups[i].forEachAlive(function(enemy) {
        this.move(enemy);
      }, this);
    }

    // iterate over each enemy group
    for (var i = 0; i < this.enemyGroups.length; i++) {

      // if the spawn cooldown has run off for that enemy
      if (this.spawnTimers[i] <= 0 && this.enemyGroups[i].countLiving() < this.maxLivingEntities[i]) {

        // get a dead entity
        var enemy = this.enemyGroups[i].getFirstDead();

        // if we have an entity, reset its position
        if (enemy) {
          enemy.reset(SpaceShooter.Game.rnd.integerInRange(-400, SpaceShooter.Game.world.width+400), -150);
          enemy.health = enemy.maxHealth;
          this.spawnTimers[i] = this.spawnCooldowns[i];
        }

      }
    }

    // lower the spawn cooldowns
    for (var i = 0; i < this.spawnCooldowns.length; i++) {
      this.spawnTimers[i] -= SpaceShooter.Game.time.elapsedMS;
    }

  },

  move: function(enemy) {
    enemy.children[0].angle += 10;
    this.accelerateToObject(enemy, this.state.player, enemy.speed);
  },

  accelerateToObject: function(obj1, obj2, speed) {
    var angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
    obj1.body.rotation = angle + SpaceShooter.Game.math.degToRad(90);
    obj1.body.x += Math.cos(angle) * speed;
    obj1.body.y += Math.sin(angle) * speed;
  },

  applyBody: function(enemy, circleRadius) {
    enemy.body.setCircle(circleRadius);
    enemy.body.kinematic = true;
    enemy.body.collideWorldBounds = false;
    enemy.body.setCollisionGroup(this.state.enemyCollisionGroup);
    enemy.body.collides(this.state.bulletCollisionGroup);
    enemy.anchor.setTo(0.5, 0.5);
  }

};