import dungeon from '../dungeon.js';
import GenericItem from './genericItem.js';

class HolyPotion extends GenericItem {
    constructor(x, y) {
        super(x, y);

        this.name = 'Holy Potion';
        this.tile = 657;             // 761?
        this.description = 'A potion that removes cursed items when equipped.';

        dungeon.initializeEntity(this);
    }

    equip(itemNumber) {
        dungeon.log('A blessing passes through your body and removes all cursed items.');
        
        dungeon.player.removeItemByProperty('cursed', true);
        dungeon.player.removeItem(itemNumber);
    }
}

export default HolyPotion;