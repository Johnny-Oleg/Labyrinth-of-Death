import dungeon from '../dungeon.js';
import BasicHero from './basicHero.js';
import Sword from '../items/sword.js';

class Warrior extends BasicHero {     // ? change to knight
    constructor(x, y) {
        super(x, y);

        this.name = 'Warrior';
        this.tile = 28;
        this.hp = 30;
        this.mp = 3;
        this.ap = 4;
        this.items.push(new Sword()); // starting weapon
        this.toggleItem(0);

        dungeon.initializeEntity(this);
    }

    refresh() {
        this.mp = 3;
        this.ap = 2;
    }
}

export default Warrior;