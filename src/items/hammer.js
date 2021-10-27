import dungeon from '../dungeon.js';
import GenericItem from './genericItem.js';

class Hammer extends GenericItem {
    constructor(x, y) {
        super(x, y);

        this.name = 'a Warhammer';
        this.tile = '373';          // 933
        this.weapon = true;
        this.description = 'A basic warhammer, dealing between 3 and 8 damage';

        dungeon.initializeEntity(this);
    }

    damage() {
        return Phaser.Math.Between(3, 8);
    }
}

export default Hammer;