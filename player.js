import dungeon from './dungeon.js';
import Sword from './items/sword.js';

const rn = Math.floor(Math.random() * 5);

class PlayerCharacter {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.name = 'Player';
        this.tile = 29; // sprite tile number for main character (28 with a sword | 29 -- spear)
        this.hp = 15; // health points
        this.ap = 1; // action points
        this.mp = 1; // movement points
        this.moving = false;
        this.items = []; // array of items for player
        this.items.push(new Sword()); // starting weapon
        this.toggleItem(0);
        this.cursors = dungeon.scene.input.keyboard.createCursorKeys();

        dungeon.initializeEntity(this);

        dungeon.scene.input.keyboard.on('keyup', e => {
            let key = e.key;

            if (!isNaN(Number(key))) {
                key == 0 && (key = 10);

                this.toggleItem(key - 1);
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

    attack() {
        const items = this.equippedItems();

        const combineDamage = (total, item) => total + item.damage();
        const damage = items.reduce(combineDamage, 1);

        return damage; // random number for dealing damage
    }

    refresh() {
        this.hp < 6 && this.hp++;     // health regen by 1
        this.mp = 1;
        this.ap = 1;
    }

    turn() {
        let oldX = this.x;
        let oldY = this.y;
        let newX = this.x;
        let newY = this.y;
        let moved = false;

        if (this.mp > 0) {
            if (this.cursors.left.isDown) {
                newX -= 1;
                moved = true;
            }

            if (this.cursors.right.isDown) {
                newX += 1;
                moved = true;
            }

            if (this.cursors.up.isDown) {
                newY -= 1;
                moved = true;
            }

            if (this.cursors.down.isDown) {
                newY += 1;
                moved = true;
            }

            if (moved) {
                this.mp -= 1;

                if (!dungeon.isWalkableTile(newX, newY)) {
                    let entity = dungeon.entityAtTile(newX, newY);

                    if (entity && entity.type === 'enemy' && this.ap > 0) {
                        dungeon.attackEntity(this, entity); // attacking if enemy is found

                        this.ap -= 1;
                    }

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

                if (newX !== oldX || newY !== oldY) { // moving to...
                    dungeon.moveEntityTo(this, newX, newY);
                }
            }

            if (this.hp > 6) {
                this.sprite.tint = Phaser.Display.Color.GetColor(255, 255, 255);
            }

            if (this.hp <= 6) { 
                this.sprite.tint = Phaser.Display.Color.GetColor(255, 200, 0);
            }
            
            if (this.hp <= 3) {
                this.sprite.tint = Phaser.Display.Color.GetColor(255, 0, 0);
            } 
        }

        this.refreshUI(); // update item display
    }

    over() {
        let isOver = this.mp == 0 && !this.moving;

        if (isOver && this.UIheader) {
            this.UIheader.setColor('#cfc6b8');
        } else {
            this.UIheader.setColor('#fff');
        }

        if (this.UIstatsText) {
            this.UIstatsText.setText(
                `Hp: ${this.hp}\nMp: ${this.mp}\nAp: ${this.ap}`
            );
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
            }

            if (!item.active) {
                item.UIsprite.setAlpha(0.5);
                this.UIitems[i].setStrokeStyle();
            } else {
                item.UIsprite.setAlpha(1);
                this.UIitems[i].setStrokeStyle(1, 0xffffff);
            }
        }
    }
}

export default PlayerCharacter;