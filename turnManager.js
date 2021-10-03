const tm = { // turn manager
    entities: new Set(),
    // interval: 150,
    // lastCall: Date.now(),

    addEntity: (entity) => tm.entities.add(entity),
    removeEntity: (entity) => tm.entities.remove(entity),

    refresh: () => {
        tm.entities.forEach((entity) => entity.refresh());
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
    over: () => [...tm.entities].every((entity) => entity.over()),
};

export default tm;