import dungeon from '../dungeon.js';
import Taggable from '../taggable.js';

const rn = Math.floor(Math.random() * 5);

class BasicHero extends Taggable {
    constructor(x, y) {
        super(x, y);
        
        this.x = x;
        this.y = y;
        this.name = 'Hero';
        this.type = 'character';
        this.tile = 30;          // sprite tile number for main character (28 sword | 29 spear)
        this.hp = 15;            // health points
        this.ap = 1;             // action points
        this.mp = 1;             // movement points
        this.moving = false;
        this.items = [];         // array of items for player

        dungeon.scene.input.keyboard.on('keyup', e => {
            if (!this.over()) {
                this.processInput(e);
            }
        })

        dungeon.scene.input.on('pointerup', e => {
            if (!this.over()) {
                this.processTouchInput(e);
            }
        })
    }

    toggleItem(itemNumber) {
        const item = this.items[itemNumber];

        if (item) {
            if (item.weapon) {
                this.items.forEach(item => {
                    item.active = item.weapon ? false : item.active;
                })
            }

            item.active = !item.active;

            if (item.active) {
                dungeon.log(`${this.name} equips ${item.name}: ${item.description}`);

                item.equip(itemNumber);
            }

            if (item.class === 'sword') { // change player sprite regardless of weapon
                this.tile = 28;
            }

            if (item.class === 'spear') { // change player sprite regardless of weapon
                this.tile = 29;
            }
        }
    }

    removeItem(itemNumber) {
        const item = this.items[itemNumber];

        if (item) {
            this.items.forEach(item => {
                item.UIsprite.destroy();

                delete item.UIsprite;
            })

            this.items = this.items.filter(i => i !== item);

            this.refreshUI();
        }
    }

    removeItemByProperty(prop, value) {
        this.items.forEach(item => {
            item.UIsprite.destroy();

            delete item.UIsprite;
        })

        this.items = this.items.filter(item => item[prop] !== value);

        this.refreshUI();
    }

    equippedItems() {
        return this.items.filter(item => item.active);
    }

    currentWeapon() {
        const items = this.equippedItems();
        const weapon = items.find(w => w.weapon);

        return weapon;
    }

    attack() {
        const items = this.equippedItems();

        const combineDamage = (total, item) => total + item.damage();
        const damage = items.reduce(combineDamage, 1);

        return damage;               // random number for dealing damage
    }

    defence() {
        const items = this.equippedItems()
        const combineDefence = (total, item) => total + item.defence?.(); // ??! err?

        const defence = items.reduce(combineDefence, 0);

        return defence;
    }


    turn() {
        if (this.hp > 6) {
            this.sprite.tint = Phaser.Display.Color.GetColor(255, 255, 255);
        }

        if (this.hp <= 6) { 
            this.sprite.tint = Phaser.Display.Color.GetColor(255, 200, 0);
        }
        
        if (this.hp <= 3) {
            this.sprite.tint = Phaser.Display.Color.GetColor(255, 0, 0);
        } 

        this.refreshUI();                // update item display
    }

    refresh() {
        // this.hp < 6 && this.hp++;     // health regen by 1
        this.mp = 1;
        this.ap = 1;
    }

    processTouchInput(e) {
        let x = dungeon.map.worldToTileX(e.worldX);
        let y = dungeon.map.worldToTileY(e.worldY);

        let entity = dungeon.entityAtTile(x, y);

        if (entity && entity.type == 'enemy' && this.ap > 0) {
            const currentWeapon = this.currentWeapon();

            const rangedAttack = currentWeapon.range() > 0 ?
                currentWeapon.attackTile || currentWeapon.tile : false;

            const tint = currentWeapon.tint || false;       // color for ranged
            const distance = dungeon.distanceBetweenEntities(this, entity);

            if (rangedAttack && distance <= currentWeapon.range()) {
                dungeon.attackEntity(this, entity, rangedAttack, tint);

                this.ap -= 1;
            }
        }
    }

