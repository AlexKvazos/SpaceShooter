var SpaceShooter = SpaceShooter || {};
SpaceShooter.Prefabs = SpaceShooter.Prefabs || {};

// physics constructor
SpaceShooter.Prefabs.Physics = function(state) {
  this.state = state;
};

// physics prototype
SpaceShooter.Prefabs.Physics.prototype = {

  create: function() {

    // physics system setup
    SpaceShooter.Game.world.setBounds(0, 0, 640, 1136);
    SpaceShooter.Game.physics.startSystem(Phaser.Physics.P2JS);
    SpaceShooter.Game.physics.p2.setImpactEvents(true);

    // collision groups
    this.state.enemyCollisionGroup = SpaceShooter.Game.physics.p2.createCollisionGroup();
    this.state.playerCollisionGroup = SpaceShooter.Game.physics.p2.createCollisionGroup();
    this.state.bulletCollisionGroup = SpaceShooter.Game.physics.p2.createCollisionGroup();

    // update bounds collision groups
    SpaceShooter.Game.physics.p2.updateBoundsCollisionGroup();

  }

}