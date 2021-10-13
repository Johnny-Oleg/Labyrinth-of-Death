import tm from './turnManager.js';
import dungeon from './dungeon.js';
import BSPDungeon from '.bspdungeon.js';
import classes from './classes.js';
import { getRandomItem } from './items.js';
import { getRandomEnemy } from './enemies.js';

const world = {
    key: 'world-scene',
    active: true,

    preload: function () {
        this.load.spritesheet('tiles', 'assets/colored_transparent.png', {
            frameWidth: 16,
            frameHeight: 16,
            spacing: 1,
        })
    },

    create: function () {
        dungeon.initialize(this);

       // dungeon.player = new classes.Cleric(10, 10);    // load game entities
        //dungeon.player = new classes.Dwarf(13, 13);
        dungeon.player = new classes.Elf(14, 18);
       // dungeon.player = new classes.Warrior(15, 15); 
       // dungeon.player = new classes.Wizard(12, 16); 

        tm.addEntity(dungeon.player);                 // adding player character to level

        let monsterCount = 10;                        // adding enemies to level

        while(monsterCount> 0) {
            let tile = dungeon.randomWalkableTile();

            tm.addEntity(getRandomEnemy(tile.x, tile.y));

            monsterCount--;
        }

        let itemCount = 10;                           // adding items to level

        while(itemCount > 0) {
            let tile = dungeon.randomWalkableTile();

            tm.addEntity(getRandomItem(tile.x, tile.y));

            itemCount--;
        }
        

        let camera = this.cameras.main; // set camera, causes game viewport to shrink on the right side freeing space for the UI scene
        camera.setViewport(0, 0, camera.worldView.width - 200, camera.worldView.height);
        camera.setBounds(0, 0, camera.worldView.width, camera.worldView.height);
        camera.startFollow(dungeon.player.sprite);

        this.events.emit('createUI'); // trigger UI scene construction
    },

    update: function() {
        if (tm.over()) {
            tm.refresh();
        }

        tm.turn();
    }
}

export default world;