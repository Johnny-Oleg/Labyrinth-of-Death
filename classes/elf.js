import dungeon from '../dungeon.js';
import BasicHero from './basicHero.js';
import Bow from '../items/bow.js';

class Elf extends BasicHero {
    constructor(x, y) {
        super(x, y);

        this.name = 'Elf';
        this.tile = 74;         // 56
        this.hp = 20;
        this.mp = 4;
        this.ap = 3;

        this.items.push(new Bow());
        this.toggleItem(0);

        dungeon.initializeEntity(this);
    }

    refresh() {
        this.mp = 4;
        this.ap = 3;
    }
}

export default Elf;