/* 
WARNING! If price of supporting the swarm per 300 ticks is more than energy 
income available to nannies, the swarm doesn't function as intended.

If you have a storage, it provides an easy way to monitor the economy balance.
For RCL <= 3, don't get greedy.
*/
var containers = require('structure.container');

var miners_count = room_name => {
  var room = Game.rooms[room_name];
  if (!room) return 0;
  var cnt = 0;
  var conts = containers.get(room);
  for(var cont of conts) {
    if (cont.store[RESOURCE_ENERGY] != cont.storeCapacity) { 
      ++cnt;
    }
  }
  return cnt;
};

var haulers_count = (room_name, per_hauler) => {
  var room = Game.rooms[room_name];
  if (!room) return 0;
  var total_cont_energy = 0;
  var conts = containers.get(room);
  for(var cont of conts) {
    total_cont_energy += cont.store[RESOURCE_ENERGY];
  }
  return total_cont_energy / per_hauler;
};

var builders_count = () => {
  return Game.constructionSites === {} ? 0 : 4;
}

module.exports = {
  rooms: ["W18S25", "W18S24", "W19S24", "W19S25"],
  templates: [{
    count: miners_count('W18S25'),
    name_prefix: "miner_W18S25_",
    body: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE],
    memory: {
      role: "miner",
      type: "swarm"
    }
  }, {
    count: builders_count(),
    name_prefix: "builder_",
    body: [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],
    memory: {
      role: "builder",
      type: "swarm"
    }
  }, {
    count: 5,
    name_prefix: "upgrader_W18S25_",
    body: [WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
    memory: {
      role: "upgrader",
      type: "swarm",
      work_place: 'W18S25',
      target: 'W18S25'
    }
  },
  {
    count: 2,
    name_prefix: "upgrader_W19S25_",
    body: [WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
    memory: {
      role: "upgrader",
      type: "swarm",
      work_place: 'W19S25',
      target: 'W19S25'
    }
  }, {
    count: 3,
    name_prefix: "repairer_W18S25_",
    body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
    memory: {
      role: "repairer",
      type: "swarm",
      work_place: "W18S25"
    }
  }, {
    count: miners_count('W18S24'),
    name_prefix: "miner_W18S24_",
    body: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE],
    memory: {
      role: "miner",
      target: "W18S24",
      type: "swarm"
    }
  }, {
    count: 1,
    name_prefix: "claimer_W18S24_",
    body: [CLAIM, CLAIM, MOVE, MOVE],
    memory: {
      role: "claimer",
      target: "W18S24",
      type: "swarm"
    }
  }, {
    count: 3,
    name_prefix: "repairer_W18S24_",
    body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
    memory: {
      role: "repairer",
      type: "swarm",
      work_place: "W18S24"
    }
  }, {
    count: haulers_count('W18S24', 800),
    name_prefix: 'hauler_W18N24_',
    body: [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE],
    memory: {
      role: 'hauler',
      type: 'swarm',
      work_place: 'W18S25',
      energy_room: 'W18S24',
      link_id: '5bd9c6fffd47502f5f46418c'
    }
  }, {
    count: 2,
    name_prefix: "repairer_W19S24_",
    body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
    memory: {
      role: "repairer",
      type: "swarm",
      work_place: "W19S24"
    }
  }, {
    count: miners_count('W19S24'),
    name_prefix: 'miner_W19S24_',
    body: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE],
    memory: {
      role: 'miner',
      type: 'swarm',
      target: 'W19S24'
    }
  }, {
    count: haulers_count('W19S24', 600),
    name_prefix: 'hauler_W19S24_',
    body: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
    memory: {
      role: 'hauler',
      type: 'swarm',
      work_place: 'W18S25',
      energy_room: 'W19S24',
      link_id: '5bd9c6fffd47502f5f46418c'
    }
  }, {
    count: 1,
    name_prefix: 'claimer_W19S24_',
    body: [CLAIM, CLAIM, MOVE, MOVE],
    memory: {
      role: 'claimer',
      type: 'swarm',
      work_place: 'W19S24',
      target: 'W19S24'
    }
  }, {
    count: 2,
    name_prefix: "repairer_W19S25_",
    body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
    memory: {
      role: "repairer",
      type: "swarm",
      work_place: "W19S25"
    }
  }, {
    count: miners_count('W19S25'),
    name_prefix: 'miner_W19S25_',
    body: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE],
    memory: {
      role: 'miner',
      type: 'swarm',
      target: 'W19S25'
    }
  }, {
    count: 2,
    name_prefix: "repairer_W18S23_",
    body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
    memory: {
      role: "repairer",
      type: "swarm",
      work_place: "W18S23"
    }
  }, {
    count: miners_count('W18S23'),
    name_prefix: 'miner_W18S23_',
    body: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE],
    memory: {
      role: 'miner',
      type: 'swarm',
      target: 'W18S23'
    }
  }, 
  {
    count: 1,
    name_prefix: 'claimer_W18S23_',
    body: [CLAIM, CLAIM, MOVE, MOVE],
    memory: {
      role: 'claimer',
      type: 'swarm',
      work_place: 'W18S23',
      target: 'W18S23'
    }
  },{
    count: haulers_count('W18S23', 600),
    name_prefix: 'hauler_W18S23_',
    body: [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE],
    memory: {
      role: 'hauler',
      type: 'swarm',
      work_place: 'W18S25',
      energy_room: 'W18S23',
      link_id: '5bd9c6fffd47502f5f46418c'
    }
  }, {
    count: 3,
    name_prefix: 'warrior_',
    body: [TOUGH, TOUGH, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK],
    memory: {
      role: 'warrior',
      squad: 'Rax',
      type: "swarm",
    }
  }, {
    count: 1,
    name_prefix: 'healer_',
    body: [MOVE, MOVE, HEAL, HEAL],
    memory: {
      role: 'healer',
      squad: 'Rax',
      type: "swarm",
    }
  }, {
    count: 3,
    name_prefix: 'warrior_Phobos_',
    body: [TOUGH, TOUGH, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK],
    memory: {
      role: 'warrior',
      squad: 'Phobos',
      type: "swarm",
    }
  }, {
    count: 1,
    name_prefix: 'healer_Phobos_',
    body: [MOVE, MOVE, HEAL, HEAL],
    memory: {
      role: 'healer',
      squad: 'Phobos',
      type: "swarm",
    }
  }, {
    count: 3,
    name_prefix: 'warrior_Deimos_',
    body: [TOUGH, TOUGH, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK],
    memory: {
      role: 'warrior',
      squad: 'Deimos',
      type: "swarm",
    }
  }, {
    count: 1,
    name_prefix: 'healer_Deimos_',
    body: [MOVE, MOVE, HEAL, HEAL],
    memory: {
      role: 'healer',
      squad: 'Deimos',
      type: "swarm",
    }
  }, 
  {
    count: 3,
    name_prefix: 'sniper_',
    body: [TOUGH, TOUGH, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE],
    memory: {
      role: 'sniper',
      squad: 'snipers_test',
      type: 'swarm'
    }
  },
  {
    count: 3,
    name_prefix: 'scout_',
    body: [MOVE],
    memory: {
      role: 'scout',
      type: 'swarm'
    }
  }]
};