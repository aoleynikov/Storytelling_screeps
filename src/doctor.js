var NEARLY_DEAD = 300;

module.exports = {
    check: function () {
        for (var name in Game.creeps) {
            var creep = Game.creeps[name];
            var has_spawn_in_room = creep.room.find(FIND_MY_SPAWNS) != null;
            if (creep.memory['type'] == 'swarm') continue;
            if (creep.ticksToLive <= NEARLY_DEAD && creep.memory['role'] != 'maintenance') {
                creep.memory['old_role'] = creep.memory['role'];
                creep.memory['role'] = 'maintenance';
                if (creep.memory['work_place'] == undefined) {
                    creep.memory['work_place'] = creep.memory['target'];
                }
                if(!has_spawn_in_room) {
                    creep.memory['target'] = Game.spawns['Main'].room.name;
                }
            } else if (creep.ticksToLive >= CREEP_LIFE_TIME - 100 && creep.memory['role'] == 'maintenance') {
                creep.memory['role'] = creep.memory['old_role'];
                creep.memory['target'] = creep.memory['work_place'];
            }
        }
    }
}