import dungeon from './dungeon.js';

class BasicMonster {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.tile = 26;
        this.movementPoints = 1;

        dungeon.initializeEntity(this);
    }

    refresh() {
        this.movementPoints = 1;
    }

    over() {
        return this.movementPoints == 0 && !this.moving;
    }
}

colored.png;

export default BasicMonster;