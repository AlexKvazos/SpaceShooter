var SpaceShooter = SpaceShooter || {};
SpaceShooter.Prefabs = SpaceShooter.Prefabs || {};

// enemy factory constructor
SpaceShooter.Prefabs.EnemyFactory = function(state) {

  this.state = state;
  this.enemyGroups = [];

  this.enemies = {};
  this.enemies.blue     = new SpaceShooter.Prefabs.Enemy(0, 10, 1000, 3, 3, 'enemy.blue.body', 'assets/enemies/blue_body.png', 'enemy.blue.rotor', 'assets/enemies/blue_rotor.png', 60, this);
  this.enemies.green    = new SpaceShooter.Prefabs.Enemy(1, 10, 2000, 2, 6, 'enemy.green.body', 'assets/enemies/green_body.png', 'enemy.green.rotor', 'assets/enemies/green_rotor.png', 60, this);
  this.enemies.magenta  = new SpaceShooter.Prefabs.Enemy(2, 10, 4000, 1.3, 10, 'enemy.magenta.body', 'assets/enemies/magenta_body.png', 'enemy.magenta.rotor', 'assets/enemies/magenta_rotor.png', 60, this);
  this.enemies.red      = new SpaceShooter.Prefabs.Enemy(3, 10, 6000, 1, 20, 'enemy.red.body', 'assets/enemies/red_body.png', 'enemy.red.rotor', 'assets/enemies/red_rotor.png', 60, this);

};

// enemy factory prototype
SpaceShooter.Prefabs.EnemyFactory.prototype = {

  preload: function() {
    this.enemies.blue.preload();
    this.enemies.green.preload();
    this.enemies.magenta.preload();
    this.enemies.red.preload();
  },

  create: function() {
    this.enemies.blue.create();
    this.enemies.green.create();
    this.enemies.magenta.create();
    this.enemies.red.create();
  },

  update: function() {
    this.enemies.blue.update();
    this.enemies.green.update();
    this.enemies.magenta.update();
    this.enemies.red.update();
  }

};