import dungeon from '../dungeon.js';
import BasicEnemy from './basicEnemy.js';

class Orc extends BasicEnemy {
    constructor(x, y) {
        super(x, y);

        this.x = x;
        this.y = y;
        this.name = 'Orc';
        this.type = 'enemy';
        this.tile = 57;
        this.hp = 4;
        this.mp = 2;
        this.ap = 1;
        this.weapon.name = 'club';

        this.damage = {
            max: 5,
            min: 2,
        }

        this.refreshRates = {
            hp: 0,
            mp: 2,
            ap: 1,
        }

        dungeon.initializeEntity(this);
    }
}

export default Orc;