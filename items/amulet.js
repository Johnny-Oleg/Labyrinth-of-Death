import dungeon from '../dungeon.js';
import GenericItem from './genericItem.js';

class Amulet extends GenericItem {
    constructor(x, y) {
        super(x, y);

        this.name = 'Amulet';
        this.tile = 942;
        this.ap = 1;
        this.description = 'The Amulet of Labyrinth of Death.';

        dungeon.initializeEntity(this);
    }

    turn() {
        if (dungeon.player.items.includes(this)) {
            dungeon.questComplete();
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

export default Amulet;