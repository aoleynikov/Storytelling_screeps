var energy_behavior = require('behavior.get_resource');
var room_travel = require('behavior.room_travel');
var upgrader = require('role.upgrader')

var select_storage = function (creep) {
  var result = creep.pos.findClosestByRange(FIND_STRUCTURES, {
    filter: function (s) {
      return s.energy < s.energyCapacity &&
        (s.structureType == STRUCTURE_SPAWN ||
          s.structureType == STRUCTURE_EXTENSION);
    }
  });
  if (result) return result;

  var towers = creep.pos.findClosestByRange(FIND_STRUCTURES, {
    filter: function (s) {
      return s.energy < s.energyCapacity * 0.8 &&
        (s.structureType == STRUCTURE_TOWER);
    }
  });

  return towers;
};

var store = function (creep) {
  var any_storage = creep.pos.findClosestByRange(FIND_STRUCTURES, {
    filter: function (s) {
      return (s.structureType == STRUCTURE_SPAWN ||
        s.structureType == STRUCTURE_EXTENSION ||
        s.structureType == STRUCTURE_TOWER);
    }
  });
  if (!any_storage) {
    creep.memory['role'] = 'builder'
    creep.memory['type'] = 'swarm'
    return
  }

  var storage = select_storage(creep);
  if (!storage) {
    if (creep.carry[RESOURCE_ENERGY] == 0) {
      energy_behavior.refill(creep);
    } else {
      upgrader.perform(creep)
    }
  }
  var work = creep.transfer(storage, RESOURCE_ENERGY);
  if (work == ERR_NOT_IN_RANGE) {
    creep.moveTo(storage, {
      visualizePathStyle: {
        fill: 'transparent',
        stroke: '#ff0',
        lineStyle: 'dashed',
        strokeWidth: .15,
        opacity: .1
      }
    });
  } else if (work == ERR_NOT_ENOUGH_ENERGY) {
    energy_behavior.refill(creep);
  }
};

module.exports = {
  perform: function (creep) {
    if (room_travel.perform(creep)) return;
    if (energy_behavior.perform(creep)) return;
    store(creep);
    if (creep.ticksToLive == 500 && Math.random() > 0.95) {
      creep.suicide()
    }
  }
}