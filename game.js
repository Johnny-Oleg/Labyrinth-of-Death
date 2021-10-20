// import Phaser from 'phaser';
import ui from './ui.js';
import world from './world.js';
import intro from './intro.js';
import gameOver from './gameover.js';

const config = {
    type: Phaser.AUTO,
    width: 80 * 16,              // 26 for full screen width
    height: 50 * 16,             // 26 for full screen height
    backgroundColor: '#472d3c',  // #472d3c
    parent: 'game',
    pixelArt: true,
    zoom: 1.14,                  // camera zoom: min 1 to... max
    scene: [intro, world, ui, gameOver],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 0},
        },
    },
}

document.fonts.load('10pt "Doomed"').then(() => {
    const game = new Phaser.Game(config);
})