import dungeon from '../dungeon.js';
import GenericItem from './genericItem.js';

class Bow extends GenericItem {
    constructor(x, y) {
        super(x, y);

        this.name = 'a Bow';
        this.tile = 325;        // 901
        this.attackTile = 280;  // 872
        this.tint = 0xcfc6b8;
        this.weapon = true;
        this.description =
            'A bow with arrows, dealing between 1 and 3 damage. Range is four tiles.';

        dungeon.initializeEntity(this);
    }

    damage() {
        return Phaser.Math.Between(1, 3);
    }

    range() {
        return 5;
    }
}

export default Bow;