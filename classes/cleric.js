import dungeon from '../dungeon.js';
import BasicHero from './basicHero.js';
import Hammer from '../items/hammer.js';

class Cleric extends BasicHero {
    constructor(x, y) {
        super(x, y);

        this.name = 'Cleric';      //? change to paladin
        this.tile = '79';          // 30
        this.hp = 40;
        this.mp = 3;
        this.ap = 2;

        this.items.push(new Hammer());
        this.toggleItem(0);

        dungeon.initializeEntity(this);
    }

    refresh() {
        this.mp = 3;
        this.ap = 2;

        if (this.hp < 40) {        // health regen by 1
            this.hp += 1;

            dungeon.log('Cleric heals 1 hp');
        }

    }
}

export default Cleric;