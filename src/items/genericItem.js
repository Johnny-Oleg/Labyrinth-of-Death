import Taggable from '../taggable.js';

class GenericItem extends Taggable {
    constructor(x, y) {
        super(x, y);
        
        this.name = 'Nameless Item';
        this.type = 'item';
        this.weapon = false;
        this.shield = false;
        this.armor = false;
        this.active = false;
        this.description = 'Some description';

        if (x && y) {
            this.x = x;
            this.y = y;
        }
    }

    setEvents() {
    
    }

    damage() {
        return 0;
    }

    range() {
        return 0;
    }

    defence() {
        return 0;
    }

    turn() {

    }

    equip() {

    }

    unequip() {

    }

    refresh() {
        
    }

    over() {
        return true;
    }

    createUI() {
        return 0;
    }
}

export default GenericItem;