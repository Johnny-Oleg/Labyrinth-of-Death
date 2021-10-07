import dungeon from '../dungeon.js';
import GenericItem from './genericItem.js';

class HealthPotion extends GenericItem {
    constructor(x, y) {
        super(x, y);

        this.name = 'Health Potion';
        this.tile = 656; // 761?
        this.description = 'A potion that cures between 3 and 5 hp when equipped.';

        dungeon.initializeEntity(this);
    }

    equip(itemNumber) {
        const points = Phaser.Math.Between(3, 5);
        
        dungeon.log(`A warm feeling is felt when drinking ${this} as its restores ${points} hp.`);
        
        dungeon.player.hp += 10;
        dungeon.player.removeItem(itemNumber);
    }
}

export default HealthPotion;