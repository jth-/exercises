module.exports = update;

function update(state, commands) {
  if (Array.isArray(state)) {
    return updateArray(state, commands);
  }
  return updateObject(state, commands);
}

function updateArray(state, commands) {
  return new Array();
}

var arrayCommands = {
  $push: function() {},
  $unshift: function() {},
  $splice: function() {}
};

function updateObject(state, commands) {
  return {};
}

var objectCommands = {
  $merge: function() {},
  $set: function() {},
  $apply: function() {}
};
