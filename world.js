import tm from './turnManager.js';
import dungeon from './dungeon.js';
import BSPDungeon from './bspdungeon.js';
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
        let dg = new BSPDungeon(80, 50, 4); // instance with an 80x50 grid
        let level = dg.toLevelData(); // and tell the algorithm to iterate over it four times
        
        dungeon.initialize(this, level);

        let rooms = dg.getRooms();          // get rooms
        let node = dg.tree.left;

        while (node.left !== false) {       // places player in the room at the left-most tree node
            node = node.left;
        }
        
        let r = node.area.room;
        let p = dungeon.randomWalkableTileInRoom(r.x, r.y, r.w, r.h);

       // dungeon.player = new classes.Cleric(10, 10);    // load game entities
        //dungeon.player = new classes.Dwarf(13, 13);
        // dungeon.player = new classes.Elf(14, 18);
       // dungeon.player = new classes.Warrior(15, 15); 
       // dungeon.player = new classes.Wizard(12, 16); 
        dungeon.player = new classes.Elf(p.x, p.y);

        tm.addEntity(dungeon.player);                 // adding player character to level

        rooms.forEach(room => { // weightedPick function returns a random element 
            let area = room.w * room.h;     // from the array biased toward the initial elements
            let monsterCount = 0;                        // adding enemies to level
            let itemCount = 0;                           // adding items to level

            let roomType = Phaser.Math.RND.weightedPick( [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3]);
                                // by repeating elements, we increase the chances of them happening,
            switch (roomType) { // especially when adding elements to the beginning of the array
                case 0:             // empty room
                    monsterCount = 0;
                    itemCount = 0;

                    break;
                case 1:             // a monster
                    monsterCount = 1;
                    itemCount = 0;

                    break;
                case 2:             // monster and items
                    monsterCount = 2;
                    itemCount = 1;

                    break;
                case 3:             // treasure room
                    monsterCount = 0;
                    itemCount = 5;

                    break;  // used to alter how many items and monsters are in each room depending on the value of the roomType variable
            }   
            
            while(monsterCount > 0) {    // places the entities in the correct location
                let tile = dungeon.randomWalkableTileInRoom(room.x, room.y, room.w, room.h)
    
                tm.addEntity(getRandomEnemy(tile.x, tile.y));
    
                monsterCount--;
            }

            while(itemCount > 0) {
                let tile = dungeon.randomWalkableTileInRoom(room.x, room.y, room.w, room.h)
    
                tm.addEntity(getRandomItem(tile.x, tile.y));
    
                itemCount--;
            }
        })

        let camera = this.cameras.main; // set camera, causes game viewport to shrink on the right side freeing space for the UI scene
        camera.setViewport(0, 0, camera.worldView.width - 200, camera.worldView.height);
        camera.setBounds(0, 0, camera.worldView.width, camera.worldView.height);
        camera.startFollow(dungeon.player.sprite);

        this.events.emit('createUI');   // trigger UI scene construction

        dg.tree.forEachArea(area => {                  // <- optional  
            let x = dungeon.map.tileToWorldX(area.x);
            let y = dungeon.map.tileToWorldY(area.y);

            let w = area.w * 16;
            let h = area.h * 16;

            this.add.rectangle(x, y, w, h)
                .setStrokeStyle(4, 0xff0000, 1, 0.7)
                .setOrigin(0);
        })
    },

    update: function() {
        if (tm.over()) {
            tm.refresh();
        }

        tm.turn();
    }
}

export default world;