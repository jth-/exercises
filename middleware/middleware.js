module.exports = Middleware;

function Middleware() {
  // Initialize an empty list of middleware functions on
  // object construction
  this.fns = [];
}

Middleware.prototype.use = function(fn) {
  // Add the middleware to the list of middleware functions
  this.fns.push(fn);
}

Middleware.prototype.go = function(callback) {
  // We need the "this" that represents a new middleware object,
  // so bind the this in this scope so we can still refer to it
  // while in the scope of the "next" function. You could get
  // around this by using ES2015 arrow functions, but I'm
  // not using those for now in order to avoid transpilation.
  var self = this;
  // Index exists outside the closure of the next function,
  // so that we can track which middleware to run next.
  var index = 0;
  // Kick off the execution of the middleware
  next();
  function next() {
    var nextMiddleware = self.fns[index];
    if (!nextMiddleware) {
      // There are no more middleware functions, so we can invoke
      // the final callback. We use the call method to bind the
      // middleware object's scope to the "this" of the callback
      return callback.call(self);
    }
    // Increment the index to call the next middleware on the
    // next iteration
    index++;
    // Call the next middleware function. We use the call method to
    // bind the middleware object's scope to the "this" of the middleware
    nextMiddleware.call(self, next);
  };
}
