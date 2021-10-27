import dungeon from '../dungeon.js';
import BasicHero from './basicHero.js';
import HealthPotion from '../items/healthPotion.js';
import FireballScroll from '../items/fireballScroll.js';
import LightningScroll from '../items/lightningScroll.js'

class Wizard extends BasicHero {
    constructor(x, y) {
        super(x, y);

        this.name = 'Wizard';
        this.tile = 72;         // 88
        this.hp = 20;
        this.mp = 3;
        this.ap = 1;

        this.items.push(new FireballScroll());
        this.items.push(new LightningScroll());
        this.items.push(new HealthPotion());
        this.items.push(new HealthPotion());
        this.toggleItem(1);

        dungeon.initializeEntity(this);
    }

    refresh() {
        this.mp = 3;
        this.ap = 1;
    }
}

export default Wizard;