// Define the initial state and action types
const initialState = {
  count: 0,
};

const ADD = "ADD";
const SUBTRACT = "SUBTRACT";
const RESET = "RESET";

// Reducer function to manage state changes based on actions
function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD:
      return { ...state, count: state.count + 1 };
    case SUBTRACT:
      return { ...state, count: state.count - 1 };
    case RESET:
      return { ...state, count: 0 };
    default:
      return state;
  }
}

// Function to create the store
function createStore(reducer) {
  let state = reducer(undefined, {});
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  return { getState, dispatch, subscribe };
}

// Create the store instance
const store = createStore(reducer);

// Function to update the UI
function render() {
  document.getElementById("count").innerText = store.getState().count;
}

// Subscribe to store updates for UI rendering
store.subscribe(render);

// Subscribe to store updates for logging state changes
store.subscribe(() => {
  console.log("State changed:", store.getState());
});

// Initial render to display the initial state
render();

// Attach event listeners to buttons
document.getElementById("add").addEventListener("click", () => {
  store.dispatch({ type: ADD });
});

document.getElementById("subtract").addEventListener("click", () => {
  store.dispatch({ type: SUBTRACT });
});

document.getElementById("reset").addEventListener("click", () => {
  store.dispatch({ type: RESET });
});
