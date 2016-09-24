module.exports = update;

function update(state, commands) {
  if (Array.isArray(state)) {
    return updateArray(state, commands);
  }
  return updateObject(state, commands);
}

function updateArray(state, commands) {
  // Use slice to create a clone of an array
  var newState = state.slice(0);
  // Under the assumption that we don't support nested operations (like $set)
  // within the elements of an array, so we can trust the keys in the command
  // object to be actual array commands. Otherwise, we'll throw an exception.
  Object.keys(commands).forEach(function(key) {
    if (!arrayCommands.hasOwnProperty(key)) {
      throw "Command doesn't exist for arrays - " + key;
    }
    arrayCommands[key](newState, commands[key]);
  });
  return newState;
}

var arrayCommands = {
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
  }
};

function updateObject(state, commands) {

  return {};
}

var objectCommands = {
  $merge: function() {},
  $set: function() {},
  $apply: function() {}
};
