import { getRandomTagsForEnemy } from './tags.js';
import Bat from './enemies/bat.js';
import Orc from './enemies/orc.js';
import Skeleton from './enemies/skeleton.js';
import Troll from './enemies/troll.js';

const enemies = {       // all enemies
    Bat,
    Orc,
    Skeleton,
    Troll,
}

export default enemies;

export function getRandomEnemy(x, y, modifierCount = 1, effectCount = 1) {
    let key = Phaser.Utils.Array.GetRandom(Object.keys(enemies)); // random enemy
    let tags = getRandomTagsForEnemy(modifierCount, effectCount);        // random tag

    return new enemies[key](x, y).addTags(tags);
}