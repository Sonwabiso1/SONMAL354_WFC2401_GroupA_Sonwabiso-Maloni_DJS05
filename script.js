// Define action types
const ActionType = {
  ADD: "ADD",
  SUBTRACT: "SUBTRACT",
  RESET: "RESET",
};

// Define reducer function
function reducer(state = { count: 0 }, action) {
  switch (action.type) {
    case ActionType.ADD:
      return { count: state.count + 1 };
    case ActionType.SUBTRACT:
      return { count: state.count - 1 };
    case ActionType.RESET:
      return { count: 0 };
    default:
      return state;
  }
}

// Define store
function createStore(reducer) {
  let state = reducer(undefined, {});
  let listeners = [];

  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  }

  function subscribe(listener) {
    listeners.push(listener);
  }

  return { getState, dispatch, subscribe };
}

// Create store instance
const store = createStore(reducer);

// Scenario 1: Initial State Verification
console.log("Scenario 1:");
console.log("Initial state:", store.getState().count);

// Scenario 2: Incrementing the Counter
console.log("\nScenario 2:");
store.dispatch({ type: ActionType.ADD });
store.dispatch({ type: ActionType.ADD });
console.log("Current state:", store.getState().count);

// Scenario 3: Decrementing the Counter
console.log("\nScenario 3:");
store.dispatch({ type: ActionType.SUBTRACT });
console.log("Current state:", store.getState().count);

// Scenario 4: Resetting the Counter
console.log("\nScenario 4:");
store.dispatch({ type: ActionType.RESET });
console.log("Current state:", store.getState().count);
