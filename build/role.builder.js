var repairer_role = require('role.repairer');
var energy_behavior = require('behavior.get_energy');
var room_travel = require('behavior.room_travel');

var strategy = {
    build: function (creep) {
        var construction_sites = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
        for (var i = 0; i < construction_sites.length; ++i) {
            var site = construction_sites[i]
            var work = creep.build(site);
            if (work == ERR_NOT_IN_RANGE) {
                creep.moveTo(site);
            } else if (work == ERR_NOT_ENOUGH_ENERGY) {
                energy_behavior.refill(creep);
            }
            return true;
        }
        return false;
    }
}

module.exports = {
    perform: function (creep) {
        if (energy_behavior.perform(creep)) return;
        if (room_travel.perform(creep)) return;

        var busy = strategy.build(creep);
        if (!busy) {
            repairer_role.perform(creep);
        }
    }
}