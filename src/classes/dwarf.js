import dungeon from '../dungeon.js';
import BasicHero from './basicHero.js';
import Axe from '../items/axe.js';
import Shield from '../items/shield.js';

class Dwarf extends BasicHero {
    constructor(x, y) {
        super(x, y);

        this.name = 'Dwarf';    //? change to warrior or paladin
        this.tile = 31;         // 61
        this.hp = 35;
        this.mp = 2;
        this.ap = 2;

        this.items.push(new Axe());
        this.toggleItem(0);

        this.items.push(new Shield());
        this.toggleItem(1);

        dungeon.initializeEntity(this);
    }

    refresh() {
        this.mp = 2;
        this.ap = 2;
    }
}

export default Dwarf;