import { getRandomTagsForItem } from './tags.js';
import Axe from './items/axe.js';
import Bow from './items/bow.js';
import CursedGem from './items/cursedGem.js';
import FireballScroll from './items/fireballScroll.js';
import Gem from './items/gem.js';
import Hammer from './items/hammer.js';
import LightningScroll from './items/lightningScroll.js';
import LongSword from './items/longSword.js';
import HealthPotion from './items/healthPotion.js';
import HolyPotion from './items/holyPotion.js';
import Shield from './items/shield.js';
import Sword from './items/sword.js';

const items = {
    Axe,
    Bow,
    CursedGem,
    FireballScroll,
    Gem,
    Hammer,
    LightningScroll,
    LongSword,
    HealthPotion,
    HolyPotion,
    Shield,
    Sword,
}

export default items;

export function getRandomItem(x, y, modifierCount = 1, effectCount = 1) {
    let key = Phaser.Utils.Array.GetRandom(Object.keys(items)); // random item
    let tags = getRandomTagsForItem(modifierCount, effectCount);       // random tag

    return new items[key](x, y).addTags(tags);
}