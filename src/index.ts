// simple proxy test for reactive state

// Comp1 is registered to val1  - path
// Comp2 is registered to val2 and val 1 path

// We simulate a change to val2 after 1 sec
// => Comp2 onUpdate gets called
// We remove Comp2 after 2 sec
// we simulate another state change to val2 and val1
// => Comp1 onUpdate gets called

// the getter trap (hot path) should be fairly fast beacause its iterating only over active trackings
// this approach should work for async rendering scenarios using only one proxy imo
// necessary to stop tracking before an await and restart it after async code starts to run... hmmmm
// aswell if rendering a tree we need to know the parents onUpdate in the child to remove it when child rendering starts and readd it when child rendering ends...hmmmm
// idea: solving tree rendering like:
// when rendering starts (onUpdate Method) do a push(cb), when its finished do a pop(cb)

let state = {
  val1: "bar",
  val2: "baz"
};

const callbacks = new Map();

const activeCallbacks = new Set();

const startTrack = cb => {
  callbacks.set(cb, new Set());
  activeCallbacks.add(cb);
};

const stopTrack = cb => {
  activeCallbacks.delete(cb);
};

const disposeTrack = cb => {
  callbacks.delete(cb);
};

export const logTrackingList = () => {
  console.log("tracking list");
  console.log(callbacks);
};

const handler = {
  // super simplified. needs nested objects... etc
  get: function(target, prop, receiver) {
    //console.log(prop);
    activeCallbacks.forEach(k => {
      callbacks.get(k).add(prop);
    });
    return Reflect.get(...arguments);
  },

  set(obj, prop, value) {
    callbacks.forEach((value, key) => {
      if (value.has(prop)) {
        // maybe put to animationFrame then
        // call onUpdate method of affected component
        key();
      }
    });
    return Reflect.set(...arguments);
  }
};

const proxy = new Proxy(state, handler);

// Comp1
setTimeout(() => {
  const onUpdate = () => {
    console.log("Comp1 update called");
  };
  startTrack(onUpdate);
  console.log("Comp1 is reading val1: " + proxy.val1);
  stopTrack(onUpdate);
}, 100);

// Comp2
setTimeout(() => {
  const onUpdate = () => {
    console.log("Comp2 update called");
  };
  startTrack(onUpdate);
  console.log("Comp2 is reading val1: " + proxy.val1);
  console.log("Comp2 is reading val2: " + proxy.val2);
  stopTrack(onUpdate);

  // simulate component remove
  setTimeout(() => {
    disposeTrack(onUpdate);
  }, 1500);
}, 200);

setTimeout(() => {
  // simulate state change

  logTrackingList();
  proxy.val2 = "foo2";
}, 1000);

setTimeout(() => {
  // simulate state change
  logTrackingList();
  proxy.val2 = "foo3";
  proxy.val1 = "bar2";
}, 2000);
