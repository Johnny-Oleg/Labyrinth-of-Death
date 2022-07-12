import dungeon from '../dungeon.js';
import GenericItem from './genericItem.js';

class Shield extends GenericItem {
    constructor(x, y) {
        super(x, y);

        this.name = 'a Shield';
        this.tile = 134;            // 776
        this.shield = true;
        this.description = 'A basic shield, gives 1 point to defense.';

        dungeon.initializeEntity(this);
    }

    defence() {
        return 1;
    }
}

export default Shield;