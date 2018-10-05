var spawns = require('structure.spawn');

var extensions = require('structure.extension');

var containers = require('structure.container');

var roads = require('structure.road');

var towers = require('structure.tower');

var storages = require('structure.storage');

module.exports = {
  energy_storages: [spawns, towers, extensions, storages],
  energy_providers: [containers, storages],
  get_energy_storages: function (room) {
    var result = [];

    for (var i = 0; i < this.energy_storages.length; ++i) {
      var structs = this.energy_storages[i].get(room);

      for (var j = 0; j < structs.length; ++j) {
        result.push(structs[j]);
      }
    }

    return result;
  },
  get_energy_providers: function (room) {
    var result = [];

    for (var i = 0; i < this.energy_providers.length; ++i) {
      var structs = this.energy_providers[i].get(room);

      for (var j = 0; j < structs.length; ++j) {
        if (structs[j].store[RESOURCE_ENERGY] > 150) {
          result.push(structs[j]);
        }
      }
    }

    if (result.length > 0) return result;
    return room.find(FIND_SOURCES_ACTIVE);
  },
  get_closest_energy_provider: function (room, pos) {
    var provs = this.get_energy_providers(room);
    var minRange = 99999;
    var result = undefined;

    for (var i = 0; i < provs.length; ++i) {
      var range = pos.getRangeTo(provs[i].pos);

      if (range < minRange) {
        result = provs[i];
        minRange = range;
      }
    }

    return result;
  },
  get_repairable_structures: function (room) {
    var result = room.find(FIND_MY_STRUCTURES);
    var added = containers.get(room);

    for (var i = 0; i < added.length; ++i) {
      result.push(added[i]);
    }

    added = roads.get(room);

    for (var i = 0; i < added.length; ++i) {
      result.push(added[i]);
    }

    return result;
  }
};