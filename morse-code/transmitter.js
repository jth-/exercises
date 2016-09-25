module.exports = function(options, callback) {
  var toggleTimes = [];
  // First, create a list of boolean values that decide whether, on any
  // given tick, the toggle method should be executed or not.
  for (var i = 0; i < options.message.length; i++) {
    // Iterate through each character in the message and do a lookup
    // on it's corresponding code.
    var encoded = options.codes[options.message[i]] || ' ';
    for (var j = 0; j < encoded.length; j++) {
      // Iterate through each morse code symbol in the encoded character
      // and do a lookup on it's corresponding toggleTimes, then push
      // that to the whole message toggle times array
      toggleTimes.push.apply(toggleTimes, letterToToggles[encoded[j]]);
    }
  }
  console.log(toggleTimes);
  return callback();
}

var letterToToggles = {
  '.': [ true, true, false ],
  '-': [ true, false, false, true, false ],
  ' ': [ false, false, false, false, false, false]
}
