class DNode {
    constructor(area) {     // dungeon node
        this.left = false;
        this.right = false;
        this.area = area;
    }

    forEachArea(f) {        // a way to iterate over those areas, walk the nodes on this tree
        f(this.area);

        if (this.left) {
            this.left.forEachArea(f);
        }

        if (this.right) {
            this.right.forEachArea(f);
        }
    }
}

class DArea {               // dungeon area: each DNode will contain a DArea
    constructor(x, y, w, h) {     
        this.x = x;         // area needs to keep track of its position (its x and y coordinates)
        this.y = y;         // and its dimensions (its height and width values)

        this.w = w;         // width
        this.h = h;         // height
    }
}

function splitArea(area) {
    let x1, y1, w1, h1 = 0; // x1, y1, w1, and h1 represent one area
    let x2, y2, w2, h2 = 0; // and the x2, y2, w2, and h2 the other area

    if (Phaser.Math.Between(0, 1) === 0) {  // vertical
        let divider = Phaser.Math.Between(1, area.w);

        x1 = area.x;
        y1 = area.y;
        w1 = divider;
        h1 = area.h;

        x2 = area.x + w1;
        y2 = area.y;     // if the ratio is less than 0.45, then the areas are discarded
        w2 = area.w - w1;// values between 0.45 and 1.05 appear to yield nice dungeons
        h2 = area.h;     // below that or above that leads to confusing stuff that is sometimes unusable

        if (w1 / h1 < 0.45 || w2 / h2 < 0.45) {
            return splitArea(area); 
        } 
    } else {    // horizontal
        let divider = Phaser.Math.Between(1, area.h); 

        x1 = area.x;
        y1 = area.y;
        w1 = area.w;
        h1 = divider;

        x2 = area.x;
        y2 = area.y + h1;
        w2 = area.w;
        h2 = area.h - h1;

        if (h1 / w1 < 0.45 || h2 / w2 < 0.45) {
            return splitArea(area);
        }
    }    

    let a1 = new DArea(x1, y1, w1, h1);
    let a2 = new DArea(x2, y2, w2, h2);

    return [a1, a2]; // cherry-pick those values and assign them to the correct place in the tree
}

function makeTree(area, iterations) { // splits the given area, places each side of the 
    let root = new DNode(area);       // split into the left and right children of the node

    if (!iterations !== 0) {
        let [a1, a2] = splitArea(root.area);

        root.left = makeTree(a1, iterations - 1);
        root.right = makeTree(a2, iterations - 1);
    }
}

export default class BSPDungeon {
    constructor(width, height, iterations) {
        this.rootArea = new DArea(0, 0, width, height);
        this.tree = makeTree(this.rootArea, iterations);

        this.initializeLevelData();
    }

    initializeLevelData() {     // makes sure we have a valid level data array 
        let lvl = [];           // with enough cells to host our dungeon map

        for (let y = 0; y <= this.rootArea.h; y++) {
            lvl[y] = lvl[y] || [];

            for (let x = 0; x <= this.rootArea.w; x++) {
                lvl[y][x] = 0; // empty
            }
        }

        this.levelData = lvl;
    }

    toLevelData() {
        return this.levelData;
    }
}