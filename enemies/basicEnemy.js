import tm from '../turnManager.js';
import dungeon from '../dungeon.js';
import Taggable from '../taggable.js';
// import { getRandomItem } from '../items.js';
import GenericItem from '../items/genericItem.js';

class BasicEnemy extends Taggable {
    constructor(x, y) {
        super(x, y);

        this.x = x;
        this.y = y;
        this.name = 'Basic Enemy';
        this.type = 'enemy';
        this.tile = 26;
        this.hp = 1;
        this.maxHP = this.hp;
        this.mp = 1;
        this.ap = 1;
        this.moving = false;
        this.weapon = new GenericItem();
        this.loot = [];

        this.damage = { 
            max: 4,
            min: 1,
        }

        this.armor = {
            max: 0,
            min: 0,
        }

        this.refreshRates = {
            hp: 0, // setting rate to 0 makes sure that we don’t start healing all the monsters
            mp: 1,
            ap: 1,
        }
    }

    attack() {
        return Phaser.Math.Between(this.damage.min, this.damage.max);
    }

    defence() {
        return Phaser.Math.Between(this.armor.min, this.armor.max);
    }

    turn() {

    }

    refresh() {
        this.mp = this.refreshRates.mp;
        this.ap = this.refreshRates.ap;

        if(this.refreshRates.hp > 0 && this.hp <= this.maxHP) {
            this.hp += this.refreshRates;
        }
    }

    over() {
        let isOver = this.mp == 0 && this.ap == 0 && !this.moving;

        if (isOver && this.UItext) {
            this.UItext.setColor('#cfc6b8');
        } else {
            this.UItext.setColor('#fff');
        }

        return isOver;
    }

    createUI(config) {
        let scene = config.scene;
        let x = config.x;
        let y = config.y;

        this.UIsprite = scene.add.sprite(x, y, 'tiles', this.tile)
            .setOrigin(0).setInteractive({ useHandCursor: true });

        if (this.tint) {
            this.UIsprite.tint = this.tint;
        }

        this.UIsprite.on('pointerup', pointer => {
            if (pointer.leftButtonReleased()) {
                dungeon.describeEntity(this);
            }
        })

        this.UItext = scene.add.text(x + 20, y, this.name, {
                font: '12px Arial',
                fill: '#cfc6b8',
            }).setInteractive({useHandCursor: true});

        this.UItext.on('pointerup', pointer => {
            if (pointer.leftButtonReleased()) {
                dungeon.describeEntity(this);
            }
        })

        return 30;
    }
}

export default BasicEnemy;