var SpaceShooter = SpaceShooter || {};

/**
 * SpaceShooter Boot State
 * This state handles the introductory screen.
 */
SpaceShooter.Boot = function() {

  this.instance = {}
  this.instance.stage  = new SpaceShooter.Prefabs.Stage(this);
  this.instance.music  = new SpaceShooter.Prefabs.Music(this);

};

SpaceShooter.Boot.prototype = {

  preload: function() {
    this.instance.stage.boot.preload();
    this.instance.music.preload();
  },

  create: function() {
    this.instance.stage.boot.create();
    // this.instance.music.create();
  },

};