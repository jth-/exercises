module.exports = function(options, callback) {
  var toggleTimes = getToggleTimes(options.message, options.codes);
  var index = 0;
  next();
  function next() {
    if (!toggleTimes[index]) {
      return callback();
    }
    options.toggle();
    var waitFor = toggleTimes[index];
    index++;
    options.timeouter(next, waitFor);
  }
};

function getToggleTimes(message, codes) {
  var times = [];
  // First, create a list of boolean values that decide whether, on any
  // given tick, the toggle method should be executed or not.
  for (var i = 0; i < message.length; i++) {
    // Iterate through each character in the message and do a lookup
    // on it's corresponding code.
    var encoded = codes[message[i]] || ' ';
    for (var j = 0; j < encoded.length; j++) {
      // Iterate through each morse code symbol in the encoded character
      // and do a lookup on it's corresponding toggleTimes, then push
      // that to the whole message toggle times array
      times.push.apply(times, letterToToggles[encoded[j]]);
    }
  }
  return times;
}

var letterToToggles = {
  '.': [1, 1],
  '-': [3, 1],
  ' ': [7]
};
