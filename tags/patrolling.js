import dungeon from '../dungeon.js';

const patrolling = {
    name: 'Patrolling',
    initialize: function() {
        if (this.type === 'enemy') {
            this.tint = 0xdd00cd;

            if (this.sprite) { 
                this.sprite.tint = this.tin; 
                this.sprite.tintFill = true;
            }

            this._initialX = this.x;
            this._initialY = this.y;

            let randomCoords = dungeon.randomWalkableTile();

            this._destinationX = randomCoords.x;
            this._destinationY = randomCoords.y;

            this._targetX = this._destinationX;
            this._targetY = this._destinationY;
        }
    },

    turn() {
        let oldX = this.x;
        let oldY = this.y;

        if (oldX == this._initialX && oldY == this._initialY) {
           this._targetX = this._destinationX; // arrived at destination, find new target
           this._targetY = this._destinationY;
        }

        if (oldX == this._destinationX && oldY == this._destinationY) {
            this._targetX = this._initialX;
            this._targetY = this._initialY;
        }

        console.log(`${this.name} patrolling to ${this._targetX},${this._targetY}`);

        let grid = new PF.Grid(dungeon.level);
        let finder = new PF.AStarFinder();
        let path = finder.findPath(oldX, oldY, this._targetX, this._targetY, grid);

        if (this.mp > 0) {
            if (path.length > 1) {
                dungeon.moveEntityTo(this, path[1][0], path[1][1]);
            }

            this.mp -= 1;
        }

        if (dungeon.distanceBetweenEntities(this, dungeon.player) <= 5) {
           this._targetX = dungeon.player.x; // if the player is near, go after them
           this._targetX = dungeon.player.y;
        }

        if (this.ap > 0) {                  // attack player if possible
            if (dungeon.distanceBetweenEntities(this, dungeon.player) <= 2) {
                dungeon.attackEntity(this, dungeon.player, this.weapon);
            }

            this.ap -= 1;
        }
    },

    refresh() {
        if (dungeon.distanceBetweenEntities(this, dungeon.player) <= 5) {
            dungeon.log(`${this.name} raaawwrr!!!`);
        }
    }
}

export default patrolling;