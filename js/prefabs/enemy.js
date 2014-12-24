var SpaceShooter = SpaceShooter || {};
SpaceShooter.Prefabs = SpaceShooter.Prefabs || {};

/**
 * Enemy constructor
 * @param {int} groupId          The ID of this enemy (Type of enemy)
 * @param {int} maxEntities      The amount of enemies that will be created
 * @param {int} spawnCoolDown    The amount of time to wait between each enemy spawn
 * @param {String} bodyKey       The key to use for the sprite body
 * @param {String} bodyUrl       The directory where the file is relative to the index
 * @param {String} rotorKey      The key to use for the sprite rotor
 * @param {String} rotorUrl      The directory where the file is relative to the index
 * @param {EnemyFactory} factory Reference to the enemy factory
 */
SpaceShooter.Prefabs.Enemy = function(groupId, maxEntities, spawnCoolDown, bodyKey, bodyUrl, rotorKey, rotorUrl, boundariesRadius, factory) {

  this.enemyFactory = factory;
  this.maxEntities = maxEntities;
  this.spawnCoolDown = spawnCoolDown;
  this.groupId = groupId;
  this.bodyKey = bodyKey;
  this.bodyUrl = bodyUrl;
  this.rotorKey = rotorKey;
  this.rotorUrl = rotorUrl;
  this.boundariesRadius = boundariesRadius;
  this.maxLivingEntities = 2;

};

// enemy prototype
SpaceShooter.Prefabs.Enemy.prototype = {

  preload: function() {
    SpaceShooter.Game.load.image(this.bodyKey, this.bodyUrl);
    SpaceShooter.Game.load.image(this.rotorKey, this.rotorUrl);
  },

  create: function() {

    // create all the possible entities
    this.enemyFactory.enemyGroups[this.groupId] = SpaceShooter.Game.add.group();
    for (var i = 0; i < this.maxEntities; i++) {

      // main body and physics
      var enemy = this.enemyFactory.enemyGroups[this.groupId].create(0, 0, this.bodyKey, 0, false);
      SpaceShooter.Game.physics.p2.enable(enemy, false);
      this.applyBody(enemy);

      // rotor
      var rotor = SpaceShooter.Game.add.sprite(0, 0, this.rotorKey);
      rotor.anchor.setTo(0.5 ,0.5);
      enemy.addChild(rotor);

      // enemy properties
      enemy.maxHealth = 3;
      enemy.speed = 3;
      enemy.type = this.groupId;
      enemy.attackDamage = 5;
      enemy.score = 5;

    }

    // start the timer
    this.spawnTimer = this.spawnCoolDown;

  },

  update: function() {

    // if the cooldown is complete, and there are less living entities than they should
    if (this.spawnTimer <= 0 && this.enemyFactory.enemyGroups[this.groupId].countLiving() < this.maxLivingEntities) {
      // get a dead entity
      var enemy = this.enemyFactory.enemyGroups[this.groupId].getFirstDead();
      // if we got an enemy, respawn it
      if (enemy) {
        enemy.reset(SpaceShooter.Game.rnd.integerInRange(-400, SpaceShooter.Game.world.width+400), -150);
        enemy.health = enemy.maxHealth;
        this.spawnTimer = this.spawnCoolDown;
      }
    }

    // remove the ms elapsed in this frame to the cooldown
    this.spawnTimer -= SpaceShooter.Game.time.elapsedMS;

    // rotate the enemy's rotor
    this.enemyFactory.enemyGroups[this.groupId].forEachAlive(function(enemy) {
        this.move(enemy);
    }, this);

  },

  move: function(enemy) {
    enemy.children[0].angle += 10;
    this.accelerateToObject(enemy, this.enemyFactory.state.player, enemy.speed);
  },

  accelerateToObject: function(obj1, obj2, speed) {
    var angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
    obj1.body.rotation = angle + SpaceShooter.Game.math.degToRad(90);
    obj1.body.x += Math.cos(angle) * speed;
    obj1.body.y += Math.sin(angle) * speed;
  },

  applyBody: function(enemy) {
    enemy.body.setCircle(this.boundariesRadius);
    enemy.body.kinematic = true;
    enemy.body.collideWorldBounds = false;
    enemy.body.setCollisionGroup(this.enemyFactory.state.enemyCollisionGroup);
    enemy.body.collides(this.enemyFactory.state.bulletCollisionGroup);
    enemy.anchor.setTo(0.5, 0.5);
  }

};