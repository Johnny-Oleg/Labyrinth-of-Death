// 'use strict';
// import Phaser from 'phaser';
import ui from './ui.js';
import world from './world.js';

const config = {
    type: Phaser.AUTO,
    width: 80 * 16,              // 26 for full screen width
    height: 50 * 16,             // 26 for full screen height
    backgroundColor: '#472d3c', // #472d3c
    parent: 'game',
    pixelArt: true,
    zoom: 1,                    // camera zoom: min 1 to... max
    scene: [world, ui],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
        },
    },
};

const game = new Phaser.Game(config);