var SpaceShooter = SpaceShooter || {};
SpaceShooter.Prefabs = SpaceShooter.Prefabs || {};

// debug constructor
SpaceShooter.Prefabs.Debug = function(state) {
  this.state = state;
}

// debug prototype
SpaceShooter.Prefabs.Debug.prototype = {

  preload: function() {

    SpaceShooter.Game.debug.font = '20px Arial';
    SpaceShooter.Game.debug.lineHeight = 20;

  },

  render: function() {

  }

}