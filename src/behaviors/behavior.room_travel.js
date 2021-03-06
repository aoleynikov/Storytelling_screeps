var border_run = require('behavior.border_run');

module.exports = {
    perform: function (creep) {
        if (border_run.perform(creep)) return true;
        if (creep.memory['target'] === undefined) return false;
        if (creep.room.name != creep.memory['target']) {
            var route = Game.map.findRoute(creep.room.name, creep.memory['target'], {
                routeCallback(roomName, fromRoomName) {
                    return 1;
            }});
            if (!route[0]) return false
            var exit = creep.pos.findClosestByRange(route[0].exit);
            if (creep.pos.getRangeTo(exit) != 0) {
                creep.moveTo(exit, {reusePath: 50});
            } else {
                creep.memory['run'] = route[0].exit;
                creep.memory['run_cd'] = 2;
            }

            return true;
        }
        return false;
    }
}