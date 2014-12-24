var SpaceShooter = SpaceShooter || {};
SpaceShooter.Prefabs = SpaceShooter.Prefabs || {};

// stage constructor
SpaceShooter.Prefabs.Stage = function(state) {
  this.state = state;
};

// stage prototype
SpaceShooter.Prefabs.Stage.prototype = {

  create: function() {

    SpaceShooter.Game.stage.backgroundColor = '#090f1e';

  },

  boot: {

    preload: function() {

      SpaceShooter.Game.stage.backgroundColor = '#000';

      SpaceShooter.Game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      SpaceShooter.Game.scale.pageAlignHorizontally = true;

      SpaceShooter.Game.load.image('logo', 'assets/logo.png');

    },

    create: function() {

      var logo = SpaceShooter.Game.add.sprite(SpaceShooter.Game.world.centerX, SpaceShooter.Game.world.centerY, 'logo');
      logo.anchor.setTo(0.5, 0.5);
      logo.alpha = 0;
      logo.scale.x = 0.8;
      logo.scale.y = 0.8;

      SpaceShooter.Game.add.tween(logo).to({alpha: 1}, 900, Phaser.Easing.Linear.In, true);
      SpaceShooter.Game.add.tween(logo.scale).to({x: 1, y: 1}, 4000, Phaser.Easing.Linear.In, true);

      SpaceShooter.Game.time.events.add(2000, function() {
        SpaceShooter.Game.add.tween(logo).to({alpha: 0}, 1400, Phaser.Easing.Linear.Out, true);
      }, this);

      SpaceShooter.Game.time.events.add(3500, function() {
        SpaceShooter.Game.state.start('Level');
      }, true);

    }

  }

};