import dungeon from '../dungeon.js';
import GenericItem from './genericItem.js';

class LongSword extends GenericItem {
    constructor(x, y) {
        super(x, y);

        this.name = 'a Long Sword';
        this.tile = 368;             // 992?
        this.weapon = true;
        this.class = 'sword'; // optional weapon type for player sprite change
        this.description = 'A long sword, dealing between 4 and 8 damage';

        dungeon.initializeEntity(this);
    }

    damage() {
        return Phaser.Math.Between(4, 8);
    }
}

export default LongSword;