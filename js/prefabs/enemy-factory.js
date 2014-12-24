var SpaceShooter = SpaceShooter || {};
SpaceShooter.Prefabs = SpaceShooter.Prefabs || {};

// enemy factory constructor
SpaceShooter.Prefabs.EnemyFactory = function(state) {

  this.state = state;
  this.enemyGroups = [];

  this.enemies = {};
  this.enemies.blue = new SpaceShooter.Prefabs.Enemy(0, 10, 1000, 'enemy.blue.body', 'assets/enemies/blue_body.png', 'enemy.blue.rotor', 'assets/enemies/blue_rotor.png', 60, this);

};

// enemy factory prototype
SpaceShooter.Prefabs.EnemyFactory.prototype = {

  preload: function() {

    this.enemies.blue.preload();
    SpaceShooter.Game.load.image('enemy.green.body', 'assets/enemies/green_body.png');
    SpaceShooter.Game.load.image('enemy.green.rotor', 'assets/enemies/green_rotor.png');
    SpaceShooter.Game.load.image('enemy.magenta.body', 'assets/enemies/magenta_body.png');
    SpaceShooter.Game.load.image('enemy.magenta.rotor', 'assets/enemies/magenta_rotor.png');
    SpaceShooter.Game.load.image('enemy.red.body', 'assets/enemies/red_body.png');
    SpaceShooter.Game.load.image('enemy.red.rotor', 'assets/enemies/red_rotor.png');

  },

  create: function() {
    this.enemies.blue.create();
  },

  update: function() {
    this.enemies.blue.update();
  }

};