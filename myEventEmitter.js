var eventEmitter = function () {
    this.listeners = {};
}
var hasOwnProperty = Object.prototype.hasOwnProperty;

eventEmitter.prototype.on = function (type, listener) {
    var listeners = this.listeners;
    if (!hasOwnProperty.call(listeners, type)) {
        listeners[type] = [listener];
    } else {
        listeners[type].push(listener);
    }
}

eventEmitter.prototype.off = function (type, listener) {
    var listeners = this.listeners, candidate, i;
    if (hasOwnProperty.call(listeners, type)) {
        for (i = 0; (candidate = listeners[i]); ++i) {
            if (candidate === listener) {
                if (listeners.length == 1) delete listeners[type];
                else listeners.splice(i, 1);
            }
        }

    }
}
eventEmitter.prototype.listeners = function (type) {
    return this.listeners[type];
}
eventEmitter.prototype.emit = function (type) {
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    if (hasOwnProperty.call(this.listeners, type)) {
        this.listeners[type].forEach(listener => {
            listener.apply(null, args);
        })
    }

}

eventEmitter.prototype.once = function (type, listener) {
    var self = this;
    var fn = function () {
        var args = Array.prototype.slice.call(arguments);
        listener.apply(null, args);
        self.off(type, fn);
    };
    self.on(type, fn);
}