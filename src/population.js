/* 
WARNING! If price of supporting the swarm per 300 ticks is more than energy 
income available to nannies, the swarm doesn't function as intended.

If you have a storage, it provides an easy way to monitor the economy balance.
For RCL <= 3, don't get greedy.
*/

var templates = []

var colony = require('population.colony')
var metropolia = require('population.metropolia')
var common = require('population.common')
var wild = require('population.wild')

var spawns = {
  'Earth': [].concat.apply([], [
    metropolia('Earth', 'W37S11'),
    colony('ISS', 'W37S12', 'W37S11'),
    colony('Moon', 'W36S11', 'W37S11'),
    colony('Deimos', 'W35S11', 'W37S11'),
    wild('Vodka', 'W36S14', 'W36S13'),
    metropolia('Mars', 'W38S11'),
    colony('Phobos', 'W39S11', 'W38S11'),
    colony('Phoebe', 'W38S12', 'W38S11'),
    metropolia('Saturn', 'W36S13'),
    metropolia('Venus', 'W34S12'),
    metropolia('Jupiter', 'W39S13'),
    colony('Europa', 'W39S12', 'W39S13'),
    common()
  ]),
  'Mars': [].concat.apply([], [
    metropolia('Mars', 'W38S11'),
    colony('Phobos', 'W39S11', 'W38S11'),
    colony('Phoebe', 'W38S12', 'W38S11'),
    metropolia('Earth', 'W37S11'),
    metropolia('Venus', 'W34S12'),
    metropolia('Jupiter', 'W39S13'),
    colony('Europa', 'W39S12', 'W39S13'),
    colony('Enceladus', 'W38S14', 'W39S13'),
    common()
  ]),
  'Venus': [].concat.apply([], [
    metropolia('Venus', 'W34S12'),
    colony('Titan', 'W35S12', 'W34S12'),
    colony('Oberon', 'W35S13', 'W34S12'),
    metropolia('Saturn', 'W36S13'),
    colony('Himalia', 'W36S12', 'W36S13'),
    metropolia('Earth', 'W37S11'),
    metropolia('Mars', 'W38S11'),
    colony('Moon', 'W36S11', 'W37S11'),
    colony('Deimos', 'W35S11', 'W37S11'),
    common()
  ]),
  'Jupiter': [].concat.apply([], [
    metropolia('Jupiter', 'W39S13'),
    colony('Callisto', 'W39S14', 'W39S13'),
    colony('Europa', 'W39S12', 'W39S13'),
    colony('Enceladus', 'W38S14', 'W39S13'),
    metropolia('Earth', 'W37S11'),
    metropolia('Mars', 'W38S11'),
    colony('Phoebe', 'W38S12', 'W38S11'),
    common()
  ]),
  'Saturn': [].concat.apply([], [
    metropolia('Saturn', 'W36S13'),
    colony('Himalia', 'W36S12', 'W36S13'),
    colony('Titan', 'W35S12', 'W34S12'),
    colony('Oberon', 'W35S13', 'W34S12'),
    metropolia('Venus', 'W34S12'),
    colony('Deimos', 'W35S11', 'W37S11'),
    common()
  ])
}

module.exports = {
  rooms: {
    'W37S11': 'Earth',
    'W38S11': 'Mars',
    'W34S12': 'Venus',
    'W39S13': 'Jupiter',
    'W36S13': 'Saturn'
  },
  spawns: spawns
}
