// import PF from 'pathfinding';

import tm from './turnManager.js';
import level from './level.js';

let dungeon = {
    msgs: [],  // array for messages
    sprites: {
        floor: 0,
        wall: 554,
    },
    tileSize: 16,

    initialize: function(scene) {
        this.scene = scene;
        this.level = level;

        let levelWithTiles = level.map((row) =>
            row.map((tile) =>
                tile == 1 ? this.sprites.wall : this.sprites.floor
            )
        );

        const config = {
            data: levelWithTiles,
            tileWidth: this.tileSize,
            tileHeight: this.tileSize,
        };

        const map = scene.make.tilemap(config);
        const tileset = map.addTilesetImage(
            'tiles',
            'tiles',
            this.tileSize,
            this.tileSize,
            0,
            1
        );

        this.map = map.createLayer(0, tileset, 0, 0);
    },

    isWalkableTile: function(x, y) {
        let allEntities = [...tm.entities];                  // check all entities

        for (let e = 0; e < allEntities.length; e++) {
            let entity = allEntities[e];

            if (entity.sprite && entity.x == x && entity.y == y) {
                return false;
            }
        }

        let tileAtDestination = dungeon.map.getTileAt(x, y); // check level

        return tileAtDestination.index !== dungeon.sprites.wall;
    },

    entityAtTile: function(x, y) {
        let allEntities = [...tm.entities];

        for (let e = 0; e < allEntities.length; e++) {
            let entity = allEntities[e];

            if (entity.sprite && entity.x == x && entity.y == y) {
                return entity;
            }
        }

        return false;
    },

    initializeEntity: function(entity) {
        if (entity.x && entity.y) {
            let x = this.map.tileToWorldX(entity.x);
            let y = this.map.tileToWorldY(entity.y);
            
            entity.sprite = this.scene.add.sprite(x, y, 'tiles', entity.tile);
            entity.sprite.setOrigin(0);
        }
    },

    removeEntity: function (entity) {
        tm.entities.delete(entity);
        entity.sprite.destroy();

        delete entity.sprite;

        entity.onDestroy();
    },

    itemPicked: function(entity) {
        entity.sprite.destroy();

        delete entity.sprite;
    },

    moveEntityTo: function(entity, x, y) {
        entity.moving = true;

        this.scene.tweens.add({
            targets: entity.sprite,
            onComplete: () => {
                entity.moving = false;
                entity.x = x;
                entity.y = y;
            },
            x: this.map.tileToWorldX(x),
            y: this.map.tileToWorldY(y),
            ease: 'Power2',
            duration: 200,
        });
    },

    distanceBetweenEntities: function(e1, e2) {
        let grid = new PF.Grid(dungeon.level);
        let finder = new PF.AStarFinder({
            allowDiagonal: true,
        });

        let path = finder.findPath(e1.x, e1.y, e2.x, e2.y, grid);

        if (path.length >= 2) {
            return path.length;
        } else {
            return false;
        }
    },

    attackEntity: function(attacker, target) {
        attacker.moving = true;
        attacker.tweens = attacker.tweens || 0;
        attacker.tweens += 1;

        this.scene.tweens.add({
            targets: attacker.sprite,
            onComplete: () => {
                attacker.sprite.x = this.map.tileToWorldX(attacker.x);
                attacker.sprite.y = this.map.tileToWorldY(attacker.y);
                attacker.moving = false;
                attacker.tweens -= 1;

                let damage = attacker.attack();

                target.hp -= damage;
                this.log(
                    `${attacker.name} does ${damage} damage to ${target.name}.`
                );

                if (target.hp <= 0) {
                    this.removeEntity(target);
                }
            },
            x: this.map.tileToWorldX(target.x),
            y: this.map.tileToWorldY(target.y),
            ease: 'Power2',
            hold: 20,
            duration: 80,
            delay: attacker.tweens * 200,
            yoyo: true,
        });
    },

    log: function(text) {
        this.msgs.unshift(text);
        this.msgs = this.msgs.slice(0, 8);
    }
};

export default dungeon;