const royal = {
    name: 'Royal',
    initialize: function() {
        if (this.type === 'enemy') {
            this.tint = 0xccbc00;
            this.refreshRates.hp += 1;
            this.refreshRates.mp += 2;
            this.refreshRates.ap += 2;

            if (this.sprite) {
                this.sprite.tint = this.tint;
                this.sprite.tintFill = true;
            }

            let title = Phaser.Utils.Array.GetRandom([
                'Count',
                'Duke',
                'Lord',
                'Duchess',
                'Baron',
                'Baroness',
                'Countess',
            ])
            
            let suffix = Phaser.Utils.Array.GetRandom([
                'ah',
                'oz',
                'von',
                'zits',
                'gres',
            ])
            
            this.name = `${title} ${this.name.slice(0, this.name.length - 2)}${suffix}`;
        }
    }
}

export default royal;