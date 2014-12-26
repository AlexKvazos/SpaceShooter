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

    // create player body
    var player = SpaceShooter.Game.add.sprite(SpaceShooter.Game.world.centerX, SpaceShooter.Game.world.height-50, 'empty');
    SpaceShooter.Game.physics.p2.enable(player);
    player.body.setCircle(30);
    player.body.collideWorldBounds = true;
    player.body.dynamic = true;
    player.body.fixedRotation = true;
    player.body.updateCollisionMask();
    player.tiltSpeed = 0;
    player.anchor.setTo(1, 1);
    isShootingAnimationPlaying = false;

    // create player particle emitter
    this.state.playerEmitter = SpaceShooter.Game.add.emitter(0, 0);
    this.state.playerEmitter.makeParticles('particle', [0, 1, 2, 3, 4, 5, 6]);
    this.state.playerEmitter.angularDrag = 90;
    this.state.playerEmitter.gravity = 0;
    this.state.playerEmitter.minParticleSpeed.setTo(250, -100);
    this.state.playerEmitter.maxParticleSpeed.setTo(50, 100);
    player.addChild(this.state.playerEmitter);

    // add sprite to the player body
    var sprite = SpaceShooter.Game.add.sprite(0, 0, 'player');
    sprite.anchor.setTo(0.5, 0.5);
    sprite.animations.add('shoot');
    player.addChild(sprite);

    this.state.player = player;

    // handle device tilting
    window.addEventListener('devicemotion', function(deviceMotion) {
      player.tiltSpeed = deviceMotion.rotationRate.gamma * 20;
    });

  },

  update: function() {

    // reset the player velocity
    this.state.player.body.setZeroVelocity();

    // rotate the player sprite and particles towards the active pointer
    this.state.player.children[0].rotation = SpaceShooter.Game.physics.arcade.angleToPointer(this.state.player);
    this.state.player.children[1].rotation = SpaceShooter.Game.physics.arcade.angleToPointer(this.state.player);

    // set the tilt speed as the x velocity of the player
    this.state.player.body.velocity.x = this.state.player.tiltSpeed;

    // fade out particles create by the player particle emitter
    this.state.playerEmitter.forEachAlive(function(p) {
      p.alpha = p.lifespan/ 300;
    });

  }

};