// import PF from 'pathfinding';

import dungeon from './dungeon.js';

const rn = Math.floor(Math.random() * 3);

class BasicMonster {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.name = 'A Skeleton';
        this.tile = 26; // sprite tile number for monster
        this.hp = 1; // health points
        this.ap = 1; // action points
        this.mp = 1; // movement points

        dungeon.initializeEntity(this);
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

    attack() {
        return rn; // random number for dealing damage
    }
    
    over() {
        return this.mp == 0 && this.ap == 0 && !this.moving;
    }

    onDestroy() {
        console.log(`${this.name} was killed`);
    }
}

export default BasicMonster;