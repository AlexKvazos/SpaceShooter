var SpaceShooter = SpaceShooter || {};
SpaceShooter.Prefabs = SpaceShooter.Prefabs || {};

// enemy constructor
SpaceShooter.Prefabs.EnemyHandler = function(state) {

  this.state = state;
  this.instance = {};
  this.instance.enemyFactory = new SpaceShooter.Prefabs.EnemyFactory(state);

};

// enemy prototype
SpaceShooter.Prefabs.EnemyHandler.prototype = {

  preload: function() {

    SpaceShooter.Game.load.spritesheet('enemyParticle', 'assets/enemyParticle.png', 2, 2, 7);
    SpaceShooter.Game.load.audio('impact', 'assets/impact.mp3');
    SpaceShooter.Game.load.image('empty', 'assets/empty.png');

    // preload enemies from the factory
    this.instance.enemyFactory.preload();

  },

  create: function() {

    // create enemies from enemy factory
    this.instance.enemyFactory.create();

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

    // update the enemy factory
    this.instance.enemyFactory.update();

  },

};