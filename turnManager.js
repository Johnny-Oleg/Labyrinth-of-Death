const tm = {                // <- turn manager
    entities: new Set(),

    addEntity: entity => tm.entities.add(entity),
    removeEntity: entity => tm.entities.remove(entity),

    refresh: () => {
        tm.entities.forEach(entity => entity.refresh());
        tm.currentIndex = 0;
    },
    currentIndex: 0,
    turn: () => {
        if (tm.entities.size > 0) {
            let entities = [...tm.entities];
            let entity = entities[tm.currentIndex];

            if (!entity.over()) {
                entity.turn();
            } else {
                tm.currentIndex++;
            }
        }
    },
    over: () => [...tm.entities].every(entity => entity.over()),
    cleanup: () => {
        tm.entities.forEach(entity => {
            if (entity.sprite) {
                entity.sprite.destroy();
            }
            
            if (entity.UIsprite) {
                entity.UIsprite.destroy();
            }
        })

        tm.removeAllEntities();
    }
};

export default tm;