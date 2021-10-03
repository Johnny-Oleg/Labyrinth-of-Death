import dungeon from './dungeon.js';

const rn = Math.floor(Math.random() * 5);

class PlayerCharacter {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.name = 'The Player';
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

        if (this.hp <= 5) {
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
        return this.mp == 0 && !this.moving;
    }

    onDestroy() {
        alert("You died...");
        location.reload();
    }
}

export default PlayerCharacter;