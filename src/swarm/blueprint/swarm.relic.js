let common = require('swarm.common')

const size = (core, room) => {
    return 1
}

const name_prefix = (core, room) => {
    return "relic_" + room + "_"
}

const count = (core, room) => {
    let target_room = Game.rooms[room]
    if (!target_room) return 0
    if (!target_room.controller) return 0
    if (!target_room.controller.owner) return 0
    return target_room.controller.owner.username == 'Veldrin' ? 1 : 0
}

const memory = (core, room) => {
    return {
        swarm: false,
        role: "upgrader",
        energy_room: room,
        workplace: core
    }
}

const body = (core, room) => {
    return [WORK, CARRY, MOVE]
}

module.exports = {
    name_prefix: name_prefix,
    size: size,
    count: count,
    memory: memory,
    body: body
}