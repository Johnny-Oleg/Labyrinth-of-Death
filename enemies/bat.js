import dungeon from '../dungeon.js';
import BasicEnemy from './basicEnemy.js';

class Bat extends BasicEnemy {
    constructor(x, y) {
        super(x, y);

        this.x = x;
        this.y = y;
        this.name = 'Bat';
        this.type = 'enemy';
        this.tile = 282;
        this.hp = 2;
        this.mp = 5;
        this.ap = 1;
        this.weapon.name = 'bite';

        this.damage = {
            max: 3,
            min: 1,
        }

        this.refreshRates = {
            hp: 0,
            mp: 5,
            ap: 1,
        }

        dungeon.initializeEntity(this);
    }
}

export default Bat;