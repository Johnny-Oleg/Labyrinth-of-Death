import dungeon from '../dungeon.js';
import GenericItem from './genericItem.js';

class Stairs extends GenericItem {
    constructor(x, y, direction = 'down') {
        super(x, y);

        if (direction === 'down') {
            this.tile = 291;            // default 195
        } else {
            this.tile = 290;            // default 194
        }

        this.name = 'Stairs';
        this.type = 'stairs';
        this.direction = direction;

        dungeon.initializeEntity(this);
    }
}

export default Stairs;