import dungeon from '../dungeon.js';
import GenericItem from './genericItem.js';

class HealthPotion extends GenericItem {
    constructor(x, y) {
        super(x, y);

        this.name = 'Holy Potion';
        this.tile = 656; // 761?
        this.description = 'A potion that heals player for 10hp when equipped.';

        dungeon.initializeEntity(this);
    }

    equip(itemNumber) {
        dungeon.log('A warmth passes through your body and heals you for 10 Hp.');
        
        dungeon.player.hp += 10;
        dungeon.player.removeItem(itemNumber);
    }
}

export default HealthPotion;