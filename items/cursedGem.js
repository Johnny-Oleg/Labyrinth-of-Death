import dungeon from '../dungeon.js';
import GenericItem from './genericItem.js';


class CursedGem extends GenericItem {
    constructor(x, y) {
        super(x, y);

        this.name = 'Cursed Gem';
        this.tile = 513;              // 720?
        this.cursed = true;
        this.ap = 1; // action points
        this.description = 'A cursed gem that is now stuck to your hand. You can only remove it by finding a potion';

        dungeon.initializeEntity(this);
    }

    turn() {
        if (dungeon.player.items.includes(this)) {
            this.active = true;

            dungeon.log('Cursed gem gives 1 damage to player. Find potion to cure.');
            dungeon.player.hp -= 1;

            this.ap = 0;
        }

        this.ap = 0;
    }

    refresh() {
        this.ap = 1;
    }

    over() {
        return this.ap == 0;
    }
}

export default CursedGem;