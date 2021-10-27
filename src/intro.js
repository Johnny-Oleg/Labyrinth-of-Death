import dungeon from './dungeon.js';
import classes from './classes.js';

const intro = {
    key: 'intro-scene',
    active: true,
    preload: function () {

    },

    create: function () {
        const x = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const y = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        let classNames = Object.keys(classes);

        this.add.text(x, y - 100, 'Labyrinth of Death', {
            font: '115px "Doomed"',
            color: '#cfc6b8',
        }).setOrigin(0.5);

        this.add.text(x, y - 30, '死の迷宮', {
            font: '58px "Doomed"',
            color: '#cfc6b8',
        }).setOrigin(0.5);

        this.add.text(x, y + 50, 'Choose your hero', {
            font: '28px "Doomed"',
            color: '#cfc6b8',
        }).setOrigin(0.5);

        for (let h = 0; h < classNames.length; h++) {
            let inc = 50 * h;
            
            this.add.text(x, y + 80 + inc, `${h + 1} - ${classNames[h]}`, {
                font: '24px "Doomed"',
                color: '#cfc6b8',
            }).setOrigin(0.5);
        }

        this.input.keyboard.on('keyup', e => {
            let classNames = Object.keys(classes);
            let key = e.key;

            if (!isNaN(Number(key))) {
                let hero = classNames[key - 1];

                if (hero) {
                    dungeon.hero = hero;

                    this.scene.stop();
                    this.scene.run('ui-scene');
                    this.scene.run('world-scene');
                }
            }
        })
    },

    update: function () {

    }
}

export default intro;