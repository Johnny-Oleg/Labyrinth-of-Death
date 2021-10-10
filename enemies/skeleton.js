import dungeon from '../dungeon.js';
import BasicEnemy from './basicEnemy.js';

class Skeleton extends BasicEnemy {
    constructor(x, y) {
        super(x, y);

        this.x = x;
        this.y = y;
        this.name = 'Skeleton';
        this.type = 'enemy';
        this.tile = 26;             // sprite tile number for monster
        this.hp = 4;                // health points
        this.mp = 3;                // movement points
        this.ap = 1;                // action points
        this.weapon.name = 'pike';
        
        this.damage = {
            max: 4,
            min: 1 
        }

        this.refreshRates = {
            hp: 0,
            mp: 3,
            ap: 1,
        }

        dungeon.initializeEntity(this);
    }
}

export default Skeleton;