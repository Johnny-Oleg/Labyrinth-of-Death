import dungeon from './dungeon.js';

const rn = Math.floor(Math.random() * 5);

class PlayerCharacter {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.name = 'Player';
        this.tile = 29; // sprite tile number for main character
        this.hp = 15; // health points
        this.ap = 1; // action points
        this.mp = 1; // movement points
        this.moving = false;
        this.cursors = dungeon.scene.input.keyboard.createCursorKeys();

        dungeon.initializeEntity(this);
    }

    refresh() {
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
                    let enemy = dungeon.entityAtTile(newX, newY);

                    if (enemy && this.ap > 0) {
                        dungeon.attackEntity(this, enemy);

                        this.ap -= 1;
                    }

                    newX = oldX;
                    newY = oldY;
                }

                if (newX !== oldX || newY !== oldY) {
                    dungeon.moveEntityTo(this, newX, newY);
                }
            }
        }

        if (this.hp <= 6) {
            this.sprite.tint = Phaser.Display.Color.GetColor(255, 200, 0);
        }

        if (this.hp <= 3) {
            this.sprite.tint = Phaser.Display.Color.GetColor(255, 0, 0);
        }
    }

    attack() {
        return rn; // random number for dealing damage
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
        let scene = config.scene;
        let x = config.x;
        let y = config.y;
        let ah = 0; // accumulated height

        // character sprite and name
        this.UIsprite = scene.add.sprite(x, y, 'tiles', this.tile).setOrigin(0);
        this.UIheader = scene.add.text(x + 20, y, this.name, {
            font: '16px Arial',
            color: '#cfc6b8',
        });

        // character stats
        this.UIstatsText = scene.add.text(
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

                this.UIitems.push(scene.add
                    .rectangle(rx, ry, 20, 20, 0xcfc6b8, 0.3)
                    .setOrigin(0)
                )
            }
        }

        ah += 90;

        scene.add.line(x+5, y+120, 0, 10, 175, 10, 0xcfc6b8).setOrigin(0);  // separator

        return ah;
    }
}

export default PlayerCharacter;