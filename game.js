'use strict';
// import Phaser from 'phaser';
import turnManager from './turnManager.js';
import dungeon from './dungeon.js';
import PlayerCharacter from './player.js';

const scene = {
    preload: function () { 
        this.load.spritesheet('tiles', 'assets/colored.png', { // load tiles

            frameWidth: 16,
            frameHeight: 16,
            spacing: 1
        })
    },
    create: function() {
        dungeon.initialize(this);

        dungeon.player = new PlayerCharacter(15, 15);

        turnManager.addEntity(dungeon.player);
    },
    update: function() {
        if (turnManager.over()) {
            turnManager.refresh();
        }

        turnManager.turn();
    }
}

const config = {
    type: Phaser.AUTO,
    width: 80 * 16,
    height: 50 * 16,
    backgroundColor: '#000',
    parent: 'game',
    pixelArt: true,
    scene: scene,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 0}
        }
    }
}





const game = new Phaser.Game(config);