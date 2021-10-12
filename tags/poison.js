import dungeon from '../dungeon.js';

const poison = {
    name: 'Poison',
    initialize: function(damage = 1, howManyTurns = 10) {
        this._poisonDamage = damage;
        this._howManyTurns = howManyTurns;

        if (this.type === 'item' && this.weapon === true) {
            this.tint = 0xdd00cd;       // 0x002300       

            if (this.sprite) {
                this.sprite.tint = this.tint;
                this.sprite.tintFill = true;
            }
        } else {

        }
    },

    damagedEntity(entity) {
        entity.addTag(poison);

        return entity;
    },

    turn() {
        if (this.type !== 'item') {
            if (this._howManyTurns > 0 && !this._poisonActivated) {
                this._poisonActivated = true;
                this.hp -= this._poisonDamage;
                this._howManyTurns -= 1;

                dungeon.log(
                    `${this.name} suffers ${this._poisonDamage} from poison.`
                );
            }

            if (this._howManyTurns == 0) {
                this.removeTag(poison);
            }
        }
    },

    refresh() {
        this._poisonActivated = false;
    }
}

export default poison;