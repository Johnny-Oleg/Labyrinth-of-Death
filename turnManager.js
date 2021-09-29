const turnManager = {
    entities: new Set(),
    // interval: 150,
    // lastCall: Date.now(),

    addEntity: (entity) => turnManager.entities.add(entity),
    removeEntity: (entity) => turnManager.entities.remove(entity),

    refresh: () => {
        turnManager.entities.forEach((entity) => entity.refresh());
        turnManager.currentIndex = 0;
    },
    currentIndex: 0,
    turn: () => {
        if (turnManager.entities.size > 0) {
            let entities = [...turnManager.entities];
            let entity = entities[turnManager.currentIndex];

            if (!entity.over()) {
                entity.turn();
            } else {
                turnManager.currentIndex++;
            }
        }
        // let now = Date.now();
        // let limit = turnManager.lastCall + turnManager.interval;

        // if (now > limit) {
        //     for (let entity of turnManager.entities) {
        //         if (!entity.over()) {
        //             entity.turn();

        //             break;
        //         }
        //     }

        //     turnManager.lastCall = Date.now();
        // }
    },
    over: () => [...turnManager.entities].every((entity) => entity.over()),
};

export default turnManager;