var SpaceShooter = SpaceShooter || {};
SpaceShooter.Prefabs = SpaceShooter.Prefabs || {};

// bullets constructor
SpaceShooter.Prefabs.Bullets = function(state) {

  this.instance = {};
  this.instance.fg = new SpaceShooter.Prefabs.Foreground(this);
  this.state = state

};

// bullets prototype
SpaceShooter.Prefabs.Bullets.prototype = {

  preload: function() {

    SpaceShooter.Game.load.image('bullet', 'assets/bullet.png');
    SpaceShooter.Game.load.audio('laser', 'assets/laser.mp3');
    this.instance.fg.preload();

  },

  create: function() {

    // create bullets group
    this.state.bullets = SpaceShooter.Game.add.group();
    this.state.bullets.enableBody = true;
    this.state.bullets.physicsBodyType = Phaser.Physics.P2JS;
    this.state.bullets.createMultiple(90, 'bullet');
    this.state.bullets.setAll('checkWorldBounds', true);
    this.state.bullets.setAll('outOfBoundsKill', true);
    this.state.bullets.setAll('body.collideWorldBounds', false);

    // create bullet sound
    this.state.bulletSound = SpaceShooter.Game.add.audio('laser');
    this.state.bulletSound.allowMultiple = true;
    this.state.bulletSound.volume = 0.2;

    // bullet cooldown tracker
    this.state.bulletTime = 0;

    // create the foreground effect
    this.instance.fg.create();

  },

  update: function() {

    // check if bullet has to be fired or stop player animations
    if (SpaceShooter.Game.input.activePointer.isDown) {
      this.fire();
    } else {
        this.state.player.animations.stop(null, true);
    }

    // update the impact indicator
    this.instance.fg.update();

  },

  fire: function() {

    // check if the cooldown for shooting has passed
    if (SpaceShooter.Game.time.now > this.state.bulletTime) {

      // grab the first bullet from the pool
      var bullet = this.state.bullets.getFirstExists(false);

      // if the bullet was available, fire it
      if (bullet) {
        this.state.player.children[0].start(true, 300, null, 2);
        bullet.reset(this.state.player.x, this.state.player.y);
        bullet.body.rotation = SpaceShooter.Game.physics.arcade.angleToPointer(bullet);
        bullet.body.velocity.x = Math.cos(bullet.body.rotation) * 900;
        bullet.body.velocity.y = Math.sin(bullet.body.rotation) * 900;
        bullet.body.setCollisionGroup(this.state.bulletCollisionGroup);
        bullet.body.collides(this.state.enemyCollisionGroup);
        bullet.body.createGroupCallback(this.state.enemyCollisionGroup, this.impact, this);
        this.state.bulletTime = SpaceShooter.Game.time.now + 80;
        this.state.bulletSound.play();
        bullet.lifespan = 4000;
      }

      // turn the shooting animation on if it is not yet playing
      if (!this.state.isShootingAnimationPlaying) {
        this.state.player.animations.play('shoot', 20, true);
      }

    }

  },

  impact: function(bullet, enemy) {

    // reduce the enemy health 10 points
    enemy.sprite.health -= 1;

    // emit some particles
    this.state.enemyEmitter.x = enemy.sprite.x
    this.state.enemyEmitter.y = enemy.sprite.y
    this.state.enemyEmitter.start(true, 1000, null, 10);

    // show the impact foreground
    this.instance.fg.impact(enemy.sprite.type);

    // kill the bullet
    bullet.sprite.kill();

    // play impact sound
    this.state.enemyImpact.play();

    // animate the enemy with a scale down and up tween to show that he's been hit
    enemy.sprite.scale.setTo(0.8,0.8);
    SpaceShooter.Game.add.tween(enemy.sprite.scale).to({y: 1, x: 1}, 100, Phaser.Easing.Linear.Out, true);

    // if enemy has no more life, kill him and add 10 points
    if (enemy.sprite.health <= 0) {
      enemy.sprite.kill();
      this.state.score += 10;
    }

  }

};