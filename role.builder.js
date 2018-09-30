var strategy = {
    build: function (creep) {
        var construction_sites = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
        for (var i = 0; i < construction_sites.length; ++i) {
            var site = construction_sites[i]
            var work = creep.build(site);
            if (work == ERR_NOT_IN_RANGE) {
                creep.moveTo(site.pos.x, site.pos.y);
            }
            return true;
        }
    },
    repair: function (creep) {
        var structures = creep.room.find(FIND_MY_STRUCTURES);
        for (var i = 0; i < structures.length; ++i) {
            var structure = structures[i]
            if (structure.hits < structure.hitsMax) {
                var work = creep.repair(structure);
                if (work == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure.pos.x, structure.pos.y);
                }
            }
            return true;
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
        if (strategy.build(creep)) return;
        if (strategy.repair(creep)) return;
        strategy.upgrade(creep);
    }
}