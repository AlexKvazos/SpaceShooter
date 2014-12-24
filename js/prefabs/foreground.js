var SpaceShooter = SpaceShooter || {};
SpaceShooter.Prefabs = SpaceShooter.Prefabs || {};

// foreground constructor
SpaceShooter.Prefabs.Foreground = function(state) {
  this.state = state;
  this.foreground = [];
};

// foreground prototype
SpaceShooter.Prefabs.Foreground.prototype = {

  preload: function() {

    SpaceShooter.Game.load.image('foreground-0', 'assets/foreground-0.png');
    SpaceShooter.Game.load.image('foreground-1', 'assets/foreground-1.png')

  },

  create: function() {

    this.foreground[0] = SpaceShooter.Game.add.sprite(0, 0, 'foreground-0');
    this.foreground[0].z = -100;
    this.foreground[0].alpha = 0;
    this.foreground[0].blendMode = PIXI.blendModes.COLOR_DODGE;

    this.foreground[1] = SpaceShooter.Game.add.sprite(0, 0, 'foreground-1');
    this.foreground[1].z = -100;
    this.foreground[1].alpha = 0;
    this.foreground[1].blendMode = PIXI.blendModes.COLOR_DODGE;

  },

  update: function() {

    this.foreground[0].alpha *= 0.95;
    this.foreground[1].alpha *= 0.95;

  },

  impact: function(type) {

    if (this.foreground[type].alpha < 1) {
      this.foreground[type].alpha += 0.2;
    }

  }

};