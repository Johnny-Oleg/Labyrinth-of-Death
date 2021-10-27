import dungeon from '../dungeon.js';
import BasicEnemy from './basicEnemy.js';

class Troll extends BasicEnemy {
    constructor(x, y) {
        super(x, y);

        this.x = x;
        this.y = y;
        this.name = 'Troll';
        this.type = 'enemy';
        this.tile = 122;        // 286
        this.hp = 8;
        this.mp = 2;
        this.ap = 1;
        this.weapon.name = 'club';

        this.damage = {
            max: 6,
            min: 3,
        }

        this.refreshRates = {
            hp: 0,
            mp: 2,
            ap: 1,
        }

        dungeon.initializeEntity(this);
    }
}

export default Troll;