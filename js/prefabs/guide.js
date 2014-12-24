var SpaceShooter = SpaceShooter || {};
SpaceShooter.Prefabs = SpaceShooter.Prefabs || {};

// guide constructor
SpaceShooter.Prefabs.Guide = function(state) {
  this.state = state;
};

// guide prototype
SpaceShooter.Prefabs.Guide.prototype = {

  create: function() {

    /**
     * Guide 1
     * "Touch to Shoot"
     */
    var g1 = SpaceShooter.Game.add.text(SpaceShooter.Game.world.centerX, SpaceShooter.Game.world.height, 'TOUCH TO SHOOT', {
      font: '60px Roboto Condensed Light', fill: '#349fff'
    });
    g1.anchor.setTo(0.5, 0);
    g1.z = -9999;
    g1.alpha = 0;

    SpaceShooter.Game.time.events.add(1000, function() {
      SpaceShooter.Game.add.tween(g1).to({y: 500, alpha: 1}, 1200, Phaser.Easing.Cubic.Out, true);
      SpaceShooter.Game.time.events.add(1700, function() {
        SpaceShooter.Game.add.tween(g1).to({y: -g1.height, alpha: 0}, 900, Phaser.Easing.Cubic.In, true);
      }, this);
    }, this);

  }

};