var strategy = {
    build: function (creep) {
        var construction_sites = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
        for (var site in construction_sites) {
            console.log(site);
            var work = creep.build(site);
            console.log(work);
            if (work == ERR_NOT_IN_RANGE) {
                creep.moveTo(site.pos.x, site.pos.y);
            }
            return true;
        }
    },
    repair: function (creep) {
        var structures = creep.room.find(FIND_MY_STRUCTURES);
        for (var structure in structures) {
            if (structure.hits < structure.hitsMax) {
                var work = creep.repair(structure);
                if (work == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure.pos.x, structure.pos.y);
                }
            }
        }
    },
    upgrade: function (creep) {
        var controller = creep.room.controller;
        var work = creep.upgradeController(controller)
        if (work != 0) {
            creep.moveTo(controller.pos.x, controller.pos.y);
        }
    }
}

module.exports = {
    perform: function (creep) {
        if (creep.carry[RESOURCE_ENERGY] == 0) {
            creep.memory['role'] = 'harvester';
            return;
        }
        console.log('Building...')
        if (strategy.build(creep)) return;
        console.log('Repairing...')
        if (strategy.repair(creep)) return;
        console.log('Upgrading...')
        strategy.upgrade(creep);
    }
}