module.exports = {
  bodyparts: function (energy) {
    var body = [];
    energy -= 50;
    body.push(MOVE);

    while (energy >= 100) {
      energy -= 100;
      body.push(WORK);
    }

    return body;
  }
};