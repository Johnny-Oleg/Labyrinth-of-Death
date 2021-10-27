import dungeon from '../dungeon.js';
import GenericItem from './genericItem.js';

class Axe extends GenericItem {
    constructor(x, y) {
        super(x, y);

        this.name = 'an Axe';
        this.tile = 378;       // 934
        this.weapon = true;
        this.description = 'A basic axe, dealing between 2 and 7 damage.';

        dungeon.initializeEntity(this);
    }

    damage() {
        return Phaser.Math.Between(2, 7);
    }
}

export default Axe;