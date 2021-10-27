import dungeon from '../dungeon.js';
import GenericItem from './genericItem.js';

class FireballScroll extends GenericItem {
    constructor(x, y) {
        super(x, y);

        this.name = 'a Scroll of Fireball';
        this.tile = 224;                    // 881 (431)
        this.attackTile = 556;              // 335
        this.tint = 0xdd0000;               // sprite color
        this.weapon = true;
        this.description = 'A scroll of Fireball, dealing between 1 and 4 damage. Range is four tiles.';

        dungeon.initializeEntity(this);
    }

    damage() {
        return Phaser.Math.Between(1, 4)
    }

    range() {
        return 4
    }
}

export default FireballScroll;