module.exports = update;

function update(state, commands) {
  var newState = clone(state);
  Object.keys(commands).forEach(function(key) {
    if (commands.hasOwnProperty(key)) {
      availableCommands[key](newState, commands[key]);
    }
  });
  return newState;
}

// Available commands for object/array manipulation
var availableCommands = {
  $push: function(state, args) {
    state.push.apply(state, args);
  },
  $unshift: function(state, args) {
    state.unshift.apply(state, args);
  },
  $splice: function(state, args) {
    args.forEach(function(spliceArgs) {
      state.splice.apply(state, spliceArgs);
    });
  },
  $merge: function(state, args) {},
  $set: function(state, args) {},
  $apply: function(state, args) {}
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
