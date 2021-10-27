import dungeon from '../dungeon.js';
import GenericItem from './genericItem.js';

class Gem extends GenericItem {
    constructor(x, y) {
        super(x, y);

        this.name = 'Gem';
        this.tile = 512;        // 720?

        dungeon.initializeEntity(this);
    }
}

export default Gem;