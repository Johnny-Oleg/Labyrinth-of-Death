import tm from './turnManager.js';
import dungeon from './dungeon.js';
import PlayerCharacter from './player.js';
import BasicMonster from './enemies/skeleton.js';

const world = {
    key: 'world-scene',
    active: true,

    preload: function () {
        this.load.spritesheet('tiles', 'assets/colored.png', {
            frameWidth: 16,
            frameHeight: 16,
            spacing: 1,
        });
    },

    create: function () {
        dungeon.initialize(this);

        dungeon.player = new PlayerCharacter(15, 15); // load game entities

        tm.addEntity(dungeon.player);
        tm.addEntity(new BasicMonster(20, 10));
        tm.addEntity(new BasicMonster(21, 11));
        tm.addEntity(new BasicMonster(70, 8));
        tm.addEntity(new BasicMonster(29, 24));
        tm.addEntity(new BasicMonster(29, 20));

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