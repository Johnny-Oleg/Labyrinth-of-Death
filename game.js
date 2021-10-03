// 'use strict';
// import Phaser from 'phaser';
import tm from './turnManager.js';
import dungeon from './dungeon.js';
import PlayerCharacter from './player.js';
import BasicMonster from './monster.js';

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

        tm.addEntity(dungeon.player);
        tm.addEntity(new BasicMonster(70, 8));
    },
    update: function() {
        if (tm.over()) {
            tm.refresh();
        }

        tm.turn();
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