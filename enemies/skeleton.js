// import PF from 'pathfinding';
import tm from '../turnManager.js';
import dungeon from '../dungeon.js';
import Gem from '../items/gem.js';
import LongSword from '../items/longSword.js';
import HolyPotion from '../items/holyPotion.js';

const rn = Math.floor(Math.random() * 3);

class Skeleton {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.name = 'Skeleton';
        this.type = 'enemy';
        this.tile = 26; // sprite tile number for monster
        this.hp = 1; // health points
        this.ap = 1; // action points
        this.mp = 1; // movement points

        dungeon.initializeEntity(this);
    }

    attack() {
        return Phaser.Math.Between(1, 3); // random number for dealing damage
    }

    refresh() {
        this.mp = 1;
        this.ap = 1;
    }

    turn() {
        let oldX = this.x;
        let oldY = this.y;
        let pX = dungeon.player.x;
        let pY = dungeon.player.y;

        let grid = new PF.Grid(dungeon.level);
        let finder = new PF.AStarFinder();

        let path = finder.findPath(oldX, oldY, pX, pY, grid);

        if (this.mp > 0) {
            if (path.length > 2) {
                dungeon.moveEntityTo(this, path[1][0], path[1][1]);
            }

            this.mp -= 1;
        }

        if (this.ap > 0) {
            if (dungeon.distanceBetweenEntities(this, dungeon.player) <= 2) {
                dungeon.attackEntity(this, dungeon.player);
            }

            this.ap -= 1;
        }
    }
    
    over() {
        let isOver = this.mp == 0 && this.ap == 0 && !this.moving;

        if (isOver && this.UItext) {
            this.UItext.setColor('#cfc6b8');
        } else {
            this.UItext.setColor('#fff');
        }

        return isOver;
    }

    onDestroy() {
        dungeon.log(`${this.name} was killed`);

        this.UIsprite.setAlpha(0.2);
        this.UItext.setAlpha(0.2);

        let x = this.x;           // possible loot drops
        let y = this.y;

        let lootDrops = [false, false, Gem, LongSword, HolyPotion]; // array of loot

        let lootIndex = Phaser.Math.Between(0, lootDrops.length - 1); // choosing random loot

        if (lootDrops[lootIndex]) {              // if loot exists drop it from enemy
            let item = lootDrops[lootIndex];

            tm.addEntity(new item(x, y));
            dungeon.log(`${this.name} drops ${item.name}.`);
        }
    }

    createUI(config) {
        let scene = config.scene;
        let x = config.x;
        let y = config.y;

        this.UIsprite = scene.add.sprite(x, y, 'tiles', this.tile).setOrigin(0);
        this.UItext = scene.add.text(x + 20, y, this.name, {font: '16px Arial', fill: '#cfc6b8'});

        return 30;
    }
}

export default Skeleton;