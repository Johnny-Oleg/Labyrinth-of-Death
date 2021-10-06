import tm from './turnManager.js';
import dungeon from './dungeon.js';

import PlayerCharacter from './player.js';
import Skeleton from './enemies/skeleton.js';
import Gem from './items/gem.js';
import CursedGem from './items/cursedGem.js';
import HealthPotion from './items/healthPotion.js';
import HolyPotion from './items/holyPotion.js';
import LongSword from './items/longSword.js';

const world = {
    key: 'world-scene',
    active: true,

    preload: function () {
        this.load.spritesheet('tiles', 'assets/colored_transparent.png', {
            frameWidth: 16,
            frameHeight: 16,
            spacing: 1,
        });
    },

    create: function () {
        dungeon.initialize(this);

        dungeon.player = new PlayerCharacter(15, 15); // load game entities

        tm.addEntity(dungeon.player);         // adding player character to level

        tm.addEntity(new Skeleton(20, 10));   // adding enemies to level
        tm.addEntity(new Skeleton(21, 11));
        tm.addEntity(new Skeleton(70, 8));
        tm.addEntity(new Skeleton(29, 24));
        tm.addEntity(new Skeleton(29, 20));

        tm.addEntity(new Gem(21, 21));        // adding items to level
        tm.addEntity(new CursedGem(15, 20));
        tm.addEntity(new HealthPotion(45, 20));
        tm.addEntity(new HolyPotion(18, 18));
        tm.addEntity(new LongSword(18, 22));

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