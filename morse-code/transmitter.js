module.exports = function(options, callback) {
  // Create a list of waiting times between toggle events for the message
  var toggleTimes = getToggleTimes(options.message, options.codes);
  // Track where we are in the toggle times array
  var index = 0;
  // Kick off the transmission of the message
  nextToggle();

  function nextToggle() {
    // Execute the toggle operation
    options.toggle();
    if (!toggleTimes[index]) {
      // If there are no more toggles, invoke the final callback
      return callback();
    }
    // Wait for however long is prescribed by the toggle times array
    var waitFor = toggleTimes[index];
    index++;
    options.timeouter(nextToggle, waitFor);
  }
};

function getToggleTimes(message, codes) {
  var times = [];
  for (var i = 0; i < message.length; i++) {
    // Iterate through each character in the message and do a lookup
    // on it's corresponding code.
    var encoded = codes[message[i]] || ' ';
    // Prefix each character that isn't the first character in
    // the word, the first character following a space, or is an
    // space with 3 ticks of padding
    if (i !== 0 && message[i - 1] !== ' ' && encoded !== ' ') {
      times.push(3);
    }
    for (var j = 0; j < encoded.length; j++) {
      // Prefix each symbol that isn't the first symbol in a character
      // with 1 tick of padding
      if (j !== 0) {
        times.push(1);
      }
      // Iterate through each morse code symbol in the encoded character
      // and do a lookup on it's corresponding toggle ticks, then push
      // that to the toggle times array
      times.push(symbolToToggles[encoded[j]]);
    }
  }
  return times;
}

// Lookup table for toggle durations for each morse code symbol
var symbolToToggles = {
  '.': 1,
  '-': 3,
  ' ': 7
};
