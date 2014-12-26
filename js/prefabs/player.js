var SpaceShooter = SpaceShooter || {};
SpaceShooter.Prefabs = SpaceShooter.Prefabs || {};

// player constructor
SpaceShooter.Prefabs.Player = function(state) {
  this.state = state;
};

// player prototype
SpaceShooter.Prefabs.Player.prototype = {

  preload: function() {

    SpaceShooter.Game.load.spritesheet('player', 'assets/player.png', 30, 45, 4);
    SpaceShooter.Game.load.spritesheet('particle', 'assets/particle.png', 2, 2, 7);

  },

  create: function() {

    // create player sprite
    var player = SpaceShooter.Game.add.sprite(SpaceShooter.Game.world.centerX, SpaceShooter.Game.world.height-50, 'player');
    SpaceShooter.Game.physics.p2.enable(player);
    player.body.setRectangle(35, 40, -15, 0);
    player.anchor.setTo(1, 0.5);
    player.z = 10;
    player.animations.add('shoot');
    isShootingAnimationPlaying = false;
    player.body.collideWorldBounds = true;

    // create player particle emitter
    this.state.playerEmitter = SpaceShooter.Game.add.emitter(0, 0);
    this.state.playerEmitter.makeParticles('particle', [0, 1, 2, 3, 4, 5, 6]);
    this.state.playerEmitter.angularDrag = 90;
    this.state.playerEmitter.gravity = 0;
    this.state.playerEmitter.minParticleSpeed.setTo(250, -100);
    this.state.playerEmitter.maxParticleSpeed.setTo(50, 100);
    player.addChild(this.state.playerEmitter);

    this.state.player = player;

    // handle device tilting
    window.addEventListener('devicemotion', function(deviceMotion) {

      if (deviceMotion.rotationRate.gamma < 0) {
        player.body.moveLeft(deviceMotion.rotationRate.gamma * -1 * 20);
      } else if (deviceMotion.rotationRate.gamma > 0) {
        player.body.moveRight(deviceMotion.rotationRate.gamma * 20);
      }

    });

  },

  update: function() {

    // rotate the player towards the active pointer
    this.state.player.body.rotation = SpaceShooter.Game.physics.arcade.angleToPointer(this.state.player);

    // fade out particles create by the player particle emitter
    this.state.playerEmitter.forEachAlive(function(p) {
      p.alpha = p.lifespan/ 300;
    });

  }

};