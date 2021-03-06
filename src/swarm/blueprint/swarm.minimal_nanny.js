let common = require('swarm.common')


const size = (core, room) => {
    return 1
}

const name_prefix = (core, room) => {
    return 'minimal_nanny_' + room + '_'
}

const count = (core, room) => {
    return 1
}

const memory = (core, room) => {
    return {
        swarm: false,
        role: "nanny",
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