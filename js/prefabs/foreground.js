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

    SpaceShooter.Game.load.image('blue', 'assets/foregrounds/blue.png');
    SpaceShooter.Game.load.image('green', 'assets/foregrounds/green.png');
    SpaceShooter.Game.load.image('magenta', 'assets/foregrounds/magenta.png');
    SpaceShooter.Game.load.image('red', 'assets/foregrounds/red.png');

  },

  create: function() {

    this.foreground[0] = SpaceShooter.Game.add.sprite(0, 0, 'blue');
    this.foreground[0].z = -100;
    this.foreground[0].alpha = 0;
    this.foreground[0].blendMode = PIXI.blendModes.COLOR_DODGE;

    this.foreground[1] = SpaceShooter.Game.add.sprite(0, 0, 'green');
    this.foreground[1].z = -100;
    this.foreground[1].alpha = 0;
    this.foreground[1].blendMode = PIXI.blendModes.COLOR_DODGE;

    this.foreground[2] = SpaceShooter.Game.add.sprite(0, 0, 'magenta');
    this.foreground[2].z = -100;
    this.foreground[2].alpha = 0;
    this.foreground[2].blendMode = PIXI.blendModes.COLOR_DODGE;

    this.foreground[3] = SpaceShooter.Game.add.sprite(0, 0, 'red');
    this.foreground[3].z = -100;
    this.foreground[3].alpha = 0;
    this.foreground[3].blendMode = PIXI.blendModes.COLOR_DODGE;

  },

  update: function() {

    this.foreground[0].alpha *= 0.98;
    this.foreground[1].alpha *= 0.98;
    this.foreground[2].alpha *= 0.98;
    this.foreground[3].alpha *= 0.98;

  },

  impact: function(type) {

    if (this.foreground[type].alpha < 1) {
      this.foreground[type].alpha += 0.2;
    }

  }

};