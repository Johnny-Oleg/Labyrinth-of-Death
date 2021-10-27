import dungeon from '../dungeon.js';
import GenericItem from './genericItem.js';

class Sword extends GenericItem {
    constructor(x, y) {
        super(x, y);

        this.name = 'a Sword';
        this.tile = 320;          // 994?
        this.weapon = true;
        this.description = 'A basic sword, dealing between 1 and 5 damage';

        dungeon.initializeEntity(this);
    }

    damage() {
        return Phaser.Math.Between(1, 5);
    }
}

export default Sword;