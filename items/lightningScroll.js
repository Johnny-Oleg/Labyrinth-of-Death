import dungeon from '../dungeon.js';
import GenericItem from './genericItem.js';

class LightningScroll extends GenericItem {
    constructor(x, y) {
        super(x, y);

        this.name = 'a Scroll of Lightning';
        this.tile = 224;                    // 881
        this.attackTile = 607;              // 413
        this.tint = 0x0022ff;               // sprite color
        this.weapon = true;
        this.description =
            'A scroll of Lightning, dealing between 1 and 2 damage. Range is seven tiles.';

        dungeon.initializeEntity(this);
    }

    damage() {
        return Phaser.Math.Between(1, 2);
    }

    range() {
        return 7;
    }
}

export default LightningScroll;
