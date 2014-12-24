var SpaceShooter = SpaceShooter || {};
SpaceShooter.Prefabs = SpaceShooter.Prefabs || {};

// music constructor
SpaceShooter.Prefabs.Music = function(state) {
  this.state = state;
};

// music prototype
SpaceShooter.Prefabs.Music.prototype = {

  preload: function() {
    SpaceShooter.Game.load.audio('backgroundMusic', 'assets/music.mp3');
  },

  create: function() {
    SpaceShooter.backgroundMusic = SpaceShooter.Game.add.audio('backgroundMusic');
    SpaceShooter.backgroundMusic.onDecoded.add(this.play, this);
  },

  play: function() {
    if (!SpaceShooter.Prefabs.Music.isPlaying) {
      SpaceShooter.Prefabs.Music.isPlaying = true;
      SpaceShooter.backgroundMusic.fadeIn(3000, true);
    }
  }

};