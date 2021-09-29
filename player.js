import dungeon from './dungeon.js';

class PlayerCharacter {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.tile = 29; // sprite tile number for main character
        this.hp = 10;
        this.movementPoints = 1;
        this.moving = false;
        this.cursors = dungeon.scene.input.keyboard.createCursorKeys();

        dungeon.initializeEntity(this);
    }

    refresh() {
        this.movementPoints = 1;
    }

    turn() {
        let newX = this.x;
        let newY = this.y;
        let moved = false;

        if (this.movementPoints > 0 && !this.moving) {
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
                this.movementPoints -= 1;

                if (dungeon.isWalkableTile(newX, newY)) {
                    dungeon.moveEntityTo(this, newX, newY);
                }
            }
        }

        if (this.hp <= 3) {
            this.sprite.tint = Phaser.Display.Color.GetColor(255, 0, 0);
        }
    }

    over() {
        return this.movementPoints == 0 && !this.moving;
    }
}

export default PlayerCharacter;