    processInput(e) {
        let oldX = this.x;
        let oldY = this.y;
        let newX = this.x;
        let newY = this.y;
        let moved = false;
        let key = e.key;

        if (!isNaN(Number(key))) {       // equip items
           key == 0 && (key = 10);

            this.toggleItem(key - 1);
        }

        if (e.keyCode == 32) {          // pass the turn press spacebar
            this.mp = 0;
            this.ap = 0;
        }
        
        if (e.key == 'ArrowLeft') {
            newX -= 1;
            moved = true;
        }

        if (e.key == 'ArrowRight') {
            newX += 1;
            moved = true;
        }

        if (e.key == 'ArrowUp') {
            newY -= 1;
            moved = true;
        }

        if (e.key == 'ArrowDown') {
            newY += 1;
            moved = true;
        }

        if (moved) {               // execute movement
            this.mp -= 1;

            if (!dungeon.isWalkableTile(newX, newY)) { // check if entity at destination is an enemy
                let entity = dungeon.entityAtTile(newX, newY);

                if (entity && entity.type === 'enemy' && this.ap > 0) {
                    const currentWeapon = this.currentWeapon();

                    const rangedAttack = currentWeapon.range?.() > 0 ? //?! err !
                        currentWeapon.attackTile || currentWeapon.tile : false;

                    const tint = currentWeapon.tint || false;       // color for ranged

                    dungeon.attackEntity(this, entity, rangedAttack, tint); // attacking if enemy is found

                    this.mp += 1;
                    this.ap -= 1;
                }
                                                        // check if entity at destination is an item
                if (entity && entity.type === 'item' && this.ap > 0) {
                    this.items.push(entity);  // picking items

                    dungeon.itemPicked(entity);
                    dungeon.log(`${this.name} picked ${entity.name}: ${entity.description}`);

                    this.ap -= 1;
            } else {
                    newX = oldX;
                    newY = oldY;
                }
            }

            if (newX !== oldX || newY !== oldY) {           // moving to...
                dungeon.moveEntityTo(this, newX, newY);
            }
        }
    }

    over() {
        let isOver = this.mp <= 0 && !this.moving;

        if (isOver && this.UIheader) {
            this.UIheader.setColor('#cfc6b8');

            this.ap = 0;
        } else {
            this.UIheader.setColor('#fff');
        }

        return isOver;
    }

    onDestroy() {
        alert("You died...");
        
        location.reload();
    }

    createUI(config) {
        this.UIscene = config.scene;
        let x = config.x;
        let y = config.y;
        let ah = 0; // accumulated height

        // character sprite and name
        this.UIsprite = this.UIscene.add.sprite(x, y, 'tiles', this.tile).setOrigin(0);
        this.UIheader = this.UIscene.add.text(x + 20, y, this.name, {
            font: '16px Arial',
            color: '#cfc6b8',
        });

        // character stats
        this.UIstatsText = this.UIscene.add.text(
            x + 20,
            y + 20,
            `Hp: ${this.hp}\nMp: ${this.mp}\nAp: ${this.ap}`, {
                font: '12px Arial',
                fill: '#cfc6b8',
            }
        );

        ah += this.UIstatsText.height + this.UIsprite.height;

        let itemsPerRow = 5; // inventory screen
        let rows = 2;
        this.UIitems = [];

        for (let row = 1; row <= rows; row++) {
            for (let cell = 1; cell <= itemsPerRow; cell++) {
                let rx = x + 25 * cell;
                let ry = y + 50 + 25 * row;

                this.UIitems.push(this.UIscene.add
                    .rectangle(rx, ry, 20, 20, 0xcfc6b8, 0.3)
                    .setOrigin(0)
                )
            }
        }

        ah += 90;

        this.UIscene.add.line(x + 5, y + 120, 0, 10, 175, 10, 0xcfc6b8).setOrigin(0);  // separator

        return ah;
    }

    refreshUI() {
        for (let i = 0; i < this.items.length; i++) {
            let item = this.items[i];

            if (!item.UIsprite) {
                let x = this.UIitems[i].x + 10;
                let y = this.UIitems[i].y + 10;

                item.UIsprite = this.UIscene.add.sprite(x, y, 'tiles', item.tile);

                if (item.tint) {                        // check if sprite has a color prop
                    item.UIsprite.tint = item.tint;
                    item.UIsprite.tintFill = true;
                }
            }

            if (!item.active) {
                item.UIsprite.setAlpha(0.5);
                this.UIitems[i].setStrokeStyle();
            } else {
                item.UIsprite.setAlpha(1);
                this.UIitems[i].setStrokeStyle(1, 0xffffff);
            }

            if (this.UIstatsText) {
                this.UIstatsText.setText(
                    `Hp: ${this.hp}\nMp: ${this.mp}\nAp: ${this.ap}`
                )
            }
        }
    }
}

export default BasicHero;