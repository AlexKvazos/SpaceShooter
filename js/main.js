/**
 * SpaceShooter
 * Copyright (C) 2014 - Alejandro Cavazos
 */

var SpaceShooter = SpaceShooter || {};

SpaceShooter.Game = new Phaser.Game(640, 1136, Phaser.WEBGL, '');

SpaceShooter.Game.state.add('Boot', SpaceShooter.Boot);
SpaceShooter.Game.state.add('Level', SpaceShooter.Level);
SpaceShooter.Game.state.start('Boot');