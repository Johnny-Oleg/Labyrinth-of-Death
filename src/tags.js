import aggro from './tags/aggro.js';
import burning from './tags/burning.js';
import cursed from './tags/cursed.js';
import fast from './tags/fast.js';
import goingSomewhere from './tags/goingSomewhere.js';
import golden from './tags/golden.js';
import hunter from './tags/hunter.js';
import iron from './tags/iron.js';
import patrolling from './tags/patrolling.js';
import poison from './tags/poison.js';
import royal from './tags/royal.js';
import silver from './tags/silver.js';

const tags = {
    aggro,
    burning,
    cursed,
    fast,
    goingSomewhere,
    golden,
    hunter,
    iron,
    patrolling,
    poison,
    royal,
    silver,
}

export const materials = [false, 'iron', 'iron', false, 'silver', false, 'golden']; // materials are tags that modify the nature of the item
export const enemyModifiers = ['aggro', 'fast', false, false, false, false, 'royal']; // enemy modifiers are bonuses that are applied to a monster
export const behaviors = ['goingSomewhere', 'hunter', 'patrolling']; // behaviors are only applicable to enemies; they will provide the turn function implementation
export const effects = [false, 'poison', false, 'burning', false, 'cursed']; // Effects are tags that cause a side effect at every turn
export function getRandomTagsForItem(modifierCount = 1, effectCount = 0) {
    let res = new Set(); // a set is used so that the same tag is not applied more than once

    while (modifierCount > 0) {
        res.add(Phaser.Utils.Array.GetRandom(materials));

        modifierCount--;
    }

    while (effectCount > 0) {
        res.add(Phaser.Utils.Array.GetRandom(effects));

        effectCount--;
    }

    return [...res];
}

export function getRandomTagsForEnemy(modifierCount = 1) {
    let res = new Set(); // a set is used so that the same tag is not applied more than once

    while (modifierCount > 0) {
        res.add(Phaser.Utils.Array.GetRandom(enemyModifiers));

        modifierCount--;
    }

    res.add(Phaser.Utils.Array.GetRandom(behaviors));

    return [...res];
}

export default tags;

/* Phaser has functions to retrieve random items with a bias toward the beginning of the array – that function is called weightedPick – this allows you a simple but effective way of biasing the results. If you use that function with an array like 
    ["skeleton", "skeleton", "skeleton", "bat", "bat", "orc"] 
the dungeon will be biased toward spawning skeletons and bats. The same can be used to make most monsters into patrolling and going somewhere instead of hunters (that are more dangerous).

Applying this function to tag selection is also a good idea. The royal tag should be rare, and most items don’t actually need a tag. Having an array like
    [false, false, false, "iron", "iron", "silver", "golden"]
would make most of the items untagged. With the default values for the arguments of getRandomTagsForItem, it is impossible to get an effect in the array. A biased approach could make the effects rare by default. */