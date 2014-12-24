var SpaceShooter = SpaceShooter || {};
SpaceShooter.Prefabs = SpaceShooter.Prefabs || {};

// score constructor
SpaceShooter.Prefabs.Score = function(state) {
  this.state = state;
};

// score prototype
SpaceShooter.Prefabs.Score.prototype = {

  create: function() {

    // score tracker
    this.state.score = 0;

    // score label
    this.state.scoreLabel = SpaceShooter.Game.add.text(SpaceShooter.Game.world.centerX, 35, 'SCORE: 0', {
      font: "35px Roboto Condensed Bold", fill: '#ffab10',
    });
    this.state.scoreLabel.setShadow(2, 2, 'rgba(0,0,0,0.5)', 5);
    this.state.scoreLabel.anchor.setTo(0.5, 0);
    this.state.scoreLabel.z = -9999;

  },

  update: function() {

    // keep the score label updated
    this.state.scoreLabel.text = "SCORE: " + this.state.score; // update the score label

  }

};