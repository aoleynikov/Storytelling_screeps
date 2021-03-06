var get_room_resource = require('behavior.get_room_resource');
var room_travel = require('behavior.room_travel');

module.exports = {
	perform: function (creep) {
		var resource = creep.memory['resource'] || RESOURCE_ENERGY;

		if (creep.carry[resource] == 0) {
			creep.memory['refill'] = true;
		}

		tombstones = creep.room.lookForAtArea(
			LOOK_TOMBSTONES,
			creep.pos.y - 1,
			creep.pos.x - 1,
			creep.pos.y + 1,
			creep.pos.x + 1,
			true)

		var room = undefined;
		if (creep.memory['refill']) {
			
			for (var stone of tombstones) {
				if (stone.tombstone && stone.tombstone.store[resource] > 0) {
					creep.withdraw(stone.tombstone, resource);
					if (creep.carry[resource] == creep.carryCapacity) {
						creep.memory['refill'] = false;
					}
					return true;
				}
			}
			
			room = creep.memory['energy_room'] || creep.room.name;
			creep.memory['target'] = room;
			if (room_travel.perform(creep)) return true;
			if (get_room_resource.perform(creep)) return true;
		}
		room = creep.memory['work_place'] || creep.room.name;
		creep.memory['target'] = room;
		if (room_travel.perform(creep)) return true;
		return false;
	},
	refill: (creep) => {
		creep.memory['target'] = creep.memory['energy_room']
		creep.memory['refill'] = true
	}
}