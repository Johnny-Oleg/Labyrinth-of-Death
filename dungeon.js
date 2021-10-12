// import PF from 'pathfinding';
import tm from './turnManager.js';
import level from './level.js';

let dungeon = {
    msgs: [],        // array for messages
    sprites: {
        floor: 1,    // 0 default
        wall: 867,   // 554 default
    },
    tileSize: 16,    // 16 default

    initialize: function(scene) {
        this.scene = scene;
        this.level = level;

        this.levelWithTiles = level.map(row =>
            row.map(tile =>
                tile == 1 ? this.sprites.wall : this.sprites.floor
            )
        )

        const config = {
            data: this.levelWithTiles,
            tileWidth: this.tileSize,
            tileHeight: this.tileSize,
        }

        const map = scene.make.tilemap(config);
        const tileset = map.addTilesetImage( // key: texture key
            'tiles',
            'tiles',
            this.tileSize,
            this.tileSize,
            0,
            1
        )

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

    randomWalkableTile: function () {       // finds player a random walkable tile
        let x = Phaser.Math.Between(0, dungeon.level[0].length - 1);
        let y = Phaser.Math.Between(0, dungeon.level.length - 1);
        let tileAtDestination = dungeon.map.getTileAt(x, y);

        while (typeof tileAtDestination == 'undefined' || 
            tileAtDestination.index == dungeon.sprites.wall) {
                x = Phaser.Math.Between(0, dungeon.level[0].length - 1);
                y = Phaser.Math.Between(0, dungeon.level.length - 1);

                tileAtDestination = dungeon.map.getTileAt(x, y);
            }
            
            return {x, y}; // the function works by picking a random location and then checking if it is a wall or not. If it is, then it loops picking a different location. The resulting value is an object with coordinates.
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

            if (entity.tint) {                      // check if sprite has a color prop
                entity.sprite.tint = entity.tint;
                entity.sprite.tintFill = true;
            }
        }
    },

    describeEntity: function(entity) {
        if (entity) {
            let name = entity.name;
            let description = entity.description || '';
            let tags = entity._tags ? entity._tags.map(tag => `#${tag}`).join(', ') : '';

            dungeon.log(`${name}\n${tags}\n${description}`);
        }
    },

    removeEntity: function(entity) {
        entity.sprite.destroy();        //? tm.entities.delete(entity);
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
        entity.x = x;
        entity.y = y;

        this.scene.tweens.add({
            targets: entity.sprite,
            onComplete: () => entity.moving = false,
            x: this.map.tileToWorldX(x),
            y: this.map.tileToWorldY(y),
            ease: 'Power2',
            duration: 200,
        })
    },

    distanceBetweenEntities: function(e1, e2) {
        let grid = new PF.Grid(dungeon.level);
        let finder = new PF.AStarFinder({allowDiagonal: true});
        let path = finder.findPath(e1.x, e1.y, e2.x, e2.y, grid);

        if (path.length >= 2) {
            return path.length;
        } else {
            return false;
        }
    },

    attackEntity: function(attacker, target, weapon) {
        attacker.moving = true;
        attacker.tweens = attacker.tweens || 0;
        attacker.tweens += 1;

        let ranged = weapon.range?.() ? weapon.attackTile : false;    //? err?
        let tint = weapon.range?.() && weapon.tint ? weapon.tint : false; //? err?

        if (!ranged) {                          // close melee attack
            this.scene.tweens.add({
                targets: attacker.sprite,
                onComplete: () => {
                    attacker.sprite.x = this.map.tileToWorldX(attacker.x);
                    attacker.sprite.y = this.map.tileToWorldY(attacker.y);

                    attacker.moving = false;
                    attacker.tweens -= 1;

                    let attack = attacker.attack();
                    let defence = target.defence();
                    let damage = attack - defence;

                    if (damage > 0) {
                        target.hp -= damage;

                        this.log(
                            `${attacker.name} does ${damage} damage to ${target.name} with ${weapon.name}.`
                        );

                        weapon.executeTag('damagedEntity', target);

                        if (target.hp <= 0) {
                            this.removeEntity(target);
                        }
                    }
                },
                x: this.map.tileToWorldX(target.x),
                y: this.map.tileToWorldY(target.y),
                ease: 'Power2',
                hold: 20,
                duration: 80,
                delay: attacker.tweens * 200,
                yoyo: true,
            })
        } else {                                         // ranged attack
            const x = this.map.tileToWorldX(attacker.x);
            const y = this.map.tileToWorldX(attacker.y);
            const sprite = dungeon.scene.add.sprite(x, y, 'tiles', ranged).setOrigin(0);

            if (tint) {
                sprite.tint = tint; 
                sprite.tintFill = true;
            }

            this.scene.tweens.add({
                targets: sprite,
                onComplete: () => {
                    attacker.moving = false;
                    attacker.tweens -= 1;

                    let attack = attacker.attack();
                    let defence = target.defence();
                    let damage = attack - defence;

                    if (damage > 0) {
                        target.hp -= damage;

                        this.log(
                            `${attacker.name} does ${damage} damage to ${target.name} with ${weapon.name}.`
                        );

                        weapon.executeTag('damagedEntity', target);

                        if (target.hp <= 0) {
                            this.removeEntity(target);
                        }
                    }

                    sprite.destroy();
                },
                x: this.map.tileToWorldX(target.x),
                y: this.map.tileToWorldY(target.y),
                ease: 'Power2',
                hold: 20,
                duration: 80,
                delay: attacker.tweens * 200,
            });
        }
    },

    log: function(text) {
        this.msgs.unshift(text);
        this.msgs = this.msgs.slice(0, 8);
    }
}

export default dungeon;