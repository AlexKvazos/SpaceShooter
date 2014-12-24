var SpaceShooter = SpaceShooter || {};
SpaceShooter.Prefabs = SpaceShooter.Prefabs || {};

// instantiate prefabs
SpaceShooter.Level = function() {

  this.instance = {};
  this.instance.player        = new SpaceShooter.Prefabs.Player(this);
  this.instance.enemyHandler  = new SpaceShooter.Prefabs.EnemyHandler(this);
  this.instance.bullets       = new SpaceShooter.Prefabs.Bullets(this);
  this.instance.score         = new SpaceShooter.Prefabs.Score(this);
  this.instance.physics       = new SpaceShooter.Prefabs.Physics(this);
  this.instance.stage         = new SpaceShooter.Prefabs.Stage(this);
  this.instance.debug         = new SpaceShooter.Prefabs.Debug(this);
  this.instance.guide         = new SpaceShooter.Prefabs.Guide(this);

};

// state prototype
SpaceShooter.Level.prototype = {

  preload: function() {
    this.instance.player.preload();
    this.instance.enemyHandler.preload();
    this.instance.bullets.preload();
    this.instance.debug.preload();
  },

  create: function() {
    this.instance.stage.create();
    this.instance.physics.create();
    this.instance.player.create();
    this.instance.enemyHandler.create();
    this.instance.bullets.create();
    this.instance.score.create();
    this.instance.guide.create();
  },

  update: function() {
    this.instance.player.update();
    this.instance.enemyHandler.update();
    this.instance.bullets.update();
    this.instance.score.update();
  },

  render: function() {
    this.instance.debug.render();
  }

};