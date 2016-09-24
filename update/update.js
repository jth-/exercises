module.exports = update;

function update(state, commands) {
  var newState = clone(state);
  return evaluateCommands(newState, commands);
}

function evaluateCommands(state, commands) {
  var keys = Object.keys(commands);

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (availableCommands.hasOwnProperty(key)) {
      return availableCommands[key](state, commands[key]);;
    }
    state[key] = evaluateCommands(state[key], commands[key]);
    return state;
  }
}

// Available commands for object/array manipulation
var availableCommands = {
  $push: function(state, args) {
    state.push.apply(state, args);
    return state;
  },
  $unshift: function(state, args) {
    state.unshift.apply(state, args);
    return state;
  },
  $splice: function(state, args) {
    args.forEach(function(spliceArgs) {
      state.splice.apply(state, spliceArgs);
    });
    return state;
  },
  $merge: function(state, args) {},
  $set: function(state, args) {
    return args;
  },
  $apply: function(state, args) {
    return args.apply(state, Array.isArray(state) ? state : [state]);
  }
};

// Clone an object or an array according to initial state's type
function clone(state) {
  if (Array.isArray(state)) {
    return cloneArray(state);
  } else if (state && typeof state === 'object') {
    return cloneObject(state);
  }
  // It's not an object or an array, so it's a primitive and
  // we don't need to clone, since it isn't passed by reference.
  return state;
}

// Create a shallow clone of an array
function cloneArray(state) {
  return state.slice(0);
}

// Create a shallow clone of an object
function cloneObject(state) {
  var newState = {};
  Object.keys(state).forEach(function(key) {
    newState[key] = state[key];
  });
  return newState;
}
