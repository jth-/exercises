module.exports = update;

function update(_state, commands) {
  // Make a shallow clone of state so we don't make changes to the
  // object that was passed in
  var state = clone(_state);

  // Iterate over each of the keys in commands
  var keys = Object.keys(commands);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (availableCommands.hasOwnProperty(key)) {
      // If the key is a valid command, execute that command.
      // Note since that we return the result of this, I am
      // assuming that only one command could live at each
      // level in the hierarchy of the commands object.
      return availableCommands[key](state, commands[key]);;
    }
    // If the key in the command object wasn't a valid
    // command, recursively run the update command
    // on a subset of the state and command objects.
    state[key] = update(state[key], commands[key]);
  }
  // Return the new state object
  return state;
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
    // This command takes an array of splicing arguments, so
    // we need to iterate through it and apply them.
    args.forEach(function(spliceArgs) {
      state.splice.apply(state, spliceArgs);
    });
    return state;
  },
  $merge: function(state, args) {
    Object.keys(args).forEach(function(key) {
      state[key] = args[key];
    });
    return state;
  },
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
