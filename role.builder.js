var room_wrapper = require('room_wrapper');

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
        return false;
    },
    repair: function (creep) {
        var repairable = room_wrapper.get_repairable_structures(creep.room);
        for (var i = 0; i < repairable.length; ++i) {
            var structure = repairable[i]
            if (structure.hits < structure.hitsMax) {
                var work = creep.repair(structure);
                if (work == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure.pos.x, structure.pos.y);
                }
                return true;
            }
        }
        return false;
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
            provider = room_wrapper.get_energy_provider(creep.room);
            if (provider === undefined) {
                creep.memory['role'] = 'harvester';
                return;
            }
            get_energy = creep.withdraw(provider, RESOURCE_ENERGY);
            if (get_energy == ERR_NOT_IN_RANGE) {
                creep.moveTo(provider.pos.x, provider.pos.y);
            }
        }
        if (strategy.repair(creep)) return;
        if (strategy.build(creep)) return;
        strategy.upgrade(creep);
    }
}