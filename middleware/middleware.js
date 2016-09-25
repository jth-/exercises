module.exports = Middleware;

function Middleware() {
  this.fns = [];
}

Middleware.prototype.use = function(fn) {

}

Middleware.prototype.go = function(callback) {
  return callback();
}
